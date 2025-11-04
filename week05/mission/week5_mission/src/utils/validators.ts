export const isEmail = (s: string) =>
  /^\S+@\S+\.\S+$/.test(s) ? null : "유효하지 않은 이메일 형식입니다.";

export const minLength =
  (n: number) =>
  (s: string) =>
    s.length >= n ? null : `비밀번호는 최소 ${n}자 이상이어야 합니다.`;
