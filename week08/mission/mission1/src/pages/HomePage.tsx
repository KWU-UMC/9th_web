import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteGetLpList from "../hooks/queries/useGetInfiniteLpList";
import useDebounce from "../hooks/useDebounce";

const SkeletonCard = () => (
  <div className="w-40 h-40 bg-gray-300 rounded animate-pulse"></div>
);

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const debounceValue = useDebounce(search, 300, {
    enabled: search.length > 0
  });

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteGetLpList(50, debounceValue, order);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isError) return <div className="mt-10 md:ml-64">Error.</div>;

  return (
    <div className="mt-10 md:ml-64">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
          className={`px-3 py-1 border rounded ${
            order === PAGINATION_ORDER.desc
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
          className={`px-3 py-1 border rounded ${
            order === PAGINATION_ORDER.asc
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          오래된순
        </button>
      </div>

      <input
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="border p-2 rounded w-full mb-4"
      />

      <div className="p-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {isLoading &&
          Array.from({ length: 12 }).map((_, idx) => <SkeletonCard key={idx} />)}

        {data?.pages.map((page) =>
          page.data.data.map((lp) => (
            <div
              key={lp.id}
              className="relative overflow-hidden rounded shadow hover:scale-105 transition-transform group w-40 h-40 cursor-pointer"
              onClick={() => navigate(`/lp/${lp.id}`)}
            >
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">
                <h3 className="text-white text-xs m-1">{lp.title}</h3>
                <p className="text-white text-xs">
                  {new Date(lp.createdAt).toLocaleDateString()}
                </p>
                <p className="text-white text-xs">❤️ {lp.likes.length}</p>
              </div>
            </div>
          ))
        )}

        {isFetchingNextPage &&
          Array.from({ length: 12 }).map((_, idx) => <SkeletonCard key={`next-${idx}`} />)}
      </div>

      <div ref={loadMoreRef}></div>
    </div>
  );
};

export default HomePage;
