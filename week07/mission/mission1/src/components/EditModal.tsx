import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { axiosInstance } from "../apis/axios";

// 태그 타입 정의
type Tag = string | { id: number; name: string };

type Props = {
  lpId: number;
  initialData: {
    title: string;
    content: string;
    thumbnail: string;
    tags: Tag[];
    published: boolean;
  };
  onClose: () => void;
};

const EditModal: React.FC<Props> = ({ lpId, initialData, onClose }) => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);
  const [thumbnail, setThumbnail] = useState(initialData.thumbnail);
  const [tags, setTags] = useState<Tag[]>(initialData.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [published, setPublished] = useState(initialData.published);

  // LP 업데이트 API 호출
  const patchLp = async () => {
    const body = {
      title,
      content,
      thumbnail,
      // 서버에는 문자열 배열만 전송
      tags: tags.map((t) => (typeof t === "string" ? t : t.name)),
      published,
    };

    const res = await axiosInstance.patch(`/v1/lps/${lpId}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: patchLp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpId] });
      alert("LP 수정 완료 ✅");
      onClose();
    },
    onError: (err: any) => {
      alert(err.message || "LP 수정 실패 ❌");
    },
  });

  const handleSubmit = () => {
    if (!title || !content || !thumbnail) {
      alert("제목, 내용, 썸네일은 필수입니다.");
      return;
    }
    mutation.mutate();
  };

  // 태그 추가
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;

    const exists = tags.some((t) =>
      typeof t === "string" ? t === trimmed : t.name === trimmed
    );
    if (!exists) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  // 태그 삭제
  const handleRemoveTag = (tagToRemove: Tag) => {
    setTags(
      tags.filter((t) =>
        typeof t === "string"
          ? t !== tagToRemove
          : t.id !== (tagToRemove as { id: number }).id
      )
    );
  };

  // 모달 내부 클릭 시 이벤트 전파 방지
  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-96 relative shadow-lg"
        onClick={handleModalClick}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">LP 수정</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="썸네일 URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
          />

          {/* 태그 입력 */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="태그 입력"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="border rounded p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {/* 태그 표시 */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <div
                key={typeof tag === "string" ? tag : tag.id}
                className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
              >
                <span>{typeof tag === "string" ? tag : tag.name}</span>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full mt-4"
            onClick={handleSubmit}
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
