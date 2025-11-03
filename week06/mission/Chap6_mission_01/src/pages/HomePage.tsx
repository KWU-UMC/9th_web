import { useGetInfiniteLpList } from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useEffect, useState } from "react";
import SortTabs from "../components/SortTabs";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [sort, setSort] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const { data, isFetching, hasNextPage, fetchNextPage, isPending, isError } =
    useGetInfiniteLpList(20, "", sort);
  console.log("data:", data);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <div className="bg-black p-5">
      {/* 버튼 */}
      <SortTabs setSort={setSort} />

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
