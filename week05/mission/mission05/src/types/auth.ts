export interface LoginRequest { email: string; password: string; }
export interface LoginResponse {
  status: boolean; statusCode: number; message: string;
  data: { id: number; name: string; accessToken: string; refreshToken: string; };
}
export interface SignupRequest {
  name: string; email: string; bio: string | null; avatar: string | null; password: string;
}
export interface SignupResponse {
  status: boolean; statusCode: number; message: string;
  data: { id: number; name: string; email: string; bio: string | null; avatar: string | null; createdAt: Date; updatedAt: Date; };
}
export interface SignoutResponse {
  status: boolean; statusCode: number; message: string; data: null;
}
