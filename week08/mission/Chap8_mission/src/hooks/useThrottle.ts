import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef(Date.now());
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const now = Date.now();
    const remaining = delay - (now - lastExecuted.current);

    // 기존 타이머 제거
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    if (remaining <= 0) {
      // delay 지나면 즉시 실행
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      // 남은 시간만큼 타이머
      timer.current = window.setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
        timer.current = null;
      }, remaining);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;