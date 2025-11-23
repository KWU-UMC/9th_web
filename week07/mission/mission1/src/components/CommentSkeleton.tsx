// components/CommentSkeleton.tsx
export default function CommentSkeleton() {
  return (
    <div className="border-b border-gray-700 py-4 animate-pulse">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-4 bg-gray-700 rounded w-24" />
        <div className="h-3 bg-gray-700 rounded w-32" />
      </div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2" />
      <div className="h-4 bg-gray-700 rounded w-3/4" />
    </div>
  );
}
