import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { postLp } from "../apis/lp";
import { useAuth } from "../context/AuthContext";

type Props = {
  onClose: () => void;
};

const WriteModal: React.FC<Props> = ({ onClose }) => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      postLp(
        {
          title,
          content,
          thumbnail: thumbnailUrl,
          tags,
          published: true,
        },
        accessToken!
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      onClose();
    },
    onError: (err: any) => {
      alert(err.message || "LP 생성 실패");
    },
  });

  const handleSubmit = () => {
    if (!accessToken) {
      alert("로그인이 필요합니다");
      return;
    }
    if (!title || !content || !thumbnailUrl) {
      alert("제목, 내용, 썸네일 URL은 필수입니다");
      return;
    }
    mutation.mutate();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

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

        <h2 className="text-xl font-bold mb-4">LP 작성</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="썸네일 URL"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="LP Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="LP Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
          />

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

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
              >
                <span>{tag}</span>
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
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
            onClick={handleSubmit}
          >
            Add LP
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteModal;
