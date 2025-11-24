export const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 mt-2 items-center animate-pulse">
      <div className="rounded-full size-10 bg-neutral-600" />
      <div className="flex-col">
        <div className="bg-neutral-600 w-30 h-5 rounded-sm"></div>
        <div className="bg-neutral-600 w-3xl h-5 rounded-sm mt-1"></div>
      </div>
    </div>
  )
}