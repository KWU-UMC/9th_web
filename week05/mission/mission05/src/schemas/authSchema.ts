import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해주세요."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다.").max(16, "비밀번호는 16자 이하여야 합니다.")
});

export const step1Schema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해주세요.")
});

export const step2Schema = z.object({
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다.").max(16, "비밀번호는 16자 이하여야 합니다."),
  passwordCheck: z.string()
}).refine((d) => d.password === d.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"]
});

export const step3Schema = z.object({
  nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다.").max(10, "닉네임은 10자 이하여야 합니다.")
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
