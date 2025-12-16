import type { Comment } from "../../types/comment";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

type Props = {
  comment: Comment;
};

function formatFromNow(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const diffSec = (Date.now() - d.getTime()) / 1000;
  const diffDay = Math.floor(diffSec / 86400);

  if (diffDay <= 0) return "오늘";
  if (diffDay === 1) return "1일 전";
  return `${diffDay}일 전`;
}

export default function CommentItem({ comment }: Props) {
  const initial = comment.author.name.charAt(0).toUpperCase();

  return (
    <div className="flex items-start justify-between gap-3 py-4 border-b border-white/5 last:border-b-0">
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center text-xs font-bold">
          {initial}
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-white">{comment.author.name}</span>
          <span className="mt-0.5 text-xs text-gray-400">
            {formatFromNow(comment.createdAt)}
          </span>

          <p className="mt-2 text-sm text-gray-100 whitespace-pre-line">
            {comment.content}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="p-1 rounded-full hover:bg-white/10 transition"
      >
        <EllipsisVerticalIcon className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );
}
