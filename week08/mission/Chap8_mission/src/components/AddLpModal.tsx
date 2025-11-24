import { useState, type ChangeEvent, type FormEvent } from "react";
import usePostLp from "../hooks/mutations/usePostLp";
import type { RequestCreateLpDto } from "../types/lp";

type AddLpModalProps = {
  onClose: () => void;
};

const AddLpModal = ({ onClose }: AddLpModalProps) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [lpName, setLpName] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const { mutate } = usePostLp();

  const previewUrl = thumbnail ? URL.createObjectURL(thumbnail) : null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setThumbnail(file);
  };

  // 태그 추가
  const handleAddTag = (e: FormEvent) => {
    e.preventDefault();
    const tag = tagInput.trim();
    if (!tag || tags.includes(tag)) return;
    setTags((prev) => [...prev, tag]);
    setTagInput("");
  };

  // 태그 삭제
  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  // LP 생성
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!lpName.trim()) return;

    // 미리보기 URL을 임시로 전송 (실제 서버 업로드 시 FormData 필요)
    const thumbnailUrl = previewUrl ?? "";

    const body: RequestCreateLpDto = {
      title: lpName,
      content,
      thumbnail: thumbnailUrl,
      tags,
      published: true,
    };

    mutate(body, {
      onSuccess: () => {
        onClose(); // 모달 닫기
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-neutral-700 rounded-lg shadow-lg w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          {/* 이미지 미리보기 */}
          {previewUrl && (
            <div className="flex justify-center mb-3">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-md border border-gray-500"
              />
            </div>
          )}

          {/* 파일 업로드 */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                       file:rounded-md file:border-0 file:text-sm file:font-semibold 
                       file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />

          {/* LP 이름 */}
          <input
            type="text"
            value={lpName}
            onChange={(e) => setLpName(e.target.value)}
            placeholder="LP Name"
            className="w-full rounded-md border border-[#e0e0e0] py-3 px-6 
                       text-base font-medium text-[#e0e1e6] bg-transparent
                       outline-none focus:shadow-sm focus:shadow-blue-100"
          />

          {/* LP 내용 */}
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="LP Content"
            className="w-full rounded-md border border-[#e0e0e0] py-3 px-6 
                       text-base font-medium text-[#e0e1e6] bg-transparent
                       outline-none focus:shadow-sm focus:shadow-blue-100"
          />

          {/* 태그 입력 */}
          <div className="flex gap-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="LP Tag"
              className="w-full rounded-md border border-[#e0e0e0] py-3 px-6 
                         text-base font-medium text-[#e0e1e6] bg-transparent
                         outline-none focus:shadow-sm focus:shadow-blue-100"
            />
            <button
              onClick={handleAddTag}
              className="hover:bg-[#524bd8] rounded-md bg-[#6A64F1] py-3 px-8 
                         text-base font-semibold text-white outline-none disabled:opacity-50"
              disabled={!tagInput.trim()}
            >
              Add
            </button>
          </div>

          {/* 태그 목록 */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-white hover:text-gray-200"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          {/* LP 추가 버튼 */}
          <button
            type="submit"
            disabled={!lpName.trim() }
            className="hover:bg-[#524bd8] rounded-md bg-[#6A64F1] py-3 px-8 
                       text-base font-semibold text-white outline-none
                       disabled:opacity-50 w-full transition"
          >
            Add LP
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLpModal;