// src/components/modal/LpPostModal.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  useCreateLpPost,
  useUpdateLpPost,
} from '../../hooks/mutations/useLpMutations'; // ⭐️ 상대 경로
import type { LpDetail, LpUpdateData } from '../../apis/lps'; // ⭐️ 상대 경로

// --- (스타일 코드) ---
const Overlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.7); display: flex;
  justify-content: center; align-items: center; z-index: 2000;
`;
const ModalWrapper = styled.div`
  background-color: #282828; padding: 2rem; border-radius: 8px;
  width: 90%; max-width: 500px; position: relative; color: white;
  max-height: 90vh; overflow-y: auto;
`;
const CloseButton = styled.button`
  position: absolute; top: 1rem; right: 1rem; background: none;
  border: none; color: white; font-size: 1.5rem; cursor: pointer;
`;
const Form = styled.form`
  display: flex; flex-direction: column; gap: 1rem;
`;
const Input = styled.input`
  padding: 0.5rem; border-radius: 4px; border: 1px solid #535353;
  background-color: #3e3e3e; color: white;
`;
const TextArea = styled.textarea`
  padding: 0.5rem; border-radius: 4px; border: 1px solid #535353;
  background-color: #3e3e3e; color: white; min-height: 100px; resize: vertical;
`;
const SubmitButton = styled.button`
  padding: 0.75rem; border-radius: 4px; border: none;
  background-color: #f0f; color: black; font-weight: bold;
  cursor: pointer;
  &:disabled { background-color: #535353; }
`;
const TagWrapper = styled.div`
  display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;
`;
const Tag = styled.span`
  background-color: #f0f; color: black; padding: 0.25rem 0.5rem;
  border-radius: 12px; font-size: 0.8rem; display: flex;
  align-items: center; gap: 0.25rem;
  
  button {
    background: none; border: none; color: black; cursor: pointer;
    font-weight: bold; padding: 0; line-height: 1;
  }
`;
// --- (스타일 코드 끝) ---

interface LpPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingLp?: LpDetail | null; // 수정 모드일 때 전달받을 기존 데이터
}

export const LpPostModal: React.FC<LpPostModalProps> = ({ isOpen, onClose, existingLp }) => {
  const isEditMode = !!existingLp;
  
  // 폼 상태
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // 태그 상태 (클라이언트)
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  // Mutation 훅
  const createLp = useCreateLpPost();
  const updateLp = useUpdateLpPost(existingLp?.id.toString() || '');

  // 모달이 열리거나 수정 데이터가 변경될 때 폼 상태 초기화
  useEffect(() => {
    if (isOpen) {
      if (isEditMode && existingLp) {
        setTitle(existingLp.title);
        setArtist(existingLp.artist || '');
        setContent(existingLp.content || '');
        setTags([]); // (API에 태그 있으면 existingLp.tags로)
        setImageFile(null); 
      } else {
        setTitle('');
        setArtist('');
        setContent('');
        setImageFile(null);
        setTags([]);
        setCurrentTag('');
      }
    }
  }, [isOpen, isEditMode, existingLp]);

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      // --- 수정 로직 ---
      const updateData: LpUpdateData = { title, artist, content };
      updateLp.mutate(updateData, {
        onSuccess: () => onClose(), // 성공 시 모달 닫기
      });
    } else {
      // --- 생성 로직 ---
      if (!imageFile || !title) {
        alert('LP 사진과 제목은 필수입니다.');
        return;
      }
      createLp.mutate(
        { title, artist, content, image: imageFile, tags },
        {
          onSuccess: () => onClose(), // 성공 시 모달 닫기
        }
      );
    }
  };

  if (!isOpen) return null;

  return (
    // 모달 바깥 영역 클릭 시 닫기
    <Overlay onClick={onClose}>
      {/* 모달 컨텐츠 클릭 시 이벤트 전파 중단 */}
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {/* 'X' 버튼 클릭 시 닫기 */}
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>{isEditMode ? 'LP 수정하기' : 'LP 추가하기'}</h2>
        <Form onSubmit={handleSubmit}>
          {/* 생성 모드일 때만 파일 입력 보이기 */}
          {!isEditMode && (
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
            />
          )}
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
          <Input value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="아티스트" />
          <TextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용" />
          
          {/* 태그 추가/삭제 UI */}
          <div>
            <div>
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="태그 입력"
              />
              <button type="button" onClick={handleAddTag}>
                추가
              </button>
            </div>
            <TagWrapper>
              {tags.map((tag) => (
                <Tag key={tag}>
                  {tag} <button type="button" onClick={() => handleRemoveTag(tag)}>x</button>
                </Tag>
              ))}
            </TagWrapper>
          </div>

          <SubmitButton type="submit" disabled={createLp.isPending || updateLp.isPending}>
            {isEditMode ? (updateLp.isPending ? '수정 중...' : '수정하기')
                        : (createLp.isPending ? '등록 중...' : 'Add LP')}
          </SubmitButton>
        </Form>
      </ModalWrapper>
    </Overlay>
  );
};