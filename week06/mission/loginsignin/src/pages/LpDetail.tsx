import { useParams } from 'react-router-dom'
import { useGetLpDetail } from '../hooks/queries/useGetLpDetail';
import LpComments from '../components/Comment/LpComments';

const LpDetail = () => {
  const params = useParams();
  const {data, isPending, isError} = useGetLpDetail(params.lpId);

  if (isPending) {
    return <div className="text-white text-3xl">Loading...</div>
  }

  if (isError) {
    return <div className="text-white text-3xl">Error</div>
  }

  return (
    <>
      <div className='flex flex-col justify-center gap-5 py-5 px-15 bg-gray-700 rounded-xl text-white'>
        <div className='flex justify-between'>
          <h1 className='text-lg'>{data?.author?.name}</h1>
          <h1 className='text-sm'>{new Date(data?.updatedAt).toLocaleDateString()}</h1>
        </div>
        <div className='flex justify-between'>
          <h1 className='text-xl'>{data?.title}</h1>
          <div className='flex gap-5'>
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>
        <img src={data?.thumbnail} alt={data?.title} className='shadow-2xl'/>
        <p className='text-sm'>{data?.content}</p>
        <div className='text-center text-lg'>
          <button>❤️</button>
          <span> {data?.likes.length}</span>
        </div>
      </div>
      <LpComments lpIdInput={parseInt(params.lpId)}/>
    </>
  )
}

export default LpDetail
