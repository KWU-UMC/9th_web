import { useState } from "react";
import type { FormEvent } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import CommentItem from "./Comment";
import CommentSkeletonList from "./CommentSkeletonList";

import { fetchLpComments, postLpComment } from "../../apis/comment";
import type {
  Comment,
  ResponseCommentListDto,
} from "../../types/comment";
import { PAGINATION_ORDER } from "../../../enums/common";

type Props = {
  lpId: string | number;
};

type CommentPage = ResponseCommentListDto["data"];

export default function CommentsSection({ lpId }: Props) {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.ASC); 
  const [content, setContent] = useState("");
  const [errorText, setErrorText] = useState("");

  const queryClient = useQueryClient();
  const lpIdNum = typeof lpId === "string" ? Number(lpId) : lpId;

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<CommentPage>({
    queryKey: ["lpComments", lpIdNum, order],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchLpComments({
        lpId: lpIdNum,
        cursor: pageParam as number,
        order,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && lastPage.nextCursor !== null
        ? lastPage.nextCursor
        : undefined,
  });

  const comments: Comment[] =
    data?.pages.flatMap((page) => page.data) ?? [];

  const { mutateAsync: createComment, isPending: isCreating } = useMutation({
    mutationFn: (body: { content: string }) =>
      postLpComment({ lpId: lpIdNum, content: body.content }),
    onSuccess: () => {
      setContent("");
      setErrorText("");
      queryClient.invalidateQueries({
        queryKey: ["lpComments", lpIdNum, order],
      });
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();

    if (!trimmed) {
      setErrorText("댓글 내용을 입력해 주세요.");
      return;
    }
    if (trimmed.length > 500) {
      setErrorText("댓글은 500자 이내로 작성해 주세요.");
      return;
    }

    await createComment({ content: trimmed });
  };

  const totalCount = comments.length;
  return (
    <section className="mt-10 bg-white rounded-xl p-5 text-black">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">댓글</h2>
          <span className="text-xs text-gray-500">{totalCount}개</span>
        </div>

        <div className="inline-flex items-center rounded-full bg-gray-100 p-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => setOrder(PAGINATION_ORDER.ASC)}
            className={`px-3 py-1 rounded-full ${
              order === "asc"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            오래된순
          </button>
          <button
            type="button"
            onClick={() => setOrder(PAGINATION_ORDER.DESC)}
            className={`px-3 py-1 rounded-full ${
              order === "desc"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="댓글을 입력해주세요"
            className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            disabled={isCreating}
            className="px-4 py-2 rounded-full bg-pink-500 text-sm font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isCreating ? "작성 중…" : "작성"}
          </button>
        </div>
        {errorText && (
          <p className="mt-1 text-xs text-pink-600">{errorText}</p>
        )}
      </form>

      <div className="bg-gray-900 rounded-xl px-4 py-3 text-white">

        {isPending && <CommentSkeletonList />}

        {isError && !isPending && (
          <p className="text-sm text-gray-400">
            댓글을 불러오지 못했어요.
          </p>
        )}

        {!isPending && !isError && comments.length === 0 && (
          <p className="text-sm text-gray-400 py-6 text-center">
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </p>
        )}

        {!isPending &&
          comments.map((c) => <CommentItem key={c.id} comment={c} />)}

        {hasNextPage && !isPending && (
          <div className="mt-3 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-4 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-60"
            >
              {isFetchingNextPage ? "불러오는 중…" : "더 보기"}
            </button>
            {isFetchingNextPage && <CommentSkeletonList count={3} />}
          </div>
        )}
      </div>
    </section>
  );
}
