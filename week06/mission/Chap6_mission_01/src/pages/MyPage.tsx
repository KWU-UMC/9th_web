import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../hooks/useAuth";

const MyPage = () => {
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
      setData(response);
    };
    getData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <div>
      <h1 className="mt-10 text-3xl font-bold text-center text-shadow-2xs text-shadow-blue-600">
        마이 페이지
      </h1>
      <div>
        <div className="max-w-2xl mx-4 mt-16 text-gray-900 bg-white rounded-lg shadow-xl sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto">
          <div className="h-32 overflow-hidden rounded-t-lg bg-blue-"></div>
          <div className="bg-blue-400 relative w-32 h-32 mx-auto -mt-16 overflow-hidden border-4 border-white rounded-full"></div>
          <div className="mt-2 text-center">
            <h2 className="font-semibold">{data?.data?.name}</h2>
            <p className="text-gray-500">✉ {data?.data?.email}</p>
          </div>
          <ul className="flex items-center justify-around py-4 mt-2 text-gray-700">
            <li className="flex flex-col items-center justify-around">
              <div className="w-6 h-6 mb-1 rounded-full ">🏫</div>
              <div className="text-md font-semibold">광운대학교</div>
            </li>
            <li className="flex flex-col items-center justify-around">
              <div className="w-6 h-6 mb-1 rounded-full ">♀️</div>
              <div className="text-md font-semibold">여자</div>
            </li>
            <li className="flex flex-col items-center justify-around">
              <div className="w-6 h-6 mb-1 rounded-full ">🌍</div>
              <div className="text-md font-semibold">한국</div>
            </li>
          </ul>
          <div className="p-4 mx-8 mt-2 border-t">
            <button
              className="block w-1/2 px-6 py-2 mx-auto font-semibold text-white bg-red-500 rounded-lg cursor-pointer hover:shadow-lg"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;