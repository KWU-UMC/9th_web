// src/components/comments/CommentItem.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { type LpComment } from '../../apis/lps'; // ⭐️ lps.ts에서 타입 가져오기
import { useAuth } from '../../context/AuthContext';
import { useCommentMutations } from '../../hooks/mutations/useCommentMutations';

// --- (LpDetailPage의 스타일 코드 재활용) ---
const ItemWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem 0;
  border-bottom: 1px solid #282828;
`;
const CommentAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #555;
  flex-shrink: 0;
`;
const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CommentAuthor = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
`;
const CommentBody = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
`;
const CommentDate = styled.span`
  font-size: 0.75rem;
  color: #b3b3b3;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
  
  button {
    background: none; border: none; color: #b3b3b3; cursor: pointer;
    padding: 0;
    &:hover { color: white; }
  }
`;
const EditTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  background-color: #3e3e3e;
  border: 1px solid #535353;
  color: white;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
  font-size: 0.9rem;
`;
// --- (스타일 코드 끝) ---

interface CommentItemProps {
  comment: LpComment;
  lpid: string;
  order: 'recent' | 'oldest';
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment, lpid, order }) => {
  const { user } = useAuth();
  const { updateComment, deleteComment, isUpdating, isDeleting } = 
    useCommentMutations(lpid, order);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  // ⭐️ 본인 댓글 여부 확인 (lps.ts의 Mock 데이터 기준)
  const isMyComment = user && user.id === comment.userId;

  const handleUpdate = () => {
    if (editedContent.trim() === '') return;
    updateComment(
      { commentId: comment.id, content: editedContent },
      {
        onSuccess: () => setIsEditing(false), // 수정 성공 시 수정 모드 닫기
      }
    );
  };

  const handleDelete = () => {
    if (window.confirm('댓글을 삭제하시겠습니까? (Mock)')) {
      deleteComment(comment.id);
    }
  };

  const isLoading = isUpdating || isDeleting;

  return (
    <ItemWrapper style={{ opacity: isLoading ? 0.5 : 1 }}>
      <CommentAvatar />
      <CommentContent>
        <Header>
          <CommentAuthor>{comment.author}</CommentAuthor>
          {/* 본인 댓글이고, 수정 중이 아닐 때만 버튼 노출 */}
          {isMyComment && !isEditing && (
            <ButtonWrapper>
              <button onClick={() => setIsEditing(true)} disabled={isLoading}>수정</button>
              <button onClick={handleDelete} disabled={isLoading}>삭제</button>
            </ButtonWrapper>
          )}
        </Header>
        
        {isEditing ? (
          <div>
            <EditTextarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <ButtonWrapper style={{ marginTop: '0.5rem', justifyContent: 'flex-end' }}>
              <button onClick={handleUpdate} disabled={isLoading}>
                {isUpdating ? '저장 중...' : '저장'}
              </button>
              <button onClick={() => setIsEditing(false)} disabled={isLoading}>
                취소
              </button>
            </ButtonWrapper>
          </div>
        ) : (
          <CommentBody>{comment.content}</CommentBody>
        )}
        <CommentDate>{new Date(comment.createdAt).toLocaleString()}</CommentDate>
      </CommentContent>
    </ItemWrapper>
  );
};