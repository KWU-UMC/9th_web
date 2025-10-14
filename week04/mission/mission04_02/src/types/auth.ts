export type RegisterPayload = {
  email: string;
  password: string;
  nickname: string;
};

export type RegisterResponse = {
  id: number;
  email: string;
  nickname: string;
  access_token?: string;
  refresh_token?: string;
};
