// src/pages/MyPage.tsx
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";

type User = {
  name: string;
  email: string;
};

const MyPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const run = async () => {
      const res = await getMyInfo();
      setUser({ name: res.data.name, email: res.data.email });
    };
    void run();
  }, []);

  return (
    <div className="text-white space-y-3">
      <h1 className="text-xl font-semibold">마이페이지</h1>
      <p>유저 이름: {user?.name}</p>
      <p>이메일: {user?.email}</p>
      <button
        className="bg-pink-500 rounded-md px-3 py-1 hover:bg-pink-600"
        onClick={logout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
