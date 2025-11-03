import type { Comment } from "../types/comment";

const CommentItem = ({ c }: { c: Comment }) => (
  <div className="flex gap-3 py-3 border-b border-white/10">
    <div className="w-9 h-9 rounded-full overflow-hidden bg-white/10 shrink-0">
      {c.author.avatar ? (
        <img src={c.author.avatar} alt={c.author.name} className="w-full h-full object-cover" loading="lazy" />
      ) : null}
    </div>
    <div className="flex-1 text-sm">
      <div className="flex items-center gap-2 text-white">
        <span className="font-semibold">{c.author.name}</span>
        <span className="text-white/50">{new Date(c.createdAt).toLocaleString()}</span>
      </div>
      <p className="text-white/90 mt-1">{c.content}</p>
    </div>
  </div>
);

export default CommentItem;
