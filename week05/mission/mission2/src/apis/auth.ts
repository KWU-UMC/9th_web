import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  SignoutResponse,
  useMeResponse,
} from "../types/auth";
import { axiosInstance } from "./axios";

export const signup = async (value: SignupRequest): Promise<SignupResponse> => {
  const response = await axiosInstance.post("/auth/signup", value);
  return response.data;
};

export const postSignin = async (
  value: LoginRequest
): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/signin", value);
  return response.data;
};

export const postSignout = async (): Promise<SignoutResponse> => {
  const response = await axiosInstance.post("/auth/signout");
  return response.data;
};

export const getUser = async (): Promise<useMeResponse> => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};
