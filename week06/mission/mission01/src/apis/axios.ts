import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise:Promise<string>|null=null;


//요청 인터셉터:모든 요청 전에 토큰을 헤더에 추가함
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const accessToken = getItem();

  if(accessToken){
    config.headers=config.headers||{};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
},
  (error)=>Promise.reject(error)
);

//응답 인터셉터:401 에러 발생->refresh 토큰을 통한 토큰 갱신
axiosInstance.interceptors.response.use(
  (response)=>response,//정상 경우: 정상응답 그대로
  async(error)=>{ //에러 경우
    const originalRequest:CustomInternalAxiosRequestConfig=error.config;
    //1. 401에러면서, 아직 재시도 하지 않은 요청일 때 retry 해줘야함
    if(error.response&&error.response.status===401&&!originalRequest._retry){
      //refresh endpoint에서 401에러가 발생한 경우 중복 재시도 방지를 위해 로그아웃 처리
      if(originalRequest.url==='/v1/auth/refresh'){
        const {removeItem:removeAccessItem}=useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const {removeItem:removeRefreshItem}=useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
        removeAccessItem();
        removeRefreshItem();
        window.location.href="/login";
        return Promise.reject(error);
      }

      originalRequest._retry=true;

      //이미 리프레시 요청이 진행중이면 promise 재사용
      if(!refreshPromise){
        //refresh 요청 실행 후, promise 전역변수에 할당.
        refreshPromise=(async()=>{
          const {getItem:getRefreshToken} =useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          const refreshToken=getRefreshToken();

          const {data}=await axiosInstance.post('/v1/auth/refresh',{
            refresh: refreshToken,
          });

          //새토큰 반환
          const {setItem:setAccessToken}=useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          const{setItem:setRefreshToken}=useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

        //새 accesstoken 반환해 쓰게 함
          return data.data.accessToken;
        })()
          .catch((error)=>{
            const{removeItem:removeAccessItem}=useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            const{removeItem:removeRefreshItem}=useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            removeAccessItem();
            removeRefreshItem();
            console.log(error);
          })
            .finally(()=>{
              refreshPromise=null;
          });
      }

      return refreshPromise.then((newAccesToken:string)=>{
        originalRequest.headers['Authorization']=`Bearer ${newAccesToken}`;
        return axiosInstance.request(originalRequest);
      });
    }
  },
);