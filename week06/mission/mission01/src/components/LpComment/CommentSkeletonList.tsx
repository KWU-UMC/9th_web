import CommentSkeleton from "./CommentSkeleton";

type Props = {
  count?: number;
};

export default function CommentSkeletonList({ count = 8 }: Props) {
  return (
    <div className="mt-2">
      {Array.from({ length: count }).map((_, idx) => (
        <CommentSkeleton key={idx} />
      ))}
    </div>
  );
}
