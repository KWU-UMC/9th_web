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

export interface LPRequest {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

export interface PostLPsResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UpdateLPRequest {
  title?: string;
  content?: string;
  thumbnail?: string;
  tags?: string[];
  published?: boolean;
}
export interface UpdateLPResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface DeleteLPResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: boolean;
}
export interface LikeLPResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    userId: number;
    lpId: number;
  };
}
