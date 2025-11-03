import { useEffect, useState } from 'react'
import { PAGINATION_ORDER } from '../../enums/common';
import SortBtn from '../SortBtn';
import { useGetInfiniteLpComments } from '../../hooks/queries/useGetInfiniteLpComments';
import { useInView } from 'react-intersection-observer';
import Comment from './Comment';
import CommentSkeletonList from './CommentSkeletonList';

interface LpCommentsProps {
  lpIdInput: number;
}

const LpComments = ({lpIdInput}: LpCommentsProps) => {
  const [sort, setSort] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);
  const {data:comments, isFetching, hasNextPage, fetchNextPage, isPending, isError} = useGetInfiniteLpComments({
    lpId: lpIdInput, 
    limit: 10, 
    order: sort
  });
  const {ref, inView} = useInView({threshold:0,});

  useEffect(() => {
    if (inView){
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError){
    return <div className="text-white text-3xl">Error</div>
  }

  return (
    <div className='flex flex-col justify-center gap-5 py-5 px-15 bg-gray-700 rounded-xl text-white mt-5'>
      <div className='flex justify-between'>
        <h1 className='text-lg font-bold'>댓글</h1>
        <SortBtn sort={sort} setSort={setSort} />
      </div>
      <div className='flex gap-1'>
        <input
          className={`border border-gray-300 text-white placeholder-gray-400 w-5/6 p-[5px] rounded-sm`}
          type="text"
          placeholder="댓글을 입력해주세요!"
        />
        <button
          type="button"
          className="w-1/6 text-white bg-gray-900 py-[5px] rounded-sm text-lg hover:bg-gray-700 disabled:text-gray-600 cursor-pointer"
          disabled={true}
        >로그인</button>
      </div>
      <p className="text-red-500 text-sm">댓글을 1자 이상 입력해주세요</p>
      {isPending && <CommentSkeletonList count={10} />}
      {comments?.pages.map((page) => page.data.data)
        .flat().map((comment) => (
          <Comment key={comment.id} comment={comment} />
        )
      )}
      {isFetching && <CommentSkeletonList count={10} />}
      <div ref={ref}></div>
    </div>
  )
}

export default LpComments
