import type { CommentsDto, PaginationDto } from "../types/common";
import type { ResponseComments, ResponseLpDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto: PaginationDto):Promise<ResponseLpListDto> => {
  const {data} = await axiosInstance.get("/v1/lps",{
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (lpId: string | undefined): Promise<ResponseLpDto> => {
  const {data} = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
};

export const getLpCommentsList = async (commentsDto: CommentsDto): Promise<ResponseComments> => {
  const {data} = await axiosInstance.get(`/v1/lps/${commentsDto.lpId}/comments`, {
    params: commentsDto,
  })

  return data;
};