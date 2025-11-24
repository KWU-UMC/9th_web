import { CommentSkeleton } from './CommentSkeleton';

interface CommentSkeletonListProps {
  count: number;
}

export const CommentSkeletonList = ({ count }: CommentSkeletonListProps) => {
  return (
    <div>{new Array(count).fill(0).map((idx) => (
        <CommentSkeleton key={idx} />
      ))}</div>
  )
}