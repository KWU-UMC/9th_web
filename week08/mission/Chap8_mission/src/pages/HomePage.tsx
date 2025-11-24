import { useGetInfiniteLpList } from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import SortTabs from "../components/SortTabs";
import AddBtn from "../components/AddBtn";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import SearchBar from "../components/SearchBar";
import useDebounce from "../hooks/queries/useDebounce";
import useThrottle from "../hooks/useThrottle";

const HomePage = () => {
  const [sort, setSort] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);

  // (useDebounced) 검색창에 입력한게 빈문자열인지 검사
  const isSearchEmpty = debouncedValue.trim().length === 0;

  const { data, isFetching, hasNextPage, fetchNextPage, isPending, isError } =
    useGetInfiniteLpList(20, isSearchEmpty ? "" : debouncedValue, sort, {
      enabled: !isSearchEmpty || debouncedValue === "",
    });
  console.log("data:", data);

  const { ref, inView } = useInView({ threshold: 0 });
  const throttledInView = useThrottle(inView, 3000);

  // throttledInView 감시
  useEffect(() => {
    if (throttledInView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [throttledInView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <div className="bg-black p-5">
      <SearchBar search={search} setSearch={setSearch}></SearchBar>
      {/* 버튼 */}
      <SortTabs setSort={setSort} />
      <AddBtn />
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 p-4">
        {isPending && <LpCardSkeletonList count={20} />}
        {data?.pages
          ?.map((page) => page.data.data)
          .flat()
          .map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-10"></div>
    </div>
  );
};

export default HomePage;
