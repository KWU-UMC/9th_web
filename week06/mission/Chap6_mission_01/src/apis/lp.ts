import type { PaginationDto, CommentPaginationDto } from "../types/common";
import { axiosInstance } from "./axios";
import type { ResponseLpCommentListDto, ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";

export const getLpList = async (paginationDto: PaginationDto):Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
}

export const getLpDetail = async (lpId: string | undefined): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
}

export const getLpComments = async (commentPaginationDto: CommentPaginationDto):Promise<ResponseLpCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${commentPaginationDto.lpId}/comments`,{
    params: commentPaginationDto,
  });
  return data;
}