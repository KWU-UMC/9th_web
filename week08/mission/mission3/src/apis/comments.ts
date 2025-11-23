import type { CommentsResponse, PostCommentsResponse } from "../types/comments";
import { axiosInstance } from "./axios";

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

export const postComment = async (
  lpId: string,
  value: { content: string }
): Promise<PostCommentsResponse> => {
  const { data } = await axiosInstance.post(`/lps/${lpId}/comments`, value);
  return data.data;
};
export const updateComment = async (
  lpId: string,
  commentId: number,
  value: { content: string }
) => {
  const { data } = await axiosInstance.patch(
    `/lps/${lpId}/comments/${commentId}`,
    value
  );
  return data.data;
};

export const deleteComment = async (lpId: string, commentId: number) => {
  const { data } = await axiosInstance.delete(
    `/lps/${lpId}/comments/${commentId}`
  );
  return data.data;
};
