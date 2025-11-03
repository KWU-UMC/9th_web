import { useState } from "react";

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  });

  const setStoredValue = (newValue: string | null) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  };

  return { value, setStoredValue };
};

export default useLocalStorage;
