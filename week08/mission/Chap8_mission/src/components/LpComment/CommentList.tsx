import { useGetInfiniteLpComment } from "../../hooks/queries/useGetInfiniteLpComment";
import { useParams } from "react-router-dom";
import { PAGINATION_ORDER } from "../../enums/common";
import { useInView } from "react-intersection-observer";
import SortTabs from "../SortTabs";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { CommentSkeletonList } from "./CommentSkeletonList";
import usePostComment from "../../hooks/mutations/usePostComment";

export const CommentList = () => {
  const { lpid } = useParams<{ lpid: string }>();
  // 문자열 -> 숫자 변환
  const lpIdNumber = Number(lpid);

  const [sort, setSort] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [inputValue, setInputValue] = useState("");
  const { data, isFetching, hasNextPage, fetchNextPage, isPending, isError } =
    useGetInfiniteLpComment({
      lpId: lpIdNumber,
      limit: 5,
      order: sort,
    });

  const { ref, inView } = useInView({ threshold: 0 });

  const { mutate: postComment } = usePostComment();

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    postComment(
      { lpId: lpIdNumber.toString(), 
        content: inputValue, 
      },
      {
        onSuccess: () => {
          setInputValue(""); // 입력창 초기화
        },
      }
    );
  };

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="">
      <SortTabs setSort={setSort} />

      <div className="flex items-center mt-1 px-10 gap-3">
        <input
          type="text"
          id="input-9"
          className="w-full h-10 px-3 text-sm text-gray-700 border border-neutral-500 focus:outline-none rounded shadow-sm"
          placeholder="댓글을 입력해주세요."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button
          className="h-10 px-8 text-md font-bold whitespace-nowrap bg-neutral-500 border border-neutral-500 rounded shadow-sm text-blue-50"
          onClick={handleSubmit}
          disabled={!inputValue.trim()}
        >
          작성
        </button>
      </div>

      <div className="gap-5 px-15 py-5">
        {isPending && <CommentSkeletonList count={5} />}
        {data?.pages
          ?.map((page) => page.data.data)
          .flat()
          .map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        {isFetching && <CommentSkeletonList count={5} />}
      </div>
      <div ref={ref} className="h-10"></div>
    </div>
  );
};
