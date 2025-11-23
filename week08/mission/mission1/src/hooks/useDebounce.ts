import { useEffect, useState } from "react";

function useDebounce<T>(value:T, delay: number, { enabled = true } = {}){
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        if (!enabled) {
            setDebouncedValue(value);
            return;
        }

        const handler = setTimeout(() => setDebouncedValue(value), delay)
        
        return () => clearTimeout(handler);
    },[value, delay]);

    return debouncedValue;
}

export default useDebounce;
