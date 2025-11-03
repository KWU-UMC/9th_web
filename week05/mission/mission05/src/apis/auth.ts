import axios from "./axios";
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  SignoutResponse,
} from "../types/auth";

export const signup = async (value: SignupRequest): Promise<SignupResponse> => {
  const { data } = await axios.post("/v1/auth/signup", value);
  return data;
};

export const postSignin = async (
  value: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await axios.post("/v1/auth/signin", value);
  return data;
};

export const postSignout = async (): Promise<SignoutResponse> => {
  const { data } = await axios.post("/v1/auth/signout");
  return data;
};
