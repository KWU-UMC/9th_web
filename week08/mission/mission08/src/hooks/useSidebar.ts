import { useCallback, useEffect, useRef, useState } from "react";

const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const previousOverflow = useRef<string>();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow.current ?? "";
    };
  }, [isOpen]);

  return { isOpen, open, close, toggle };
};

export default useSidebar;
