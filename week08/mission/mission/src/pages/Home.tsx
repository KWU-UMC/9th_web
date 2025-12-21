import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLps } from "../apis/lps";
import ErrorState from "../components/ErrorState";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";

export default function Home() {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();
  const observerTarget = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [scrollTriggerCount, setScrollTriggerCount] = useState(0);

  const debouncedInput = useDebounce<string>(input, 500);
  const throttledTriggerCount = useThrottle(scrollTriggerCount, 1000);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["lps", order, debouncedInput],

    queryFn: ({ pageParam = 0 }) =>
      getLps({
        order,
        limit: 10,
        cursor: pageParam,
        search: debouncedInput.trim(),
      }),

    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,

    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log(
            "Intersection detected:",
            new Date().toLocaleTimeString()
          );
          // 카운터 증가
          setScrollTriggerCount((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage]);

  // throttle된 카운터가 변경될 때만 fetchNextPage 실행
  useEffect(() => {
    if (throttledTriggerCount > 0) {
      console.log(
        "Throttled fetch triggered:",
        new Date().toLocaleTimeString(),
        `(count: ${throttledTriggerCount})`
      );
      fetchNextPage();
    }
  }, [throttledTriggerCount, fetchNextPage]);

  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">LP 목록</h1>
        <button
          onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          {order === "desc" ? "최신순 ▼" : "오래된순 ▲"}
        </button>
      </div>

      {/* 검색 */}
      <input
        placeholder="검색"
        className="mb-4 text-white border-2 border-white p-2 w-full rounded-lg bg-gray-800"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* 초기 로딩 스켈레톤 */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* 카드 목록 */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data?.pages.map((page) =>
            page.data.map((lp) => (
              <div
                key={lp.id}
                onClick={() => navigate(`/lp/${lp.id}`)}
                className="group relative overflow-hidden rounded-xl cursor-pointer shadow-xl 
                           transition-all duration-300 ease-out
                           hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
              >
                <img
                  src={lp.thumbnail}
                  alt={lp.title}
                  className="w-full h-64 object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 p-6 text-white 
                                 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <h3 className="text-xl font-bold mb-2">{lp.title}</h3>
                    <p className="text-sm text-gray-300 mb-1">
                      {new Date(lp.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm flex items-center gap-1">
                      <span>🖤</span>
                      <span>{lp.likes.length}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 하단 로딩 스켈레톤 */}
      {isFetchingNextPage && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[...Array(3)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Intersection Observer 트리거 */}
      <div ref={observerTarget} className="h-10" />
    </div>
  );
}

// 카드 스켈레톤 컴포넌트
function CardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden shadow-xl animate-pulse">
      <div className="w-full h-64 bg-gray-700" />
      <div className="p-6 bg-gray-800">
        <div className="h-6 bg-gray-700 rounded mb-2" />
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-1" />
        <div className="h-4 bg-gray-700 rounded w-1/4" />
      </div>
    </div>
  );
}
