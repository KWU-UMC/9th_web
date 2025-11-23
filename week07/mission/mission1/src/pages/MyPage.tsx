import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/authContext";
import { updateProfile } from "../apis/auth";

export default function MyPage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setIsEditing(false);
      setAvatarBase64(null);
    },
  });

  const handleEditStart = () => {
    if (user) {
      setName(user.name);
      setBio(user.bio || "");
      setPreviewUrl(user.avatar || "");
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarBase64(null);
    setPreviewUrl("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    const payload: {
      name: string;
      bio?: string;
      avatar?: string;
    } = {
      name,
    };

    if (bio.trim()) {
      payload.bio = bio;
    }

    if (avatarBase64) {
      payload.avatar = avatarBase64;
    }

    updateProfileMutation.mutate(payload);
  };

  if (!user) {
    return (
      <div className="p-4 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white">로그인이 필요합니다.</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8">
          {!isEditing ? (
            <div className="flex items-center gap-6">
              <img
                src={user.avatar || "https://via.placeholder.com/100"}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">
                  {user.name}
                </h1>
                {user.bio && <p className="text-gray-300 mt-2">{user.bio}</p>}
              </div>
              <button
                onClick={handleEditStart}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                설정
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 프로필 사진 */}
              <div className="flex items-center gap-6">
                <img
                  src={previewUrl || "https://via.placeholder.com/100"}
                  alt="프로필"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <span className="px-3 py-2 bg-gray-700 text-white text-sm rounded hover:bg-gray-600">
                    사진 변경
                  </span>
                </label>
              </div>

              {/* 이름 */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">이름</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  placeholder="이름"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Bio (선택)
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded resize-none"
                  placeholder="자기소개"
                  rows={4}
                />
              </div>

              {/* 버튼 */}
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={updateProfileMutation.isPending}
                  className="flex-1 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-50"
                >
                  {updateProfileMutation.isPending ? "저장 중..." : "저장"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={updateProfileMutation.isPending}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
