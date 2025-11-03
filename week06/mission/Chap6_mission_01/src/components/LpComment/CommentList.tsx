import { useGetInfiniteLpComment } from "../../hooks/queries/useGetInfiniteLpComment";
import { useParams } from "react-router-dom";
import { PAGINATION_ORDER } from "../../enums/common";
import { useInView } from "react-intersection-observer";
import SortTabs from "../SortTabs";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { CommentSkeletonList } from "./CommentSkeletonList";

export const CommentList = () => {
  const { lpid } = useParams<{ lpid: string }>();
  // 문자열 -> 숫자 변환
  const lpIdNumber = Number(lpid);

  const [sort, setSort] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  const { data, isFetching, hasNextPage, fetchNextPage, isPending, isError } =
    useGetInfiniteLpComment({
      lpId: lpIdNumber,
      limit: 5,
      order: sort,
    });

  console.log(data);
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="">
      <SortTabs setSort={setSort} />

      <div className="flex items-center mt-1 px-10 gap-3">
        <input
          type="comment"
          id="input-9"
          className="w-full h-10 px-3 text-sm text-gray-700 border border-neutral-500 focus:outline-none rounded shadow-sm"
          placeholder="댓글을 입력해주세요."
        />
        <button className="h-10 px-8 text-md font-bold whitespace-nowrap bg-neutral-500 border border-neutral-500 rounded shadow-sm text-blue-50 hover:text-white hover:bg-neutral-400 hover:border-neutral-400 focus:outline-none">
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
