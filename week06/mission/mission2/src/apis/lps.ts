import type { CommentsResponse, Lp, LpsResponse } from "../types/lps";
import { axiosInstance } from "./axios";

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

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
}

export const getLpComments = async (
  lpId: string,
  params: {
    cursor?: number;
    limit?: number;
    order?: "asc" | "desc";
  }
): Promise<CommentsResponse> => {
  const { data } = await axiosInstance.get(`/lps/${lpId}/comments`, {
    params,
  });
  return data.data;
};
