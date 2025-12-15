import type { CommentsDto, PaginationDto } from "../types/common";
import type { Comments, RequestCreateLp, RequestDeleteComment, RequestLpDto, RequestPatchComment, RequestPatchLp, ResponseComments, ResponseCreateLp, ResponseDeleteLp, ResponseLikeLpDto, ResponseLpDto, ResponseLpListDto, ResponsePatchLp } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto: PaginationDto):Promise<ResponseLpListDto> => {
  const {data} = await axiosInstance.get("/v1/lps",{
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async ({lpId}: RequestLpDto): Promise<ResponseLpDto> => {
  const {data} = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
};

export const getLpCommentsList = async (commentsDto: CommentsDto): Promise<ResponseComments> => {
  const {data} = await axiosInstance.get(`/v1/lps/${commentsDto.lpId}/comments`, {
    params: commentsDto,
  })

  return data;
};

export const postComment = async ({lpId, body}: RequestLpDto): Promise<Comments> => {
  const {data} = await axiosInstance.post(`/v1/lps/${lpId}/comments`, body);

  return data;
} 

export const patchComment = async ({lpId, commentId, body}: RequestLpDto): Promise<RequestPatchComment> => {
  const {data} = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, body);

  return data;
}

export const deleteComment = async ({lpId, commentId}: RequestLpDto): Promise<RequestDeleteComment> => {
  const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);

  return data;
}

export const postLike = async ({lpId}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const {data} = await axiosInstance.post( `/v1/lps/${lpId}/likes`);

  return data;
}

export const deleteLike = async ({lpId}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
}

export const postCreateLp = async (body: RequestCreateLp): Promise<ResponseCreateLp> => {
  const {data} = await axiosInstance.post('/v1/lps', body);

  return data;
};

export const patchLp = async ({lpId, body}:RequestPatchLp): Promise<ResponsePatchLp> => {
  const {data} = await axiosInstance.patch(`/v1/lps/${lpId}`, body);

  return data;
}

export const deleteLp = async({lpId}: RequestLpDto): Promise<ResponseDeleteLp> => {
  const {data} = await axiosInstance.delete(`/v1/lps/${lpId}`);

  return data;
}