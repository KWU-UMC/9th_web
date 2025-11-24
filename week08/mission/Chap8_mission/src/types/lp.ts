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

export type LpLike = {
    id:number
    userId: number
    lpId: number
}

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;
export type ResponseLpDetailDto = CommonResponse<LpDetail>;
export type ResponseLpCommentListDto = CursorBasedResponse<LpComment[]>;
export type ResponseLikeLpDto = CommonResponse<LpLike>;

export type RequestLpDto = {
  lpId: number;
  commentId?: number;
  body?: {
    content: string;
  };
}

// LP 생성 요청 DTO
export type RequestCreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[]; // 문자열 배열로 전송
  published: boolean;
};

// LP 생성 성공 응답
export type ResponseCreateLpDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}>;

export type ResponsePatchLpCommentDto = CommonResponse<LpComment>;
export type ResponseDeleteLpCommentDto = CommonResponse<{message: string;}>

// LP 내용 수정 요청 DTO
export type RequestPatchLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[]; // 문자열 배열로 전송
  published: boolean;
};

export type ResponseDeleteLpDto = CommonResponse<{data: boolean;}>