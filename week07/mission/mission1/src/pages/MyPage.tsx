import { useEffect, useState } from "react";
import { getMyInfo, updateMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../App";

const MyPage = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (err: any) {
        if (err.response?.status === 401) {
          alert("인증 실패. 다시 로그인해주세요.");
          navigate("/login");
        } else {
          console.error(err);
        }
      }
    };
    getData();
  }, [navigate]);
  
    const handleLogout = async () =>{
      await logout();
      navigate("/");
    }

    const mutation = useMutation({
    mutationFn: updateMyInfo,
    onSuccess: (res) => {
      alert("정보가 성공적으로 수정되었습니다!");
      setData(res);
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      setIsEditing(false);
    },
    onMutate: async (newData) => {
      const previousData = queryClient.getQueryData(["myInfo"]);

      queryClient.setQueryData(["myInfo"], (oldData: any) => {
        const currentData = oldData?.data || {
          name: "",
          bio: "",
          avatar: "",
          email: "", // 필요한 기본값
        };

        return {
          ...oldData,
          data: {
            ...currentData,
            name: newData.name || currentData.name,
            bio: newData.bio ?? currentData.bio,
            avatar: newData.avatar ?? currentData.avatar,
      },
    };
  });

  return { previousData };
},
    onError: (err: any) => {
      console.error(err);
      alert("정보 수정 중 오류가 발생했습니다.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name: name.trim(),
      bio: bio.trim() || "",
      avatar: avatar.trim() || "",
    });
  };

    return (
    <div className="flex flex-col gap-4 md:ml-70">
      <Link to="/" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-max">홈으로</Link>
      <img src={
            data?.data?.avatar ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          } className="w-50 h-50"/>
      <h1>{data?.data?.name}님 환영합니다</h1>
      <h1>{data?.data?.bio ? `자기소개 : ${data?.data?.bio}` : null}</h1>
      <h1>이메일: {data?.data?.email}</h1>

      <button
        className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors w-max"
        onClick={() => setIsEditing((prev) => !prev)}
      >
        {isEditing ? "닫기" : "설정"}
      </button>

      <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-max"
      onClick={handleLogout}>로그아웃</button>

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 border rounded-lg p-4 flex flex-col gap-3 w-full max-w-md bg-gray-50"
        >
          <h2 className="text-lg font-semibold">프로필 수정</h2>

          <label className="flex flex-col">
            <span className="font-medium text-sm mb-1">이름 *</span>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="border rounded p-2"
              placeholder="이름을 입력하세요"
            />
          </label>

          <label className="flex flex-col">
            <span className="font-medium text-sm mb-1">Bio (선택)</span>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border rounded p-2"
              placeholder="자기소개를 입력하세요 (비워도 됨)"
            />
          </label>

          <label className="flex flex-col">
            <span className="font-medium text-sm mb-1">프로필 이미지 URL (선택)</span>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="border rounded p-2"
              placeholder="https://example.com/avatar.png"
            />
          </label>

          {avatar && (
            <img
              src={avatar}
              alt="미리보기"
              className="w-24 h-24 rounded-full object-cover mt-2 border"
            />
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors w-max disabled:opacity-50"
          >
            {mutation.isPending ? "저장 중..." : "저장"}
          </button>
        </form>
      )}

    </div>
  )
}
export default MyPage;