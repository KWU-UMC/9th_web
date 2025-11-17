import { useEffect, useState } from "react";
import LpCard from "../components/LpCard/LpCard";
import { PAGINATION_ORDER } from "../enums/common";
import { useNavigate } from "react-router-dom";
import { useGetInfiniteLpList } from "../hooks/queries/useGetInfiniteLpList";
import {useInView} from 'react-intersection-observer'
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import SortBtn from "../components/SortBtn";

const HomePage = () => {
  const [sort, setSort] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc); // "asc" || "desc"
  // const {data, isPending, isError} = useGetLpList({order: sort});
  const {data:lps, isFetching, hasNextPage, fetchNextPage, isPending, isError} = useGetInfiniteLpList(30, "", sort);
  // ref -> 특정한 HTML 요소를 감시할 수 있다.
  // inView -> 그 요소가 화면에 보이면 true
  const {ref, inView} = useInView({threshold: 0,})
  const navigate = useNavigate();

  useEffect(() => {
    const postLoginRedirect = localStorage.getItem("postLoginRedirect");

    if (postLoginRedirect){
    localStorage.removeItem("postLoginRedirect");
    navigate(`${postLoginRedirect}`);
  }
  },[navigate]);

  useEffect(() => {
    if (inView){
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div className="text-white text-3xl">Error</div>
  }

  return (
    <>
      <div className="flex justify-end mr-10 mb-3">
        <SortBtn sort={sort} setSort={setSort} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages?.map((page) => page.data.data)
          .flat().map((lp) => (
            <LpCard key={lp.id} lp={lp}/>
          )
        )}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref}></div>
    </>
  )
}

export default HomePage
