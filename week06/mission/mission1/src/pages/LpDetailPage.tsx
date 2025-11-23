import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getLpDetail, getLpComments, postLpComment } from "../apis/lp";
import { PAGINATION_ORDER } from "../enums/common";

type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
  };
};

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const queryClient = useQueryClient();
  const [commentOrder, setCommentOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [newComment, setNewComment] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data: lp, isLoading, isError } = useQuery({
    queryKey: ["lp", lpid],
    queryFn: () => getLpDetail(Number(lpid)),
    enabled: !!lpid,
  });

  const {
    data: commentsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentsLoading,
  } = useInfiniteQuery<
    { data: Comment[]; nextCursor: number | null; hasNext: boolean },
    Error
  >({
    queryKey: ["lpComments", lpid, commentOrder],
    queryFn: ({ pageParam = 0 }) =>
      getLpComments(Number(lpid), { cursor: pageParam, limit: 10, order: commentOrder }),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    enabled: !!lpid,
    initialPageParam:0,
  });

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [observerRef, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await postLpComment(Number(lpid), { content: newComment });
    setNewComment("");
    queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, commentOrder] });
  };

  if (isLoading) return <div className="mt-10 md:ml-64">Loading LP...</div>;
  if (isError) return <div className="mt-10 md:ml-64">Error loading LP.</div>;
  if (!lp) return <div className="mt-10 md:ml-64">No LP data.</div>;

  return (
    <div className="mt-10 md:ml-64 p-4">
      <h1 className="text-2xl font-bold mb-4">{lp.title}</h1>
      <img src={lp.thumbnail} alt={lp.title} className="w-full max-w-lg mb-4" />
      <p className="text-sm mb-2">{new Date(lp.createdAt).toLocaleDateString()}</p>
      <p className="mb-4">{lp.content}</p>
      <p>❤️ {lp.likes.length}</p>
      <div className="flex gap-2 mt-2 mb-6">
        {lp.tags.map(tag => (
          <span key={tag.id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{tag.name}</span>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 border rounded ${commentOrder === PAGINATION_ORDER.desc ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
          onClick={() => setCommentOrder(PAGINATION_ORDER.desc)}
        >
          최신순
        </button>
        <button
          className={`px-3 py-1 border rounded ${commentOrder === PAGINATION_ORDER.asc ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
          onClick={() => setCommentOrder(PAGINATION_ORDER.asc)}
        >
          오래된순
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          className="border p-2 rounded flex-1"
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleAddComment}
        >
          작성
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {isCommentsLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-2 border rounded h-16 bg-gray-200 animate-pulse" />
          ))
        }

        {commentsPages?.pages.map((page) =>
          page.data.map((comment: Comment) => (
            <div key={comment.id} className="p-2 border rounded">
              <p className="text-sm mb-1">{comment.author.name}</p>
              <p>{comment.content}</p>
              <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}

        {isFetchingNextPage &&
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-2 border rounded h-16 bg-gray-200 animate-pulse" />
          ))
        }

        <div ref={observerRef} />
      </div>
    </div>
  );
};

export default LpDetailPage;
