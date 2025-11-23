import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustominternalAxiosRequestConfig extends InternalAxiosRequestConfig{
    _retry?:boolean; //요청 재시도 여부를 나타내는 플래그

}

//전역변수로 refresh요청에 Promise를 지참해서 중복요청을 방지한다
let refreshPromise:Promise<string>|null = null;


export const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_SERVER_API_URL
})

axiosInstance.interceptors.request.use((config) => {
    const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    if(accessToken){
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, (error) => Promise.reject(error),)

// 401에러 발생시 리프레시 토큰을 이용한 토큰 갱신처리
axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequset: CustominternalAxiosRequestConfig = error.config;

        if(error.response && error.response.status === 401 && !originalRequset._retry){
            if(originalRequset.url === 'v1/auth/refresh'){
                const {removeItem:removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                const {removeItem:removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                removeAccessToken();
                removeRefreshToken();
                window.location.href ="/login";
                return Promise.reject(error);
            }
            
            originalRequset._retry = true;

            if(!refreshPromise){
                refreshPromise = (async() =>{
                    const {getItem:getRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    const refreshToken = getRefreshToken();

                    const {data} = await axiosInstance.post('v1/auth/refresh',{
                        refresh:refreshToken,
                    });
                    const {setItem:setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    const {setItem:setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    setAccessToken(data.data.accessToken);
                    setRefreshToken(data.data.refreshToken);
                    
                    return data.data.accessToken;
                })().catch((error)=>{
                    const {removeItem:rempveAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    const {removeItem:rempveRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    rempveAccessToken();
                    rempveRefreshToken();
                }).finally(()=>{
                    refreshPromise = null;
                })
            }
            
            return refreshPromise.then((newAccessToken)=>{
                originalRequset.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosInstance.request(originalRequset);
            })
        }
        return Promise.reject(error);
    }
)