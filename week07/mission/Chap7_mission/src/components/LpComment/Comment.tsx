import type { LpComment } from "../../types/lp";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import { useState } from "react";
import usePatchComment from "../../hooks/mutations/usePatchComment";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";
import { useParams } from "react-router-dom";

interface LpCommentProps {
  comment: LpComment;
}

const Comment = ({ comment }: LpCommentProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const { data: me } = useGetMyInfo();
  const { lpid } = useParams<{ lpid: string }>(); // 댓글은 특정 LP에 속하므로 id 가져옴
  const isCommented = me?.id === comment.authorId;

  const { mutate: patchCommentMutate } = usePatchComment();
  const { mutate: deleteCommentMutate } = useDeleteComment();

  /** 댓글 수정 핸들러 */
  const handleSubmitEdit = () => {
    if (!lpid) return;
    patchCommentMutate(
      { lpId: lpid, commentId: comment.id, content: editContent },
      {
        onSuccess: () => {
          setIsEditing(false);
          setIsMenuOpen(false);
        },
      }
    );
  };

  /** 댓글 삭제 핸들러 */
  const handleDelete = () => {
    if (!lpid) return;
    deleteCommentMutate(
      { lpId: lpid, commentId: comment.id },
      {
        onSuccess: () => {
          setIsMenuOpen(false);
        },
      }
    );
  };

  return (
    <div className="flex gap-3 mt-2 items-center">
      {/* 아바타 */}
      <img src={comment.author?.avatar} className="rounded-full size-10" />

      {/* 이름 + 내용 + 케밥 버튼 + 아이콘 */}
      <div className="flex flex-1 justify-between">
        {/* 작성자 이름과 댓글 내용 */}
        <div className="flex-col flex-1">
          <h1 className="font-semibold">{comment.author?.name}</h1>
          {isEditing ? (
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitEdit();
                  }
                }}
                className="border w-full border-gray-300 rounded px-2 py-1 flex-1 text-sm"
              />
              <button
                onClick={handleSubmitEdit}
                className="text-blue-500 text-sm font-medium"
              >
                저장
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(comment.content);
                }}
                className="text-gray-500 text-sm font-medium"
              >
                취소
              </button>
            </div>
          ) : (
            <p className="text-sm mt-1">{comment.content}</p>
          )}
        </div>

        {/* 케밥 버튼 (모든 댓글에 표시) */}
        <div className="relative">
          <button onClick={() => setIsMenuOpen((prev) => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className=""
            >
              <path
                d="M12 12H12.01V12.01H12V12ZM12 5H12.01V5.01H12V5ZM12 19H12.01V19.01H12V19Z"
                stroke="black"
                strokeWidth="3.75"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* 수정/삭제 아이콘 (isCommented가 true일 때만 표시) */}
          {isMenuOpen && isCommented && (
            <div className="flex gap-2 absolute right-0 bg-white p-2 rounded shadow">
              {/* 수정 아이콘 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-neutral-600 cursor-pointer"
                onClick={() => {
                  setIsEditing(true);
                  setIsMenuOpen(false);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>

              {/* 삭제 아이콘 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-neutral-600 cursor-pointer"
                onClick={handleDelete}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
