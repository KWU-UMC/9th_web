import type { PaginationDto, CommentPaginationDto } from "../types/common";
import { axiosInstance } from "./axios";
import type { ResponseLikeLpDto, ResponseLpCommentListDto, ResponseLpDetailDto, ResponseLpListDto, 
  RequestCreateLpDto, ResponseCreateLpDto, LpComment, ResponsePatchLpCommentDto, ResponseDeleteLpCommentDto,
  RequestPatchLpDto, ResponseDeleteLpDto, RequestLpDto
} from "../types/lp";

export const getLpList = async (paginationDto: PaginationDto):Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
}

export const getLpDetail = async ({lpId}: RequestLpDto):Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
}

export const getLpComments = async (commentPaginationDto: CommentPaginationDto):Promise<ResponseLpCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${commentPaginationDto.lpId}/comments`,{
    params: commentPaginationDto,
  });
  return data;
}

export const postLike = async ({lpId}: RequestLpDto):Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
}

export const deleteLike = async ({lpId}: RequestLpDto):Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
}

export const postCreateLp = async (newLp: RequestCreateLpDto):Promise<ResponseCreateLpDto> => {
  const { data } = await axiosInstance.post("/v1/lps/", newLp);
  return data;
};

export const postComment = async (lpId: string | undefined, body: { content: string }):Promise<LpComment> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, body);
  return data;
};

export const patchComment = async (lpId: string | undefined, commentId:number, body: { content: string }):Promise<ResponsePatchLpCommentDto> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, body);
  return data;
};

export const deleteComment = async (lpId: string | undefined, commentId:number):Promise<ResponseDeleteLpCommentDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
  return data;
};

export const patchLp = async (lpId: string | undefined, body: RequestPatchLpDto ):Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, body);
  return data;
};

export const deleteLp = async (lpId: string | undefined ):Promise<ResponseDeleteLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
};