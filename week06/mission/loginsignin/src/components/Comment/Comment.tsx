import type { Comments } from "../../types/lp"

interface ComentProps {
  comment: Comments
}
const Comment = ({comment}: ComentProps) => {
  return (
    <div>
      <h1 className="text-lg font-semibold">{comment.author?.name}</h1>
      <h1>{comment.content}</h1>
    </div>
  )
}

export default Comment
