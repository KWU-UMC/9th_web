import { useRef, useCallback } from "react";

interface UseThrottleLikeParams {
  optimisticLiked: boolean;
  accessToken?: string;
  likeMutate: { mutate: (arg?: any, options?: any) => void };
  disLikeMutate: { mutate: (arg?: any, options?: any) => void };
  setOptimisticLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setOptimisticLikeCount: React.Dispatch<React.SetStateAction<number>>;
  delay?: number;
}

const useThrottleLike = ({
  optimisticLiked,
  accessToken,
  likeMutate,
  disLikeMutate,
  setOptimisticLiked,
  setOptimisticLikeCount,
  delay = 2000,
}: UseThrottleLikeParams) => {
  const lastClickRef = useRef<number>(0);

  const toggleLike = useCallback(() => {
    if (!accessToken) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const now = Date.now();
    if (now - lastClickRef.current < delay) {
      return; // throttle 적용
    }
    lastClickRef.current = now;

    // 좋아요 상태 즉시 반영
    setOptimisticLiked(prev => !prev);
    setOptimisticLikeCount(prevCount => prevCount + (optimisticLiked ? -1 : 1));

    // 서버 요청
    if (!optimisticLiked) {
      likeMutate.mutate(undefined, {
        onError: () => {
          setOptimisticLiked(false);
          setOptimisticLikeCount(prevCount => prevCount - 1);
        },
      });
    } else {
      disLikeMutate.mutate(undefined, {
        onError: () => {
          setOptimisticLiked(true);
          setOptimisticLikeCount(prevCount => prevCount + 1);
        },
      });
    }
  }, [
    accessToken,
    delay,
    likeMutate,
    disLikeMutate,
    optimisticLiked,
    setOptimisticLiked,
    setOptimisticLikeCount,
  ]);

  return toggleLike;
};

export default useThrottleLike;
