import { axiosInstance } from "./axios";
import type {
  ResponseCommentListDto,
} from "../types/comment";
import type { PAGINATION_ORDER } from "../../enums/common";

type FetchCommentsParams = {
  lpId: number;
  cursor: number;
  order: PAGINATION_ORDER;
  limit?: number;
};

export const fetchLpComments = async ({
  lpId,
  cursor,
  order,
  limit = 10,
}: FetchCommentsParams): Promise<ResponseCommentListDto["data"]> => {
  const { data } = await axiosInstance.get<ResponseCommentListDto>(
    `/v1/lps/${lpId}/comments`,
    {
      params: { cursor, limit, order },
    },
  );

  return data.data;
};

type PostCommentParams = {
  lpId: number;
  content: string;
};

export const postLpComment = async ({ lpId, content }: PostCommentParams) => {
  const { data } = await axiosInstance.post(
    `/v1/lps/${lpId}/comments`,
    { content },
  );
  return data;
};
