import type { LpComment } from "../../types/lp";

interface LpCommentProps {
  comment: LpComment;
}
const Comment = ({ comment }: LpCommentProps) => {
  return (
    <div className="flex gap-3 mt-2 items-center">
      <img src={comment.author?.avatar} className="rounded-full size-10" />
      <div className="flex-col">
        <h1 className="font-semibold">{comment.author?.name}</h1>
        <h1 className="">{comment.content}</h1>
      </div>
    </div>
  );
};

export default Comment;
