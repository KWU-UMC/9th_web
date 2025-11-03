import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
    const {logout}=useAuth();
    const [data,setData]=useState<ResponseMyInfoDto| null>(null);

    useEffect(()=>{
        const getData=async()=>{
            const response:ResponseMyInfoDto=await getMyInfo();
            console.log(response);
            setData(response);
        };

        getData();
    },[])

    const handleLogout = async () => {
        await logout();
    }

    return (
        <>
            <h1 className="text-block-500 font-bold px-4 ">{data?.data?.name}님 환영합니다.</h1>
            <img src={data?.data?.avatar as string} alt={"구글 로고"}/>
            <button className="h-10 rounded text-gray-400 border items-center justify-start px-3 mb-3 text-sm" onClick={handleLogout}>
                로그아웃
            </button>
        </>
    )
}

export default MyPage;