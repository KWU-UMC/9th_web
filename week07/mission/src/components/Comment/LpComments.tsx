import { useEffect, useMemo, useState } from 'react'
import { PAGINATION_ORDER } from '../../enums/common';
import SortBtn from '../SortBtn';
import { useGetInfiniteLpComments } from '../../hooks/queries/useGetInfiniteLpComments';
import { useInView } from 'react-intersection-observer';
import Comment from './Comment';
import CommentSkeletonList from './CommentSkeletonList';
import z from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostComment } from '../../hooks/mutations/usePostComment';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';

interface LpCommentsProps {
  lpIdInput: number;
}

const schema = z.object({
  comment: z
    .string()
    .min(1, {message: "댓글을 1자 이상 입력해주세요."}),
});

type InputFields = z.infer<typeof schema>;

const LpComments = ({lpIdInput}: LpCommentsProps) => {
  const [sort, setSort] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);
  const {data:comments, isFetching, hasNextPage, fetchNextPage, isPending, isError} = useGetInfiniteLpComments({
    lpId: lpIdInput, 
    limit: 10, 
    order: sort
  });
  const {ref, inView} = useInView({threshold:0,});
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors, touchedFields, isValid, isSubmitting},
  } = useForm<InputFields>({
    defaultValues: {comment: ""},
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });
  const {mutate} = usePostComment();

  useEffect(() => {
    if (inView){
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const commentInvalidUI = touchedFields.comment && !!errors.comment;
  const comment = watch("comment");
  const canSubmit = useMemo(
    () => !!comment && isValid && !isSubmitting, [comment, isValid, isSubmitting]
  );

  const onSubmit: SubmitHandler<InputFields> = (data) => {
    const body ={
      content: data.comment
    }
    mutate({lpId:lpIdInput, body}, {
      onSuccess: (_data, variables) => {
        reset({comment: ""});
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.lpComments, variables.lpId, sort],
          exact:true,
        });
      }
    });
  };

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
          {...register("comment")}
          className={`border border-gray-300 text-white placeholder-gray-400 w-5/6 p-[5px] rounded-sm`}
          type="text"
          placeholder="댓글을 입력해주세요!"
        />
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="w-1/6 text-white bg-gray-900 py-[5px] rounded-sm text-lg hover:bg-gray-600 disabled:text-gray-600 cursor-pointer"
          disabled={!canSubmit}
        >작성</button>
      </div>
      {commentInvalidUI && (
        <p className="text-red-500 text-sm">{errors.comment?.message}</p>
      )}
      {isPending && <CommentSkeletonList count={10} />}
      {comments?.pages.map((page) => page.data.data)
        .flat().map((comment) => (
          <Comment 
            key={comment.id} 
            comment={comment} 
            sort={sort}
          />
        )
      )}
      {isFetching && <CommentSkeletonList count={10} />}
      <div ref={ref}></div>
    </div>
  )
}

export default LpComments