import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
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

    return (
    <div className="flex flex-col gap-4 md:ml-70">
      <Link to="/" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-max">홈으로</Link>
      <h1>{data?.data?.name}님 환영합니다</h1>
      <h1>이메일: {data?.data?.email}</h1>

      <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-max"
      onClick={handleLogout}>로그아웃</button>
    </div>
  )
}
export default MyPage;