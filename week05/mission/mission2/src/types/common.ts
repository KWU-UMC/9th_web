export type CommonResponse<T> = {
    accessToken: any;
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
}