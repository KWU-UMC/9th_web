export const LpCardSkeleton = () => {
  return (
    <div
      className="relative transition-transform cursor-pointer animate-pulse"
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg shadow-md">
        <div className="w-full h-full bg-neutral-500" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 rounded-b-lg">
        <h3 className="text-sm font-bold truncate"></h3>
        <div className="flex justify-between items-center text-xs mt-1"></div>
      </div>
    </div>
  );
};
