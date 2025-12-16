import type { CommonResponse } from "./common";

export type ResquestSignupDto = {
    name : string;
    email: string;
    bio? : string;
    avatar?:string;
    password:string;
};

export type ResponseSignupDto = CommonResponse<{
    id:number;
    name:string;
    email:string;
    bio:string|null;
    avatar:string|null;
    createAt:Date;
    updateAt:Date;
}>;

export type ResquestSigninDto = {
    email: string;
    password:string;
};

export type ResponseSigninDto = CommonResponse<{
    id:number;
    name:string;
    accessToken:string;
    refreshToken:string;
}>;

export type ResponseMyInfoDto = CommonResponse<{
    id:number;
    name:string;
    email:string;
    bio:string|null;
    avatar:string|null;
    createAt:Date;
    updateAt:Date;
}>;