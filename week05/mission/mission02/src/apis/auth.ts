import type { ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto, ResquestSigninDto, ResquestSignupDto } from "../types/auth";
import { axiosInstance } from "./axios";

export const postSingup = async (body:ResquestSignupDto):Promise<ResponseSignupDto> => {
    const {data} = await axiosInstance.post("/v1/auth/signup",body);
    return data;
}

export const postSingin = async (body:ResquestSigninDto):Promise<ResponseSigninDto> => {
    const {data} = await axiosInstance.post("/v1/auth/signin",body);
    return data;
}

export const getMyInfo = async():Promise<ResponseMyInfoDto> => {
    const {data} = await axiosInstance.get("/v1/users/me");
    return data;
}

export const postLogout = async()=>{
    const {data} = await axiosInstance.post("/v1/auth/signout");
    return data;
}