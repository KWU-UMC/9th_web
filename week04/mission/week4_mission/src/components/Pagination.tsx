type Props = {
  page: number;
  totalPages?: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function Pagination({ page, totalPages, onPrev, onNext }: Props) {
  const disablePrev = page <= 1;
  const disableNext = totalPages ? page >= totalPages : false;

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button
        onClick={onPrev}
        disabled={disablePrev}
        className={`rounded-lg px-3 py-2 text-sm ring-1 ring-gray-300 transition 
          ${disablePrev ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-50'}`}
      >
        이전
      </button>
      <span className="text-sm text-gray-600">페이지 {page}{totalPages ? ` / ${totalPages}` : ''}</span>
      <button
        onClick={onNext}
        disabled={disableNext}
        className={`rounded-lg px-3 py-2 text-sm ring-1 ring-gray-300 transition 
          ${disableNext ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-50'}`}
      >
        다음
      </button>
    </div>
  );
}
