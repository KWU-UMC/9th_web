import { useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  // localStorage에서 값 가져오기
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // 값 저장 함수
  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setStoredValue] as const;
};

export default useLocalStorage;
