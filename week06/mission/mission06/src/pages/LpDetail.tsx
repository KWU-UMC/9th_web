import { useMemo, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { PAGINATION_ORDER } from "../enums/common";
import { useInfiniteComments } from "../hooks/queries/useInfiniteComments";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import CommentItem from "../components/CommentItem";
import { CommentSkeleton } from "../components/CommentSkeleton";

const LpDetail = () => {
  const { lpId } = useParams();
  const { data: lp, isPending, isError, refetch } = useGetLpDetail(lpId);

  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const lpIdSafe = useMemo(() => lpId ?? "", [lpId]);

  const { data: comments, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteComments({ lpId: lpIdSafe, order, limit: 15 });

  const onMore = useCallback(() => {
    if (comments?.hasNext && !isFetchingNextPage) fetchNextPage();
  }, [comments?.hasNext, fetchNextPage, isFetchingNextPage]);

  const sentinelRef = useInfiniteScroll(onMore);

  if (isPending) return <div className="text-white text-2xl">Loading...</div>;
  if (isError)
    return (
      <div className="text-white text-xl flex flex-col items-center gap-3">
        에러가 발생했습니다.
        <button onClick={() => refetch()} className="px-3 py-1 rounded bg-white text-black hover:bg-white/80">
          다시 시도
        </button>
      </div>
    );
  if (!lp) return null;

  return (
    <article className="mx-auto max-w-3xl space-y-5 p-6 bg-gray-800 rounded-2xl text-white">
      {/* 메타 */}
      <header className="flex items-center justify-between text-sm opacity-90">
        <span>{lp.author?.name}</span>
        <time>{new Date(lp.updatedAt).toLocaleDateString()}</time>
      </header>

      {/* 제목/액션 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{lp.title}</h1>
        <div className="flex items-center gap-4 text-sm">
          <button className="hover:underline">수정</button>
          <button className="hover:underline">삭제</button>
        </div>
      </div>

      {/* 썸네일 */}
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full rounded shadow-2xl"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/fallback.png"; }}
        loading="lazy"
      />

      {/* 본문 */}
      <section className="leading-relaxed text-gray-100">{lp.content}</section>

      {/* 좋아요 */}
      <footer className="flex items-center justify-center gap-2 text-lg">
        <button className="text-2xl">❤️</button>
        <span>{lp.likes.length}</span>
      </footer>

      {/* 댓글 */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">댓글</h2>
          <div className="flex border border-white rounded-md overflow-hidden">
            <button
              onClick={() => setOrder(PAGINATION_ORDER.asc)}
              className={`px-3 py-1 text-sm ${order === PAGINATION_ORDER.asc ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
            >
              오래된순
            </button>
            <button
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
              className={`px-3 py-1 text-sm ${order === PAGINATION_ORDER.desc ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
            >
              최신순
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-black/30 p-4">
          {isLoading ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => <CommentSkeleton key={i} />)}
            </>
          ) : (
            <>
              {comments?.items.map((c) => <CommentItem key={c.id} c={c} />)}
              <div ref={sentinelRef} className="h-6" />
              {isFetchingNextPage && (
                <>
                  {Array.from({ length: 4 }).map((_, i) => <CommentSkeleton key={`more-${i}`} />)}
                </>
              )}
              {!comments?.items.length && <div className="text-white/60 text-sm py-6">첫 댓글을 남겨보세요.</div>}
            </>
          )}
        </div>
      </section>
    </article>
  );
};

export default LpDetail;
