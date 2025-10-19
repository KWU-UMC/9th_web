import axios from "axios";
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "../types/auth";

export const signup = async (value: SignupRequest): Promise<SignupResponse> => {
  const response = await axios.post("/v1/auth/signup", value);
  return response.data;
};

export const login = async (value: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post("/v1/auth/signin", value);
  return response.data;
};
