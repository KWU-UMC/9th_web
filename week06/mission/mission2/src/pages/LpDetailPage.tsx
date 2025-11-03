import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { getLpDetail, getLpComments } from "../apis/lps";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorState from "../components/ErrorState";

export default function LpDetailPage() {
  const { lpid } = useParams<{ lpid: string }>();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const observerTarget = useRef<HTMLDivElement>(null);

  // LP 상세 정보
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["lp", lpid],
    queryFn: () => getLpDetail(lpid!),
    enabled: !!lpid,
  });

  // 댓글 목록 (무한 스크롤)
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["lpComments", lpid, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpComments(lpid!, { order, limit: 10, cursor: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
    enabled: !!lpid,
  });

  // Intersection Observer
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

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState onRetry={refetch} />;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* LP 상세 내용 */}
        <div className="mb-8 overflow-hidden rounded-2xl">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full h-[500px] object-cover"
          />
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 mb-6">
          <h1 className="text-5xl font-bold text-white mb-6">{data.title}</h1>
          <div className="flex gap-8 text-gray-400 text-lg mb-6">
            <span>📅 {new Date(data.createdAt).toLocaleDateString()}</span>
            <span>🖤 {data.likes.length}</span>
          </div>
          <div className="flex gap-2 flex-wrap mb-6">
            {data.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-4 py-2 bg-pink-600 text-white rounded-full text-sm"
              >
                #{tag.name}
              </span>
            ))}
          </div>
          <div
            className="prose prose-invert max-w-none text-gray-300"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>

        {/* 버튼 */}
        <div className="flex gap-4 mb-8">
          <button className="flex-1 px-6 py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600">
            수정
          </button>
          <button className="flex-1 px-6 py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600">
            삭제
          </button>
          <button className="flex-1 px-6 py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600">
            좋아요
          </button>
        </div>

        {/* 댓글 섹션 */}
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
              className="w-full p-4 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-600"
              rows={3}
            />
            <button className="mt-2 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
              댓글 작성
            </button>
          </div>

          {/* 댓글 목록 */}
          {isCommentsLoading && (
            <>
              {[...Array(3)].map((_, i) => (
                <CommentSkeleton key={i} />
              ))}
            </>
          )}

          {!isCommentsLoading && (
            <>
              {commentsData?.pages.map((page) =>
                page.data.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b border-gray-700 py-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={comment.author.avatar || ""}
                        alt=""
                      />

                      <div>
                        <span className="font-bold text-white">
                          {comment.author.name}
                        </span>
                        <span className="text-sm text-gray-400 ml-2">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 ml-13">{comment.content}</p>
                  </div>
                ))
              )}
            </>
          )}

          {/* 댓글이 없을 때 */}
          {!isCommentsLoading && commentsData?.pages[0]?.data.length === 0 && (
            <p className="text-gray-400 text-center py-8">
              댓글을 작성해보세요!
            </p>
          )}

          {/* 하단 로딩 스켈레톤 */}
          {isFetchingNextPage && <CommentSkeleton />}

          <div ref={observerTarget} className="h-10" />

          <div ref={observerTarget} className="h-10" />
        </div>
      </div>
    </div>
  );
}

// 댓글 스켈레톤
function CommentSkeleton() {
  return (
    <div className="border-b border-gray-700 py-4 animate-pulse">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-4 bg-gray-700 rounded w-24" />
        <div className="h-3 bg-gray-700 rounded w-32" />
      </div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2" />
      <div className="h-4 bg-gray-700 rounded w-3/4" />
    </div>
  );
}
