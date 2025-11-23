
import { LOCAL_STORAGE_KEY } from "../constants/key";
import type { RequestSigninDto, RequestSignupDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth"
import { axiosInstance } from "./axios";

export const postSignup = async (body : RequestSignupDto):Promise<ResponseSignupDto> =>{
    const { data } = await axiosInstance.post("/v1/auth/signup", body);
    
    return data;
};

export const postSignin = async (body : RequestSigninDto):Promise<ResponseSigninDto> =>{
    const { data } = await axiosInstance.post("/v1/auth/signin", body);
    
    return data;
};


export const getMyInfo = async () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  if (!token) throw new Error("토큰 없음");

  const cleanToken = token.replace(/"/g, ""); // 큰따옴표 제거

  const { data } = await axiosInstance.get("/v1/users/me", {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
    },
  });

  return data;
};


export const postLogout = async () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)?.replace(/"/g, "");
  if (!token) throw new Error("토큰 없음");

  const { data } = await axiosInstance.post("/v1/auth/signout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const updateMyInfo = async (data: {
  name: string;
  bio?: string;
  avatar?: string;
}) => {
  const response = await axiosInstance.patch("/v1/users", data);
  return response.data;
};