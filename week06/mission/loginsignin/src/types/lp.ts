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
  thumbnail:string;
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
    bio: string | null;
    avatar: string | null;
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
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseLpDto = CommonResponse<Lp>

export type ResponseComments = CursorBasedResponse<Comments[]>;