import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useInfiniteQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getLpDetail, getLpComments, postLpComment, deleteLpComment, updateLpComment } from "../apis/lp";
import { PAGINATION_ORDER } from "../enums/common";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import type { Likes } from "../types/lp";
import { Heart } from "lucide-react";
import { axiosInstance } from "../apis/axios";
import EditModal from "../components/EditModal";

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
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);
  const [optimisticLiked, setOptimisticLiked] = useState(false);
  const [optimisticLikeCount, setOptimisticLikeCount] = useState(0);

  
  const { data: lp, isLoading, isError } = useQuery({
    queryKey: ["lp", lpid],
    queryFn: () => getLpDetail(Number(lpid)),
    enabled: !!lpid,
  });

  const { post: likeMutate, del: disLikeMutate } = {
    post: useMutation({
      mutationFn: () => {
        return axiosInstance.post(`/v1/lps/${lpid}/likes`,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
      });
      },
      onSuccess: () => console.log("좋아요를 눌렀습니다"),
    }),
    del: useMutation({
      mutationFn: () => {
        return axiosInstance.delete(`/v1/lps/${lpid}/likes`,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
      });
      },
      onSuccess: () => console.log("좋아요를 취소했습니다"),
    }),
  };

  

  useEffect(() => {
    if (lp && me?.data?.id) {
      const liked = lp.likes?.some((like: Likes) => like.userId === me.data.id);
      setOptimisticLiked(liked);
      setOptimisticLikeCount(lp.likes?.length || 0);
      }
  }, [lp, me]);

  const handleToggleLike = () => {
    if (!accessToken) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    setOptimisticLiked((prev) => !prev);
    setOptimisticLikeCount((prev) => (optimisticLiked ? prev - 1 : prev + 1));
    if (!optimisticLiked) {
    likeMutate.mutate(undefined, {
      onError: () => {
        setOptimisticLiked(false);
        setOptimisticLikeCount((prev) => prev - 1);
      },
    });
  } else {
    disLikeMutate.mutate(undefined, {
      onError: () => {
        setOptimisticLiked(true);
        setOptimisticLikeCount((prev) => prev + 1);
      },
    });
  }
};

  const commentsQuery = useInfiniteQuery({
    queryKey: ["lpComments", lpid, commentOrder],
    queryFn: ({ pageParam = 0 }) =>
      getLpComments(Number(lpid), { cursor: pageParam, limit: 10, order: commentOrder }),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    enabled: !!lpid,
    initialPageParam: 0,
  });

  const { data: commentsPages, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: isCommentsLoading } = commentsQuery;

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

  const addCommentMutation = useMutation({
    mutationFn: (content: string) => postLpComment(Number(lpid), { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, commentOrder] });
      setNewComment("");
    },
  });

  const updateCommentMutation = useMutation({
  mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
    updateLpComment(Number(lpid), commentId, { content }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, commentOrder] });
    setEditingCommentId(null);
    setEditingContent("");
  },
});

const deleteCommentMutation = useMutation({
  mutationFn: (commentId: number) => deleteLpComment(Number(lpid), commentId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, commentOrder] });
  },
});

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    addCommentMutation.mutate(newComment);
  };

  const handleDeleteComment = (id: number) => {
    deleteCommentMutation.mutate(id);
  };

  const handleEditComment = (id: number, content: string) => {
    setEditingCommentId(id);
    setEditingContent(content);
  };

  const handleUpdateComment = (id: number) => {
    if (!editingContent.trim()) return;
    updateCommentMutation.mutate({ commentId: id, content: editingContent });
  };

  if (isLoading) return <div className="mt-10 md:ml-64">Loading LP...</div>;
  if (isError) return <div className="mt-10 md:ml-64">Error loading LP.</div>;
  if (!lp) return <div className="mt-10 md:ml-64">No LP data.</div>;

  return (
    <div className="mt-10 md:ml-64 p-4">
      {isEditModalOpen && (
        <EditModal
          lpId={Number(lpid)}
          initialData={{
            title: lp.title,
            content: lp.content,
            thumbnail: lp.thumbnail,
            tags: lp.tags?.map(tag => 
              typeof tag === "string" ? tag : { id: tag.id, name: tag.name }
            ) || [],
            published: lp.published,
          }}
          onClose={() => setIsEditModalOpen(false)}
/>
      )}
      
      {me?.data?.id === lp?.authorId && (
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ✏️ 수정하기
        </button>
      )}

      <h1 className="text-2xl font-bold mb-4">{lp.title}</h1>
      <img src={lp.thumbnail} alt={lp.title} className="w-full max-w-lg mb-4" />
      <p className="text-sm mb-2">{new Date(lp.createdAt).toLocaleDateString()}</p>
      <p className="mb-4">{lp.content}</p>

      <button onClick={handleToggleLike}>
        <Heart color={optimisticLiked ? "red" : "black"} fill={optimisticLiked ? "red" : "transparent"} />
      </button>
      <span>{optimisticLikeCount}</span>
      

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
            <div key={comment.id} className="p-2 border rounded relative">
              <p className="text-sm mb-1">{comment.author.name}</p>
              {editingCommentId === comment.id ? (
                <div className="flex gap-2">
                  <input
                    className="border p-1 rounded flex-1"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <button
                    className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => handleUpdateComment(comment.id)}
                  >
                    저장
                  </button>
                  <button
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => setEditingCommentId(null)}
                  >
                    취소
                  </button>
                </div>
              ) : (
                <>
                  <p>{comment.content}</p>
                  {me?.data?.id === comment.authorId && (
                    <div className="absolute top-0 right-0 flex gap-1">
                      <button
                        className="px-2 py-1 bg-blue-500 rounded hover:bg-blue-700"
                        onClick={() => handleEditComment(comment.id, comment.content)}
                      >
                        수정
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </>
              )}
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
