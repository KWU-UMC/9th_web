export interface Lp {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Array<{ id: number; name: string }>;
  likes: Array<{ id: number; userId: number; lpId: number }>;
}

export interface LpsResponse {
  data: Lp[];
  nextCursor: number | null;
  hasNext: boolean;
}
export interface CommentsResponse {
  data: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}
