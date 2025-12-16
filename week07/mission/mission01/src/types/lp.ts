import type { CursorBasedResponse } from "./common";

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
    authorld: number;
    ceatedAt: string;
    updatedAt: string;
    tags: Tag[];
    likes: Likes[];
}

export type ResponseLpListDto = CursorBasedResponse<Lp[]>

export type ResponseLpDetailDto = {
    status: boolean;
    statusCode: number;
    message: string;
    data: {
        id: number;
        title: string;
        content: string;
        thumbnail: string;
        published: boolean;
        authorld: number;
        ceatedAt: string;
        updatedAt: string;
        tags: Tag[];
        likes: Likes[];
    };
};
