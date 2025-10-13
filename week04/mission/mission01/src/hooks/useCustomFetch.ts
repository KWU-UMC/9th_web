import axios from "axios";
import { useEffect, useState } from "react";

function useCustomFetch<T>(url : string) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading,setIsloading] =useState(true);
    const [isError,setIserror]=useState(false);
    useEffect(() => {
            const loaddate = async () => {
                setIsloading(true);

                try{
                    const { data } = await axios.get<T>(
                        url,
                        {
                            headers: {
                                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            },
                        }
                    );

                    setData(data);
                    setIsloading(false);
                    setIserror(false);
                } catch(error) {
                    console.error(error)
                    setIserror(true);
                }
            };

            loaddate();
    }, [url]);


    return { data, isLoading, isError };
}

export default useCustomFetch;