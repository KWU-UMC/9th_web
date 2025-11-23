import { useState, useEffect, useRef } from "react";

export default function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const timeSinceLastRan = Date.now() - lastRan.current;

    if (timeSinceLastRan >= interval) {
      // 즉시 실행
      setThrottledValue(value);
      lastRan.current = Date.now();
    } else {
      // 남은 시간만큼 대기 후 실행
      const handler = setTimeout(() => {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }, interval - timeSinceLastRan);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, interval]);

  return throttledValue;
}
