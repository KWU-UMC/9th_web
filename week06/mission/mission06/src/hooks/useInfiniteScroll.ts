import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  onIntersect: () => void,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) onIntersect();
    }, { root: null, rootMargin: "300px", threshold: 0, ...(options ?? {}) });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [onIntersect, options]);

  return ref;
};
