import { useEffect, useMemo, useState } from "react";
import LpCard from "../components/LpCard/LpCard";
import { PAGINATION_ORDER } from "../enums/common";
import { useNavigate } from "react-router-dom";
import { useGetInfiniteLpList } from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import SortBtn from "../components/SortBtn";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SearchBar from "../components/SearchBar";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";
import type { Lp } from "../types/lp";

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);
  const [search, setSearch] = useState("");
  const debouncedQuery = useDebounce(search, 300);
  const trimmedQuery = debouncedQuery.trim();
  const shouldFetch = trimmedQuery.length > 0 || debouncedQuery.length === 0;
  const {
    data: pages,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isPending: loading,
    isError: error,
  } = useGetInfiniteLpList(30, trimmedQuery, order, {
    enabled: shouldFetch,
  });
  const { ref, inView } = useInView({ threshold: 0 });
  const throttledInView = useThrottle(inView, 1000);
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
    if (throttledInView && !isFetching && Boolean(hasNextPage)) {
      fetchNextPage();
    }
  }, [throttledInView, isFetching, hasNextPage, fetchNextPage]);

  const flattened = useMemo<Lp[]>(() => {
    if (!pages) {
      return [];
    }

    return pages.pages.flatMap((page): Lp[] => page.data.data);
  }, [pages]);

  if (error) {
    return <div className="text-white text-3xl">Error</div>
  }

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />

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
