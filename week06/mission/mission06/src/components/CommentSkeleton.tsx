export const CommentSkeleton = () => (
  <div className="flex gap-3 py-3 border-b border-white/10">
    <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
    <div className="flex-1">
      <div className="h-3 w-1/4 bg-white/10 rounded animate-pulse" />
      <div className="h-3 w-2/3 bg-white/10 rounded mt-2 animate-pulse" />
    </div>
  </div>
);
