import type { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
}

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
  author?: {
    id: number;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type Comments = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    id: number;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseLpDto = CommonResponse<Lp>

export type RequestLpDto = {
  lpId: number;
  commentId?: number;
  body?: {
    content: string;
  };
}

export type RequestPatchComment = CommonResponse<Comments>;

export type RequestDeleteComment = CommonResponse<{
  message: string;
}>;

export type ResponseComments = CursorBasedResponse<Comments[]>;

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type RequestCreateLp = {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  published:boolean;
};

export type ResponseCreateLp = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}>;

export type RequestPatchLp = {
  lpId: number;
  body: RequestCreateLp;
}

export type ResponsePatchLp = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
}>;

export type ResponseDeleteLp = CommonResponse<boolean>;