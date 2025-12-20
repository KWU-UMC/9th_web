import { useCallback, useState } from "react";
import CountBtn from "./components/CountBtn";
import TextBtn from "./components/TextBtn";

export const UseCallbackPage = () => {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  // 카운트 증가 함수(객체)
  // 리렌더링 방지를 위해 useCallback 사용
  const handleIncreaseCount = useCallback(
    (num: number) => {
      setCount(count + num);
      // 빈 배열은 이 함수가 최초 생성된 이후로 절대 바뀌지 않음을 의미
      // 따라서 이 함수 내부에서 참조하는 상태나 props도 최초 생성 시점의 값으로 고정됨
      // 그래서 클로저 문제가 발생할 수 있음
      // 예를 들어, count가 0일 때 이 함수가 생성되면,
      // 이후에 count가 증가해도 이 함수 내부의 count는 여전히 0임
      // 두번째 클릭을 해도 0 + 10이 되어서 count 값이 변하지 않음
    },
    [count]
  );

  // 텍스트 변경 함수(객체)
  const handleText = useCallback((text: string) => {
    setText(text);
  }, []);

  return (
    <div>
      <h1>같이 배우는 리액트 useCallback편</h1>
      <h2>Count: {count}</h2>
      <CountBtn onClick={handleIncreaseCount} />

      <h2>Text</h2>
      <h2>{text}</h2>
      <TextBtn onChange={handleText} />
    </div>
  );
};
