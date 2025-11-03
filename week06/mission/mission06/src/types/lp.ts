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

export type ResponseLpListDto = CursorBasedResponse<{
  data: Lp[];
}>;

export type ResponseLpDto = CommonResponse<Lp>