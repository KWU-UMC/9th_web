import type {
  DeleteLPResponse,
  LikeLPResponse,
  Lp,
  LPRequest,
  LpsResponse,
  PostLPsResponse,
  UpdateLPRequest,
  UpdateLPResponse,
} from "../types/lps";
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

/* --- get 제외 --- */

export const postLps = async (value: LPRequest): Promise<PostLPsResponse> => {
  const { data } = await axiosInstance.post("/lps", value);
  return data.data;
};

export const updateLps = async (
  lpId: string,
  value: UpdateLPRequest
): Promise<UpdateLPResponse> => {
  const { data } = await axiosInstance.patch(`/lps/${lpId}`, value);
  return data.data;
};

export const deleteLp = async (lpId: string): Promise<DeleteLPResponse> => {
  const { data } = await axiosInstance.patch(`/lps/${lpId}`);
  return data.data;
};

export const postLikes = async (lpId: string): Promise<LikeLPResponse> => {
  const { data } = await axiosInstance.post(`/lps/${lpId}/likes`);
  return data.data;
};

export const deleteLikes = async (lpId: string): Promise<LikeLPResponse> => {
  const { data } = await axiosInstance.delete(`/lps/${lpId}/likes`);
  return data.data;
};
