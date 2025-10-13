import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
    const [data,setData]=useState<ResponseMyInfoDto| null>(null);

    useEffect(()=>{
        const getData=async()=>{
            const response:ResponseMyInfoDto=await getMyInfo();
            console.log(response);
            setData(response);
        };

        getData();
    },[])

    return (
        <>
            <h1 className="text-block-500 font-bold px-4 ">{data?.data.name}</h1>
        </>
    )
}

export default MyPage;