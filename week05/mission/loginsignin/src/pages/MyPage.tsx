import { useEffect, useState } from "react"
import { getMyInfo, postSignout } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";


const MyPage = () => {
  const [user, setUser] = useState({});
  const {removeItem:removeAccessTokenFromStorage} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {removeItem:removeRefreshTokenFromStorage} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response.data);

      setUser(response.data);
    }

    getData();
  }, []);

  const logout = async ():Promise<void> => {
    try{
      await postSignout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      alert("로그아웃 성공");
      navigate("/");
    } catch(error){
      console.error("로그아웃 실패", error);
      alert("로그아웃 실패");
    }
  }

  return (
    <div className="text-white">
      <h1>유저 이름: {user.name}</h1>
      <h1>이메일: {user.email}</h1>
      <button
        className="bg-pink-400 rounded-md p-1 cursor-pointer hover:bg-pink-500"
        onClick={logout}
      >로그아웃</button>
    </div>
  )
}

export default MyPage
