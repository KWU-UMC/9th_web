import { useEffect } from "react";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
    useEffect(() => {
        const getData = async() =>{
            const response = await getMyInfo();
            console.log(response);
        }
        getData();
    },[])
  
    return (
    <div>
      <h2>MyPage</h2>
    </div>
  )
}
export default MyPage;