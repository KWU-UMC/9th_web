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