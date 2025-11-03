import { axiosInstance } from "./axios";

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

export const getLps = async (params: {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: "asc" | "desc";
}): Promise<LpsResponse> => {
  const { data } = await axiosInstance.get("/lps", { params });
  return data.data;
};

export const getLpDetail = async (lpId: string): Promise<Lp> => {
  const { data } = await axiosInstance.get(`/lps/${lpId}`);
  return data.data;
};
