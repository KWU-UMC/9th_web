import { z } from 'zod';

// --- 로그인 스키마 ---
export const loginSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  password: z.string().min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// --- 회원가입 스키마 ---
export const signupSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  password: z.string().min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
  passwordConfirm: z.string().min(6, { message: "비밀번호 확인을 입력해주세요." }),
  name: z.string().min(1, { message: "닉네임을 입력해주세요." }),
}).refine(data => data.password === data.passwordConfirm, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordConfirm"],
});

export type SignupFormValues = z.infer<typeof signupSchema>;