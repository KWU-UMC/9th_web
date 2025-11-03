import { useCallback, useState } from "react";
import LpCard from "../components/LpCard";
import { SkeletonGrid } from "../components/Skeleton";
import { PAGINATION_ORDER } from "../enums/common";
import { useInfiniteLpList } from "../hooks/queries/useInfiniteLpList";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const HomePage = () => {
  const [sort, setSort] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteLpList({ order: sort, limit: 24 });

  const onLoadMore = useCallback(() => {
    if (!isFetchingNextPage && data?.pageInfo.hasNext) fetchNextPage();
  }, [data?.pageInfo.hasNext, fetchNextPage, isFetchingNextPage]);

  const sentinelRef = useInfiniteScroll(onLoadMore);

  if (isLoading) return <SkeletonGrid count={12} />;

  if (isError)
    return (
      <div className="text-white text-xl flex flex-col items-center gap-3">
        에러가 발생했습니다.
        <button onClick={() => location.reload()} className="px-3 py-1 rounded bg-white text-black hover:bg-white/80">
          다시 시도
        </button>
      </div>
    );

  return (
    <>
      <div className="flex justify-end mr-10 mb-3">
        <div className="flex border border-white rounded-md overflow-hidden">
          <button
            onClick={() => setSort(PAGINATION_ORDER.asc)}
            className={`px-4 py-1.5 text-sm font-medium ${sort === PAGINATION_ORDER.asc ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
          >
            오래된순
          </button>
          <button
            onClick={() => setSort(PAGINATION_ORDER.desc)}
            className={`px-4 py-1.5 text-sm font-medium ${sort === PAGINATION_ORDER.desc ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
          >
            최신순
          </button>
        </div>
      </div>

      {!data || data.pages.length === 0 ? (
        <div className="text-white text-center my-10">표시할 LP가 없습니다. 먼저 업로드를 해보세요.</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
          {data.pages.map((lp) => <LpCard key={lp.id} lp={lp} />)}
        </div>
      )}

      {/* 하단 센티넬 + 로딩 스켈레톤 */}
      <div ref={sentinelRef} className="h-8" />
      {isFetchingNextPage && <div className="mt-2"><SkeletonGrid count={8} /></div>}
    </>
  );
};

export default HomePage;

