import type { Lp } from '../types/lp';
import { Heart, Pencil, Trash } from 'lucide-react';
import { useGetMyInfo } from '../hooks/queries/useGetMyInfo';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { usePostLike } from '../hooks/mutations/usePostLike';
import { useDelteLike } from '../hooks/mutations/useDeleteLike';
import { useDeleteLp } from '../hooks/mutations/useDeleteLp';

type LpDetailViewProps = {
  lp: Lp;
  onEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const LpDetailView = ({lp, onEdit}: LpDetailViewProps) => {
  const params = useParams();
  const {accessToken} = useAuth();
  const {data: me} = useGetMyInfo(accessToken);
  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리함
    // mutateAsync -> Promise를 반환해서 await 사용 가능
  const {mutate: likeMutate} = usePostLike();
  const {mutate: disLikeMutate} = useDelteLike();
  const {mutate: deleteLp} = useDeleteLp();

  const isMyLp = lp.authorId === me?.id;
  const isLiked = lp?.likes.map((like) => like.userId).includes(me?.id as number);
  // const isLiked = data?.likes.map((like) => like.userId === me?.id);

  const handleLikeLp = () => {
    likeMutate({lpId: Number(params.lpId)});
  }

  const handleDislikeLp = () => {
    disLikeMutate({lpId: Number(params.lpId)});
  }

  const handleDeleteLp = () => {
    deleteLp({lpId: lp.id});
  }

  return (
    <div className='flex flex-col justify-center gap-5 py-5 px-15 bg-gray-700 rounded-xl text-white'>
      <div className='flex justify-between'>
        <h1 className='text-lg'>{lp?.author?.name}</h1>
        <h1 className='text-sm'>{new Date(lp?.updatedAt).toLocaleDateString()}</h1>
      </div>
      <div className='flex justify-between'>
        <h1 className='text-xl'>{lp?.title}</h1>
        {isMyLp &&
          <div className='flex gap-5'>
            <Pencil 
              onClick={() => onEdit(true)}
            />
            <Trash 
              onClick={handleDeleteLp}
            />
          </div>
        }
      </div>
      <img src={lp?.thumbnail} alt={lp?.title} className='shadow-2xl'/>
      <p className='text-sm'>{lp?.content}</p>
      <div className='flex gap-3 justify-center'>
        {lp.tags.map((tag) => (
          <li
            key={tag.id}
            className='list-none border border-white rounded-md p-1'
          >
            <span>
              #{tag.name}
            </span>
          </li>
        ))}
      </div>
      <div className='text-center text-lg'>
        <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
          <Heart 
            color={isLiked ? "red": "white"}
            fill={isLiked ? "red": "transparent"}
          />
        </button>
        <span> {lp?.likes.length}</span>
      </div>
    </div>
  )
}

export default LpDetailView
