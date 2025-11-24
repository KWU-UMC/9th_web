import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, type ChangeEvent } from "react";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { CommentList } from "../components/LpComment/CommentList";
import { MusicBtn } from "../components/LpDetail/MusicBtn";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import usePatchLp from "../hooks/mutations/usePatchLp";
import type { Likes } from "../types/lp";

export const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();

  const { data: lp, isPending, isError } = useGetLpDetail({lpId: Number(lpid)});
  const { data: me } = useGetMyInfo();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [editThumbnail, setEditThumbnail] = useState<string>("");

  const isLiked = lp?.likes
    .map((like: Likes) => like.userId)
    .includes(me?.id as number);
  const isAuthor = lp?.authorId == me?.id;

  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();
  const { mutate: deleteMutate } = useDeleteLp();
  const { mutate: patchMutate } = usePatchLp();

  // lp 데이터 받아오면 수정용 상태 초기화
  useEffect(() => {
    if (lp) {
      setEditTitle(lp.title);
      setEditContent(lp.content);
      setEditTags(lp.tags.map((t) => t.name));
      setEditThumbnail(lp.thumbnail);
    }
  }, [lp]);

  const handleLikeLp = () => likeMutate({lpId: Number(lpid)});
  const handleDisLikeLp = () => disLikeMutate({lpId: Number(lpid)});
  const handleDeleteLp = () => {
    if (!lpid) return;
    if (confirm("정말 이 LP를 삭제하시겠습니까?")) {
      deleteMutate({ lpId: lpid }, { onSuccess: () => navigate("/") });
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (!tag || editTags.includes(tag)) return;
    setEditTags((prev) => [...prev, tag]);
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) =>
    setEditTags((prev) => prev.filter((t) => t !== tag));

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setEditThumbnail(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!lpid) return;
    patchMutate(
      {
        lpId: lpid,
        body: {
          title: editTitle,
          content: editContent,
          thumbnail: editThumbnail,
          tags: editTags,
          published: true,
        },
      },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  if (isPending) return <div className="text-white text-3xl">Loading...</div>;
  if (isError) return <div className="text-white text-3xl">Error</div>;

  return (
    <div className="bg-black min-h-screen p-10">
      <div className="bg-neutral-200 p-10 my-20 mx-10 flex flex-col gap-5 rounded-md">
        <div className="flex gap-5 justify-center items-start">
          {/* 앨범 커버 */}
          <div className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col items-center">
            {isEditing ? (
              <div className="flex-col">
                <div className="flex justify-center mb-3">
                  <img
                    src={editThumbnail}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-full border border-gray-100"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                       file:rounded-md file:border-0 file:text-sm file:font-semibold 
                       file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>
            ) : (
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-64 h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-teal-50"
              />
            )}

            <h2 className="text-xl font-semibold text-center">{lp.title}</h2>

            <p className="text-gray-600 text-sm text-center">
              {lp.author?.name}
            </p>
            <MusicBtn />
          </div>

          {/* 앨범 설명 */}
          <div className="flex-1 p-5">
            {/* 저자 */}
            <div className="flex justify-between items-center gap-5">
              <div className="flex items-center gap-5">
                <img
                  src={lp.author?.avatar}
                  alt={lp.author?.name}
                  className="size-20 mx-auto rounded-full mb-4 shadow-lg shadow-teal-50"
                />
                <h2 className="text-xl font-semibold text-center">
                  {lp.author?.name}
                </h2>
              </div>
              <h1>{lp.createdAt.slice(0, 10)}</h1>
            </div>

            {/* LP 제목 & 수정, 삭제 */}
            <div className="flex justify-between items-center mt-4">
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border rounded border-neutral-400 px-2 py-1 flex-1 mr-2"
                />
              ) : (
                <h1 className="font-semibold text-2xl">{lp.title}</h1>
              )}

              {isAuthor && !isEditing && (
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-5 text-neutral-600 cursor-pointer"
                    onClick={handleEditClick}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-5 text-neutral-600 cursor-pointer"
                    onClick={handleDeleteLp}
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

            {/* LP 설명 */}
            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full border border-neutral-400 rounded p-2 mt-2"
              />
            ) : (
              <p className="p-3">{lp.content}</p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="태그 추가"
                    className="w-full border border-neutral-400 rounded px-2 py-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  {editTags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </>
              ) : (
                lp.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    # {tag.name}
                  </span>
                ))
              )}
            </div>

            {/* 저장/취소 버튼 */}
            {isEditing && (
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleSave}
                >
                  저장
                </button>
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                  onClick={() => setIsEditing(false)}
                >
                  취소
                </button>
              </div>
            )}

            {/* 좋아요 */}
            <div className="flex gap-3 justify-center mt-4">
              <button onClick={isLiked ? handleDisLikeLp : handleLikeLp}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`size-6 ${
                    isLiked ? "text-blue-700" : "text-gray-400"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  />
                </svg>
              </button>
              <h1 className="font-bold">{lp.likes.length}</h1>
            </div>
          </div>
        </div>

        {/* Comments */}
        <CommentList />
      </div>
    </div>
  );
};
