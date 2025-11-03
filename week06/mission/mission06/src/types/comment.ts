import type { CursorBasedResponse } from "./common";

export type Comment = {
  id: number;
  lpId: number;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    name: string;
    avatar: string | null;
  };
};

export type ResponseCommentsDto = CursorBasedResponse<{ data: Comment[] }>;
