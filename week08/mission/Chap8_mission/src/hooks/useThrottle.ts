import { useEffect, useRef, useState } from "react";

// value가 true로 바뀔 때 지정한 delay 시간 동안 한 번만 true로 반영
// value가 false로 바뀌면 즉시 false로 반영
// value: boolean 상태 값 (ex: inView)
// delay: throttle 간격(ms)
// throttledValue: throttle 적용된 상태 값

function useThrottle(value: boolean, delay: number) {
  // throttledValue: 실제로 외부에 반환되는 상태
  const [throttledValue, setThrottledValue] = useState(value);

  // lastExecuted: 마지막으로 throttledValue를 true로 업데이트한 시간
  const lastExecuted = useRef(0);

  // timer: delay 시간 후에 업데이트하기 위한 setTimeout ID
  const timer = useRef<number | null>(null); // 브라우저 환경에서 setTimeout은 number 반환

  useEffect(() => {
    // value가 false이면 즉시 반영
    if (!value) {
      setThrottledValue(false);

      // 이미 등록된 타이머가 있다면 취소
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      return; // 이후 로직 실행 X
    }

    const now = Date.now(); // 현재 시간
    const remaining = delay - (now - lastExecuted.current); 
    // lastExecuted 기준으로 남은 delay 계산

    if (remaining <= 0) {
      // 마지막 실행 이후 delay 이상 지났으면 즉시 true 반영
      lastExecuted.current = now;
      setThrottledValue(true);
    } else {
      // delay가 남아 있으면 이전 타이머 취소 후 새 타이머 등록
      if (timer.current) clearTimeout(timer.current);

      timer.current = window.setTimeout(() => {
        lastExecuted.current = Date.now(); // 실행 시간 업데이트
        setThrottledValue(true);           // throttledValue 갱신
        timer.current = null;              // 타이머 리셋
      }, remaining);
    }

    // Clean-up: effect 재실행 전 타이머 정리
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [value, delay]); // value 또는 delay 변경 시 effect 실행

  return throttledValue; // throttle 적용된 상태 반환
}

export default useThrottle;