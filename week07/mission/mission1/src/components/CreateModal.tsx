// components/CreateModal.tsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLps } from "../apis/lps";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Tag {
  id: number;
  text: string;
}

export default function CreateModal({ isOpen, onClose }: CreateModalProps) {
  const [lpName, setLpName] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailBase64, setThumbnailBase64] = useState<string>("");
  const [fileName, setFileName] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState("");

  const queryClient = useQueryClient();

  const createLpMutation = useMutation({
    mutationFn: postLps,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      resetForm();
      onClose();
    },
  });

  const resetForm = () => {
    setLpName("");
    setContent("");
    setThumbnailBase64("");
    setFileName("");
    setTags([]);
    setTagInput("");
  };

  const handleCreateTags = () => {
    if (tagInput.trim()) {
      setTags([...tags, { id: Date.now(), text: tagInput.trim() }]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);

      // base64 변환
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (
      !lpName.trim() ||
      !content.trim() ||
      !thumbnailBase64 ||
      tags.length === 0
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    createLpMutation.mutate({
      title: lpName,
      content: content,
      thumbnail: thumbnailBase64, // base64 string
      tags: tags.map((tag) => tag.text),
      published: false,
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 flex justify-end">
          <button onClick={onClose} className="text-gray-400 text-2xl">
            ✕
          </button>
        </header>

        <main className="p-6 space-y-4">
          <label className="inline-block">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="px-3 py-1 bg-gray-700 text-white text-sm rounded cursor-pointer inline-block hover:bg-gray-600">
              {fileName || "썸네일 선택"}
            </div>
          </label>

          <input
            placeholder="LP Name"
            value={lpName}
            onChange={(e) => setLpName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded placeholder:text-gray-500"
          />

          <textarea
            placeholder="LP Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded resize-none placeholder:text-gray-500"
            rows={5}
          />

          <div className="flex gap-2">
            <input
              placeholder="LP Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateTags()}
              className="flex-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded placeholder:text-gray-500"
            />
            <button
              onClick={handleCreateTags}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
            >
              Add
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-800 text-white border border-gray-700 rounded"
                >
                  <span>{tag.text}</span>
                  <button
                    onClick={() => handleDeleteTag(tag.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={createLpMutation.isPending}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 hover:bg-gray-400"
          >
            {createLpMutation.isPending ? "추가 중..." : "Add LP"}
          </button>
        </main>
      </div>
    </div>,
    document.body
  );
}
