import { useEffect, useMemo, useRef, useState } from "react";

const STALE_TIME = 5 * 60 * 1000;
const MAX_RETRIES = 3;

const INITIAL_RETRY_DELLAY = 1_000;

interface CasheEntry<T>{
    data: T;
    lastFeched: number;    
}

export const useCustomFetch = <T>(url: string) =>{
    const [data,setData] = useState<T | null>(null);
    const [isPending,setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);    

    const storageKey = useMemo(()=>url,[url]);

    const abortControllerRef = useRef<AbortController | null>(null);

    const retryTimeoutRef = useRef<number|null>(null);

    useEffect(()=>{
        abortControllerRef.current = new AbortController();

        setIsError(false);
        
        const fetchData = async (currentRetry = 0) => {
            const currentTime = new Date().getTime();
            const cashedItem = localStorage.getItem(storageKey);

            if(cashedItem){
                try{
                    const casheData: CasheEntry<T> = JSON.parse(cashedItem);
                    if(currentTime - casheData.lastFeched < STALE_TIME){
                        setData(casheData.data);
                        setIsPending(false);
                        console.log("캐시된 데이터 사용", url);
                        return;
                    }
                    setData(casheData.data);
                    console.log("만료된 캐시 데이터 사용", url);
                }catch{
                    localStorage.removeItem(storageKey);
                    console.warn("캐시 에러: 캐시 삭제함", url);
                }
            }

            setIsPending(true);
            try{
                const response = await fetch(url, {
                    signal: abortControllerRef.current?.signal
                });

                if(!response.ok){
                    throw new Error('Failed to fetch data');
                }

                const newData = await response.json() as T;
                setData(data);
                
                const newCashEntry: CasheEntry<T> = {
                    data: newData,
                    lastFeched: new Date().getTime(),
                }
                
                localStorage.setItem(storageKey, JSON.stringify(newCashEntry));

            }catch(error){
                if(error instanceof Error && error.name ==='AbortError'){
                    console.log("요청취소됨", url);
                    return;
                }
                if(currentRetry < MAX_RETRIES){
                    const retryDelay = INITIAL_RETRY_DELLAY * Math.pow(2, currentRetry);
                    console.log(`재시도 ${currentRetry + 1}/${MAX_RETRIES} Retrying ${retryDelay}ms later`);
                    retryTimeoutRef.current = setTimeout(() => {
                        fetchData(currentRetry + 1);
                    }, retryDelay);
                }else{
                    setIsError(true);
                    setIsPending(true);
                    console.log('최대 재시도 횟수 초과', url);
                    return;
                }

                setIsError(true);
                console.error(error)
            }finally{
                setIsPending(false);
            }
        }
        fetchData();

        return () =>{
            abortControllerRef.current?.abort();
            if(retryTimeoutRef.current !== null){
                clearTimeout(retryTimeoutRef.current);
                retryTimeoutRef.current = null;
            }
        };
    },[url, storageKey])

    return { data, isPending, isError };
}
