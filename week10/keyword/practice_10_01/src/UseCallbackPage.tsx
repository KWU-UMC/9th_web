import { useCallback, useState } from "react";
import CountButton from "./components/CountButton";
import TextInput from "./components/TextInput";

export const UseCallbackPage = () => {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleIncreaseCount = useCallback(
    (num: number) => {
      setCount(count + num);
    },
    [count]
  );

  const handleText = useCallback((text: string) => {
    setText(text);
  }, []);

  return (
    <div>
      <h1>같이 배우는 리액트 useCallback편</h1>
      <h2>Count: {count}</h2>
      <CountButton onClick={handleIncreaseCount} />

      <h2>Text</h2>
      <h2>{text}</h2>
      <TextInput onChange={handleText} />
    </div>
  );
};