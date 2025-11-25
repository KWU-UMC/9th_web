import type { CommonResponse } from "./common";

export type RequestSignupDto ={
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};

export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type RequestSigninDto = {
  email: string;
  password: string;
};

export type ResponseSigninDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type RequestPatchUser = {
  name: string;
  bio?: string;
  avatar?: string;
};

export type ResponsePatchUser = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}>