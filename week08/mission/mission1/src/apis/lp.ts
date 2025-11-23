import type { PagenationDto } from '../types/common';
import type { ResponseLpListDto } from '../types/lp';
import { axiosInstance } from './axios';

export const getLpList = async (pagenationDto: PagenationDto): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get('/v1/lps', {
    params: pagenationDto,
  });
  return data;
};

export const getLpDetail = async (id: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  return data.data;
};

export const getLpComments = async (lpId: number, params: PagenationDto) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, { params });
  return data.data;
};

export const postLpComment = async (lpId: number, body: { content: string }) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, body);
  return data.data;
};

export const postLike = async (lpId: number) => {
  const res = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return res.data;
};

export const deleteLike = async (lpId: number) => {
  const res = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return res.data;
};

export const postLp = async (
  body: {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
  },
  accessToken: string
) => {
  const res = await fetch("http://localhost:8000/v1/lps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "LP 생성 실패");
  }

  return res.json();
};

export const updateLpComment = async (
  lpId: number,
  commentId: number,
  body: { content: string }
) => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, body);
  return data;
};

export const deleteLpComment = async (lpId: number, commentId: number) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
  return data;
};

export const patchLp = async (
    lpId: number,
    data: any,
    token: string
  ) => {
  const res = await axiosInstance.patch(`/v1/lps/${lpId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};