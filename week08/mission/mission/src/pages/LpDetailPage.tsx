import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  getLpDetail,
  updateLps,
  deleteLp,
  postLikes,
  deleteLikes,
} from "../apis/lps";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorState from "../components/ErrorState";
import {
  getLpComments,
  postComment,
  updateComment,
  deleteComment,
} from "../apis/comments";
import { useAuth } from "../context/authContext";
import type { Lp } from "../types/lps";
interface Tag {
  id: number;
  text: string;
}

export default function LpDetailPage() {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [commentInput, setCommentInput] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  // LP 편집 모드
  const [isEditingLp, setIsEditingLp] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editThumbnailBase64, setEditThumbnailBase64] = useState("");
  const [editFileName, setEditFileName] = useState("");
  const [editTags, setEditTags] = useState<Tag[]>([]);
  const [editTagInput, setEditTagInput] = useState("");

  const observerTarget = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // LP 좋아요/취소
  const toggleLikeMutation = useMutation({
    mutationFn: (isCurrentlyLiked: boolean) => {
      return isCurrentlyLiked ? deleteLikes(lpid!) : postLikes(lpid!);
    },
    onMutate: async (isCurrentlyLiked) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: ["lp", lpid] });

      // 이전 값 백업
      const previousLp = queryClient.getQueryData(["lp", lpid]);

      // 낙관적 업데이트
      queryClient.setQueryData(["lp", lpid], (old: Lp) => {
        if (!old || !user) return old;

        const newLikes = isCurrentlyLiked
          ? old.likes.filter((like) => like.userId !== user.id)
          : [...old.likes, { userId: user.id }];

        return {
          ...old,
          likes: newLikes,
        };
      });

      return { previousLp };
    },
    onError: (error, isCurrentlyLiked, context) => {
      // 에러 시 롤백
      if (context?.previousLp) {
        queryClient.setQueryData(["lp", lpid], context.previousLp);
      }
      console.error("좋아요 토글 실패:", error);
    },
    onSettled: () => {
      // 성공/실패 상관없이 최신 데이터로 동기화
      queryClient.invalidateQueries({ queryKey: ["lp", lpid] });
    },
  });

  // LP 수정
  const updateLpMutation = useMutation({
    mutationFn: (value: {
      title: string;
      content: string;
      thumbnail: string;
      tags: string[];
    }) => {
      return updateLps(lpid!, value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpid] });
      setIsEditingLp(false);
    },
    onError: (error) => {
      console.error(" LP 수정 실패:", error);
    },
  });

  // LP 삭제
  const deleteLpMutation = useMutation({
    mutationFn: () => {
      return deleteLp(lpid!);
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("LP 삭제 실패:", error);
    },
  });

  // 댓글 작성
  const createCommentMutation = useMutation({
    mutationFn: (value: { content: string }) => postComment(lpid!, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, order] });
      setCommentInput("");
    },
  });

  // 댓글 수정
  const updateCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => updateComment(lpid!, commentId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, order] });
      setEditingCommentId(null);
      setEditingContent("");
    },
  });

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(lpid!, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, order] });
    },
  });

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

  const handleLpEditStart = () => {
    if (data) {
      setEditTitle(data.title);
      setEditContent(data.content);
      setEditThumbnailBase64(data.thumbnail);
      setEditTags(data.tags.map((tag) => ({ id: tag.id, text: tag.name })));
      setIsEditingLp(true);
    }
  };

  const handleLpEditCancel = () => {
    setIsEditingLp(false);
    setEditTitle("");
    setEditContent("");
    setEditThumbnailBase64("");
    setEditFileName("");
    setEditTags([]);
    setEditTagInput("");
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditThumbnailBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditTagCreate = () => {
    if (editTagInput.trim()) {
      setEditTags([...editTags, { id: Date.now(), text: editTagInput.trim() }]);
      setEditTagInput("");
    }
  };

  const handleEditTagDelete = (id: number) => {
    setEditTags(editTags.filter((tag) => tag.id !== id));
  };

  const handleLpEditSubmit = () => {
    if (!editTitle.trim() || !editContent.trim() || editTags.length === 0) {
      alert("제목, 내용, 태그를 모두 입력해주세요.");
      return;
    }
    updateLpMutation.mutate({
      title: editTitle,
      content: editContent,
      thumbnail: editThumbnailBase64,
      tags: editTags.map((tag) => tag.text),
    });
  };

  const handleLpDelete = () => {
    if (confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      deleteLpMutation.mutate();
    }
  };

  const handleLike = () => {
    toggleLikeMutation.mutate(isLiked);
  };

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }
    createCommentMutation.mutate({ content: commentInput });
  };

  const handleEditStart = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleEditSubmit = (commentId: number) => {
    if (!editingContent.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }
    updateCommentMutation.mutate({ commentId, content: editingContent });
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleDelete = (commentId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState onRetry={refetch} />;
  if (!data) return null;

  const isLiked = user
    ? data.likes.some((like) => like.userId === user.id)
    : false;

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* LP 썸네일 */}
        <div className="mb-8 overflow-hidden rounded-2xl">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* LP 내용 */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-6">
          {isEditingLp ? (
            // 편집 모드
            <div className="space-y-4">
              {/* 썸네일 변경 */}
              <label className="inline-block">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleEditFileChange}
                />
                <div className="px-3 py-1 bg-gray-700 text-white text-sm rounded cursor-pointer inline-block hover:bg-gray-600">
                  {editFileName || "썸네일 변경"}
                </div>
              </label>

              {/* 제목 */}
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white text-3xl font-bold rounded"
                placeholder="제목"
              />

              {/* 내용 */}
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded resize-none"
                rows={10}
                placeholder="내용"
              />

              {/* 태그 */}
              <div className="flex gap-2">
                <input
                  placeholder="태그 추가"
                  value={editTagInput}
                  onChange={(e) => setEditTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEditTagCreate()}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded"
                />
                <button
                  onClick={handleEditTagCreate}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                >
                  추가
                </button>
              </div>

              {/* 태그 목록 */}
              {editTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {editTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center gap-2 px-3 py-1 bg-pink-600 text-white rounded-full text-sm"
                    >
                      <span>#{tag.text}</span>
                      <button
                        onClick={() => handleEditTagDelete(tag.id)}
                        className="hover:text-gray-200"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 저장/취소 버튼 */}
              <div className="flex gap-2">
                <button
                  onClick={handleLpEditSubmit}
                  disabled={updateLpMutation.isPending}
                  className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-50"
                >
                  {updateLpMutation.isPending ? "저장 중..." : "저장"}
                </button>
                <button
                  onClick={handleLpEditCancel}
                  disabled={updateLpMutation.isPending}
                  className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            // 일반 모드
            <>
              <h1 className="text-5xl font-bold text-white mb-6">
                {data.title}
              </h1>
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
              <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
                {data.content}
              </div>
            </>
          )}
        </div>

        {/* 액션 버튼 */}
        {!isEditingLp && (
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleLpEditStart}
              className="flex-1 px-6 py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600"
            >
              수정
            </button>
            <button
              onClick={handleLpDelete}
              disabled={deleteLpMutation.isPending}
              className="flex-1 px-6 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50"
            >
              {deleteLpMutation.isPending ? "삭제 중..." : "삭제"}
            </button>
            <button
              onClick={handleLike}
              disabled={toggleLikeMutation.isPending}
              className={`flex-1 px-6 py-4 rounded-xl transition ${
                isLiked
                  ? "bg-pink-600 text-white hover:bg-pink-700"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              } disabled:opacity-50`}
            >
              {isLiked ? "❤️ 좋아요 취소" : "🖤 좋아요"}
            </button>
          </div>
        )}

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
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="w-full p-4 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-600"
              rows={3}
            />
            <button
              onClick={handleCommentSubmit}
              disabled={createCommentMutation.isPending}
              className="mt-2 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
            >
              {createCommentMutation.isPending ? "작성 중..." : "댓글 작성"}
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
                    className="border-b border-gray-700 py-4 last:border-0"
                  >
                    {editingCommentId === comment.id ? (
                      // 수정 모드
                      <div>
                        <textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          className="w-full p-3 bg-gray-700 text-white rounded-lg resize-none"
                          rows={3}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleEditSubmit(comment.id)}
                            disabled={updateCommentMutation.isPending}
                            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-50"
                          >
                            {updateCommentMutation.isPending
                              ? "수정 중..."
                              : "수정"}
                          </button>
                          <button
                            onClick={handleEditCancel}
                            disabled={updateCommentMutation.isPending}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      // 일반 모드
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <img
                              className="w-10 h-10 rounded-full object-cover bg-gray-700"
                              src={
                                comment.author.avatar ||
                                "https://via.placeholder.com/40"
                              }
                              alt={comment.author.name}
                            />
                            <div>
                              <span className="font-bold text-white">
                                {comment.author.name}
                              </span>
                              <span className="text-sm text-gray-400 ml-2">
                                {new Date(
                                  comment.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {user?.id === comment.authorId && (
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleEditStart(comment.id, comment.content)
                                }
                                className="text-sm text-gray-400 hover:text-white"
                              >
                                수정
                              </button>
                              <button
                                onClick={() => handleDelete(comment.id)}
                                disabled={deleteCommentMutation.isPending}
                                className="text-sm text-gray-400 hover:text-red-500 disabled:opacity-50"
                              >
                                삭제
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-300 pl-[52px]">
                          {comment.content}
                        </p>
                      </div>
                    )}
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

          {/* 하단 로딩 */}
          {isFetchingNextPage && <CommentSkeleton />}

          {/* Intersection Observer 타겟 */}
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
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gray-700 rounded-full" />
        <div className="flex-1">
          <div className="h-4 bg-gray-700 rounded w-24 mb-1" />
          <div className="h-3 bg-gray-700 rounded w-32" />
        </div>
      </div>
      <div className="pl-[52px]">
        <div className="h-4 bg-gray-700 rounded w-full mb-2" />
        <div className="h-4 bg-gray-700 rounded w-3/4" />
      </div>
    </div>
  );
}
