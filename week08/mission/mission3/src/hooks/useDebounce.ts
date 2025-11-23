import { useState, useEffect } from "react";

export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay 후에 값 업데이트
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      console.log("값 업데이트:", value);
    }, delay);

    // cleanup: 다음 effect 실행 전 타이머 취소
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
