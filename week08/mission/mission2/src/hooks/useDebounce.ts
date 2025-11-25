import { useState, useEffect } from 'react';

// value: 지연시킬 값 (예: 검색어)
// delay: 지연 시간 (ms 단위, 기본값 300ms)
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay 시간 후에 state를 업데이트하는 타이머 설정
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 값이 변경되거나 컴포넌트가 언마운트될 때 타이머를 정리(clean-up)
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // value나 delay가 바뀌면 효과 재실행

  return debouncedValue;
}