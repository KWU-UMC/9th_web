import axios from "axios";
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  SignoutResponse,
} from "../types/auth";

export const signup = async (value: SignupRequest): Promise<SignupResponse> => {
  const response = await axios.post("/v1/auth/signup", value);
  return response.data;
};

export const postSignin = async (
  value: LoginRequest
): Promise<LoginResponse> => {
  const response = await axios.post("/v1/auth/signin", value);
  return response.data;
};

export const postSignout = async (): Promise<SignoutResponse> => {
  const response = await axios.post("/v1/auth/signout");
  return response.data;
};
