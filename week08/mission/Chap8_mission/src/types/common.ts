import type { PAGINATION_ORDER } from "../enums/common";

export type CommonResponse<T> ={
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBasedResponse<T> = CommonResponse<{
    data: T;
    nextCursor: number | null;
    hasNext: boolean;
  }>;

export type PaginationDto = {
  // 페이지 시작 커서 값 (정수). 값이 없으면 기본적으로 처음부터 조회합니다.
  cursor?: number;
  // 한 페이지에 보여줄 항목 수 (기본값: 10)
  limit?: number;
  // 검색할 문자열
  search?: string;
  // 정렬 순서: "asc"는 오래된 순, "desc"는 최신순
  order?: PAGINATION_ORDER;
};

export type CommentPaginationDto = {
  lpId: number;
  // 페이지 시작 커서 값 (정수). 값이 없으면 기본적으로 처음부터 조회합니다.
  cursor?: number;
  // 한 페이지에 보여줄 항목 수 (기본값: 10)
  limit?: number;
  // 정렬 순서: "asc"는 오래된 순, "desc"는 최신순
  order?: PAGINATION_ORDER;
};