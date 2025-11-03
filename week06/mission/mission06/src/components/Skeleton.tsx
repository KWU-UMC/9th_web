export const SkeletonGrid = ({ count = 12 }: { count?: number }) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="w-full aspect-square rounded bg-white/10 overflow-hidden">
        <div className="h-full w-full animate-pulse bg-gradient-to-r from-white/10 via-white/20 to-white/10" />
      </div>
    ))}
  </div>
);

export const SkeletonLine = ({ w = "w-1/2" }: { w?: string }) => (
  <div className={`h-4 ${w} rounded bg-white/10 animate-pulse`} />
);
