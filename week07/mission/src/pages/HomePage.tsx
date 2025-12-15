import { useEffect, useMemo, useState } from "react";
import LpCard from "../components/LpCard/LpCard";
import { PAGINATION_ORDER } from "../enums/common";
import { useNavigate } from "react-router-dom";
import { useGetInfiniteLpList } from "../hooks/queries/useGetInfiniteLpList";
import {useInView} from 'react-intersection-observer'
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import SortBtn from "../components/SortBtn";
import { useLocalStorage } from "../hooks/useLocalStorage";

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);
  const { data: pages, isFetching, hasNextPage, fetchNextPage, isPending: loading, isError: error } = useGetInfiniteLpList(30, "", order);
  const {ref, inView} = useInView({threshold: 0,})
  const navigate = useNavigate();
  const { getItem, removeItem } = useLocalStorage("postLoginRedirect");

  useEffect(() => {
    const postLoginRedirect = getItem();
    if (postLoginRedirect) {
      removeItem();
      navigate(String(postLoginRedirect));
    }
  }, [getItem, removeItem, navigate]);

  useEffect(() => {
    if (inView && !isFetching && Boolean(hasNextPage)) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const flattened = useMemo(() => (
    pages?.pages?.map((p) => p.data.data).flat() ?? []
  ), [pages]);

  if (error) {
    return <div className="text-white text-3xl">Error</div>
  }

  return (
    <>
      <div className="flex justify-end mr-10 mb-3">
        <SortBtn sort={order} setSort={setOrder} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
        {loading && <LpCardSkeletonList count={20} />}
        {flattened.map((lp) => (
            <LpCard key={lp.id} lp={lp}/>
        ))}
        {isFetching && <LpCardSkeletonList count={12} />}
      </div>
      <div ref={ref} aria-hidden="true"></div>
    </>
  )
}

export default HomePage