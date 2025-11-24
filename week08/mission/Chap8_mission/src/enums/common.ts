// enum으로 하니 오류가 발생하여 const로 변경

export const PAGINATION_ORDER = {
  asc: "asc",
  desc: "desc",
} as const;

export type PAGINATION_ORDER = (typeof PAGINATION_ORDER)[keyof typeof PAGINATION_ORDER];