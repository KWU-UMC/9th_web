export default function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <p className="text-xl text-red-600 mb-4">오류가 발생했습니다</p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
      >
        재시도
      </button>
    </div>
  );
}
