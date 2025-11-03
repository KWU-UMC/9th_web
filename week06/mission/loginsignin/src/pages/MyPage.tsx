import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";


const MyPage = () => {
  const [user, setUser] = useState({});
  const {logout} = useAuth();

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response.data);

      setUser(response.data);
    }

    getData();
  }, []);

  const handleLogout = async ():Promise<void> => {
    await logout();
  }

  return (
    <div className="text-white">
      <h1>유저 이름: {user.name}</h1>
      <h1>이메일: {user.email}</h1>
      <button
        className="bg-pink-400 rounded-md p-1 cursor-pointer hover:bg-pink-500"
        onClick={handleLogout}
      >로그아웃</button>
    </div>
  )
}

export default MyPage
