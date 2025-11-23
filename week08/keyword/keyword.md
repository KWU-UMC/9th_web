- **`Debounce`** 구글링 후 개념 정리 및 코드 작성해보기 🍠
  ### 📚 참고자료
  [Debounce vs Throttle: Definitive Visual Guide](https://kettanaito.com/blog/debounce-vs-throttle)
  ***
  - **`Debounce`** 개념 정리 🍠
    : n초에 한번만 실행
  - **`Debounce`** 코드 작성 🍠
    ```tsx
    function useDebounce<T>(value: T, delay: number): T {
      const [debouncedValue, setDebouncedValue] = useState<T>(value);

      useEffect(() => {
        // delay 후에 값 업데이트
        const timer = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        // cleanup: 다음 effect 실행 전 타이머 취소
        return () => {
          clearTimeout(timer);
        };
      }, [value, delay]);

      return debouncedValue;
    }
    ```
- **`Throttling`** 구글링 후 개념 정리 및 코드 작성해보기 🍠
  ### 📚 참고자료
  [Debounce vs Throttle: Definitive Visual Guide](https://kettanaito.com/blog/debounce-vs-throttle)
  ***
  - **`Throttling`** 개념 정리 🍠
    : 마지막 호출 후 n초 이후에 실행
  - **`Throttling`** 코드 작성 🍠
    ```tsx
    function useThrottle<T>(value: T, limit: number): T {
      const [throttledValue, setThrottledValue] = useState<T>(value);
      const lastRan = useRef(Date.now());

      useEffect(() => {
        const handler = setTimeout(() => {
          if (Date.now() - lastRan.current >= limit) {
            setThrottledValue(value);
            lastRan.current = Date.now();
          }
        }, limit - (Date.now() - lastRan.current));

        return () => {
          clearTimeout(handler);
        };
      }, [value, limit]);

      return throttledValue;
    }
    ```
