import { Check, EllipsisVertical, Pencil, Trash } from "lucide-react"
import type { Comments } from "../../types/lp"
import { useState } from "react"
import { useGetMyInfo } from "../../hooks/queries/useGetMyInfo"
import { usePatchComment } from "../../hooks/mutations/usePatchComment"
import { useDeleteComment } from "../../hooks/mutations/useDeleteComment"
import { queryClient } from "../../App"
import { QUERY_KEY } from "../../constants/key"
import type { PAGINATION_ORDER } from "../../enums/common"
import { useAuth } from "../../context/AuthContext"

interface ComentProps {
  comment: Comments
  sort: PAGINATION_ORDER
}
const Comment = ({comment, sort}: ComentProps) => {
  const {mutate: patchComment} = usePatchComment();
  const {mutate: deleteComment} = useDeleteComment();
  const {accessToken} = useAuth();
  const {data} = useGetMyInfo(accessToken);
  const [openMenu, setOpenMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(comment.content)
  const isMyComment = data?.id === comment.authorId;

  const handleOpenMenu = () => {
    if (!isMyComment) return;

    setOpenMenu((prev) => !prev);
  }

  const handleEditComment = () => {
    if (!isMyComment) return;

    setIsEdit((prev) => !prev);
  }

  const handlePatchComment = () => {
    const body = {
      content: editContent,
    };

    patchComment({lpId: comment.lpId, commentId: comment.id, body}, {
      onSuccess: (_data, variables) => {
        setIsEdit(false);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.lpComments, variables.lpId, sort],
          exact: true,
        })
      }
    })
  }

  const handleDeleteComment = () => {
    if (!isMyComment) return;

    deleteComment({lpId: comment.lpId, commentId: comment.id}, {
      onSuccess: (_data, variables) => {
        setOpenMenu(false);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.lpComments, variables.lpId, sort],
          exact: true,
        })
      }
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="w-[80%]">
        <h1 className="text-lg font-semibold">{comment.author?.name}</h1>
        {!isEdit && 
          <h1>{comment.content}</h1>
        }
        {isEdit &&
          <input 
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="border border-white w-full p-1 rounded-md"
          />
        }
      </div>
      {!isEdit &&
        <div className="flex flex-col items-end">
          <EllipsisVertical 
            onClick={handleOpenMenu}
          />
          {openMenu && 
            <div className="flex bg-gray-800 p-1 rounded-md">
              <Pencil 
                onClick={handleEditComment}
              />
              <Trash 
                onClick={handleDeleteComment}
              />
            </div>
          }
        </div>
      }
      {isEdit &&
        <Check
          className="hover:bg-gray-800 p-1 rounded-md"
          size={30}
          onClick={handlePatchComment}
        />
      }
    </div>
  )
}

export default Comment