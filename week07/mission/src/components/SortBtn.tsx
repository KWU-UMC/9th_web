import { PAGINATION_ORDER } from '../enums/common'

interface SortBtnProps{
  sort: PAGINATION_ORDER;
  setSort: React.Dispatch<React.SetStateAction<PAGINATION_ORDER>>;
}

const SortBtn = ({sort, setSort}: SortBtnProps) => {
  return (
    <div className="flex border border-white rounded-md overflow-hidden">
      <button
        onClick={() => setSort(PAGINATION_ORDER.asc)}
        className={`px-4 py-1.5 text-sm font-medium
        ${sort === PAGINATION_ORDER.asc
          ? "bg-white text-black"
          : "text-white hover:bg-white/10"}
        `}
      >
        오래된순
      </button>
    
      <button
        onClick={() => setSort(PAGINATION_ORDER.desc)}
        className={`px-4 py-1.5 text-sm font-medium
        ${sort === PAGINATION_ORDER.desc
          ? "bg-white text-black"
          : "text-white hover:bg-white/10"}
        `}
      >
        최신순
      </button>
    </div>
  )
}

export default SortBtn