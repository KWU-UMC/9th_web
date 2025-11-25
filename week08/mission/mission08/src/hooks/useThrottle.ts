import { useEffect, useRef, useState } from "react";

const useThrottle = <T,>(value: T, interval = 1000) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecutedRef = useRef(0);
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    const clearTimer = () => {
      if (timeoutIdRef.current) {
        window.clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };

    if (typeof value === "boolean" && value === false) {
      clearTimer();
      lastExecutedRef.current = Date.now();
      setThrottledValue(value);
      return clearTimer;
    }

    const now = Date.now();
    const remainingTime = interval - (now - lastExecutedRef.current);

    if (remainingTime <= 0) {
      lastExecutedRef.current = now;
      setThrottledValue(value);
    } else {
      clearTimer();
      timeoutIdRef.current = window.setTimeout(() => {
        lastExecutedRef.current = Date.now();
        setThrottledValue(value);
        timeoutIdRef.current = null;
      }, remainingTime);
    }

    return clearTimer;
  }, [value, interval]);

  return throttledValue;
};

export default useThrottle;
