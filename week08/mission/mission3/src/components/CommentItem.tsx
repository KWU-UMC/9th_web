// components/CommentItem.tsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment, deleteComment } from "../apis/comments";
import { useAuth } from "../context/authContext";
import type { Comment } from "../types/comments";

interface CommentItemProps {
  comment: Comment;
  lpid: string;
  order: "asc" | "desc";
}

export default function CommentItem({
  comment,
  lpid,
  order,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (content: string) =>
      updateComment(lpid, comment.id, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, order] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(lpid, comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, order] });
    },
  });

  const handleEditStart = () => {
    setEditContent(comment.content); // 수정 시작할 때 초기화
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditContent(""); // 취소 시 초기화
  };

  const handleEdit = () => {
    if (!editContent.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }
    updateMutation.mutate(editContent);
  };

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };

  const isAuthor = user?.id === comment.authorId;

  return (
    <div className="border-b border-gray-700 py-4">
      {isEditing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg resize-none"
            rows={3}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleEdit}
              disabled={updateMutation.isPending}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-50"
            >
              {updateMutation.isPending ? "수정 중..." : "수정"}
            </button>
            <button
              onClick={handleEditCancel}
              disabled={updateMutation.isPending}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover bg-gray-700"
                src={comment.author.avatar || "https://via.placeholder.com/40"}
                alt={comment.author.name}
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

            {isAuthor && (
              <div className="flex gap-2">
                <button
                  onClick={handleEditStart}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="text-sm text-gray-400 hover:text-red-500 disabled:opacity-50"
                >
                  {deleteMutation.isPending ? "삭제 중..." : "삭제"}
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-300 ml-13">{comment.content}</p>
        </>
      )}
    </div>
  );
}
