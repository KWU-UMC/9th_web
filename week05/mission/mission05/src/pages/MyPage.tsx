import { useEffect, useState } from "react";
import axios from "../apis/axios";
import { useAuth } from "../context/authContext";

type MeData = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
};

type ApiResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export default function MyPage() {
  const { accessToken } = useAuth();
  const [st, setSt] = useState<{ loading: boolean; error: string; data?: MeData }>({
    loading: true,
    error: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<ApiResponse<MeData>>("/v1/users/me");
        setSt({ loading: false, error: "", data: data.data });
      } catch (e: any) {
        setSt({ loading: false, error: e?.message ?? "불러오기 실패" });
      }
    })();
  }, [accessToken]);

  if (st.loading) return <div className="p-6">Loading...</div>;
  if (st.error) return <div className="p-6 text-red-400">에러: {st.error}</div>;

  const d = st.data!;
  return (
    <div className="card max-w-xl">
      <h1 className="mb-2 text-2xl font-bold text-white">My Page</h1>
      <ul className="space-y-1 text-sm text-gray-200">
        <li><b>Name:</b> {d.name}</li>
        <li><b>Email:</b> {d.email}</li>
        <li><b>Bio:</b> {d.bio ?? "-"}</li>
        <li><b>Avatar:</b> {d.avatar ?? "-"}</li>
      </ul>
    </div>
  );
}
