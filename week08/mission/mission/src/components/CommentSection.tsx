// components/CommentSection.tsx
import { useState, useRef, useEffect } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getLpComments, postComment } from "../apis/comments";
import CommentItem from "./CommentItem";
import CommentSkeleton from "./CommentSkeleton";

interface CommentSectionProps {
  lpid: string;
}

export default function CommentSection({ lpid }: CommentSectionProps) {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [commentInput, setCommentInput] = useState("");
  const observerTarget = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const {
    data: commentsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["lpComments", lpid, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpComments(lpid, { order, limit: 10, cursor: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });

  const createCommentMutation = useMutation({
    mutationFn: (value: { content: string }) => postComment(lpid, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, order] });
      setCommentInput("");
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSubmit = () => {
    if (!commentInput.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }
    createCommentMutation.mutate({ content: commentInput });
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">댓글</h2>
        <button
          onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          {order === "desc" ? "최신순" : "오래된순"}
        </button>
      </div>

      {/* 댓글 작성 */}
      <div className="mb-6">
        <textarea
          placeholder="댓글을 입력하세요..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          className="w-full p-4 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-600"
          rows={3}
        />
        <button
          onClick={handleSubmit}
          disabled={createCommentMutation.isPending}
          className="mt-2 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
        >
          {createCommentMutation.isPending ? "작성 중..." : "댓글 작성"}
        </button>
      </div>

      {/* 댓글 목록 */}
      {isLoading && (
        <>
          {[...Array(3)].map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </>
      )}

      {!isLoading && (
        <>
          {commentsData?.pages.map((page) =>
            page.data.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                lpid={lpid}
                order={order}
              />
            ))
          )}
        </>
      )}

      {!isLoading && commentsData?.pages[0]?.data.length === 0 && (
        <p className="text-gray-400 text-center py-8">댓글을 작성해보세요!</p>
      )}

      {isFetchingNextPage && <CommentSkeleton />}
      <div ref={observerTarget} className="h-10" />
    </div>
  );
}
