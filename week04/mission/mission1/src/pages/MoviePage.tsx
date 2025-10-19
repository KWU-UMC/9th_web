import { useState } from "react"
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/UseCustomFetch";

export default function MoviePage() {
    const [page, setPage] = useState(1);
    const { category } = useParams<{
        category:string;
    }>();

    const {movies, isPending, isError} = useCustomFetch(category, page)
       
    if(isError){
        return <div>에러가 발생했습니다.</div>
    }

    else{
    return(
        <>
        <div className="flex items-center justify-center gap-6 mt-5">
            <button className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg cursor-pointer disabled:cursor-not-allowed'
            disabled={page===1} onClick={()=>setPage((prev) => prev - 1)}>{'<'}</button>
            <span>{page} 페이지</span>
            <button className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg cursor-pointer'
            onClick={()=>setPage((prev) => prev + 1)}>{'>'}</button>
        </div>
        {isPending &&(
            <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner/>
            </div>
        )}
        {!isPending &&(
            <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4
            lg:grid-cols-5 xl:grid-cols-6'>
            {movies.map((movie) : Element => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
        )}
        
    </>
);}
}