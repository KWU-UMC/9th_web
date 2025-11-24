import { useState, useCallback } from "react";

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 함수들을 useCallback으로 감싸서 참조를 고정
  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, setIsOpen, toggle, open, close };
};