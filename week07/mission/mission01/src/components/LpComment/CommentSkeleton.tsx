export default function CommentSkeleton() {
  return (
    <div className="flex gap-3 py-3 animate-pulse">
      <div className="w-9 h-9 rounded-full bg-gray-700" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-32 rounded-full bg-gray-700" />
        <div className="h-3 w-20 rounded-full bg-gray-700" />
        <div className="mt-2 h-3 w-full rounded-full bg-gray-700" />
      </div>
    </div>
  );
}
