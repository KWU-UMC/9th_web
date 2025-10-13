import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth";


const MyPage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response.data);

      setUser(response.data);
    }

    getData();
  }, []);

  return (
    <div className="text-white">
      {user.name} {user.email}
    </div>
  )
}

export default MyPage
