// src/hooks/useThrottle.ts
import { useState, useEffect, useRef } from 'react';

export function useThrottle<T>(value: T, interval: number = 1000): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    // 마지막으로 실행된 시간과 현재 시간의 차이 계산
    const now = Date.now();
    const timeElapsed = now - lastRan.current;

    // 이미 interval 시간이 지났다면 바로 업데이트
    if (timeElapsed >= interval) {
      setThrottledValue(value);
      lastRan.current = now;
    } else {
      // 아직 시간이 안 지났다면, 남은 시간만큼 기다렸다가 업데이트
      const timer = setTimeout(() => {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }, interval - timeElapsed);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, interval]);

  return throttledValue;
}