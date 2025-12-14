import { useCallback, useState } from "react";
import CountButton from "../components/CountButton";
import TextInput from "../components/TextInput";
import JustRender from "../components/JustRender";
export default function UseCallbackPage() {
  console.log("UseCallbackPage render");
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  /*  const handleIncreaseCount = useCallback((number: number): void => {
    setCount((prev) => prev + number);
  }, []); */
  const handleIncreaseCount = useCallback(
    (number: number): void => {
      setCount(count + number);
    },
    [count]
  );
  const handleText = useCallback((text: string): void => {
    setText(text);
  }, []);

  return (
    <div>
      <JustRender />
      <h1>2번 예제 배운 후에 UseCallback</h1>

      <h2>Count : {count}</h2>
      <CountButton onClick={handleIncreaseCount} />

      <h2>Text</h2>
      <span>{text}</span>
      <TextInput onChange={handleText} />
    </div>
  );
}
