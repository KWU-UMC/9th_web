import type { PaginationDto } from "../types/common";
import type { ResponseCommentsDto } from "../types/comment";
import { axiosInstance } from "./axios";

export const getLpComments = async (
  lpId: string,
  params: PaginationDto
): Promise<ResponseCommentsDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, { params });
  return data;
};
