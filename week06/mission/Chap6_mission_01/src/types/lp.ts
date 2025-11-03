import type { CursorBasedResponse, CommonResponse } from "./common";

export type Tag ={
    id: number;
    name: string;
}

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
}

export type author = {
    id: number;
    name: string;
    email: string;
    bio: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
}

export type Lp = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
    likes: Likes[];
}

export type LpDetail = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author?: author;
    tags: Tag[];
    likes: Likes[];
}

export type LpComment = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    author?: author
}

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;
export type ResponseLpDetailDto = CommonResponse<LpDetail>;
export type ResponseLpCommentListDto = CursorBasedResponse<LpComment[]>;