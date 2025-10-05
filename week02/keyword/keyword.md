<aside>
🍠

그러면, 위와 같이 **여러 개의 태그를 동시에 반환하려고 할 때**는 어떻게 해야 할까요?

</aside>

- 답변 🍠

  ```jsx
  // 코드 아래 첨부
  function App() {
    return (
      <div>
        <strong>상명대학교</strong>
        <p>매튜/김용민</p>
      </div>
    );
  }
  export default App;
  ```

    <aside>
    🍠
    
    이유:  하나의 태그만 반환할 수있어서
    
    </aside>

- 해설

  ```jsx
  function App() {
    return (
      <>
        <strong>상명대학교</strong>
        <p>매튜/김용민</p>
      </>
    );
  }

  export default App;
  ```

  많은 분들이 `<> 빈 태그(Fragment)`의 존재를 잘 모르시는 경우가 있어요.

  여러 개의 태그를 반환해야 하지만, 특별히 **스타일링이나 레이아웃을 위해 부모 태그가 필요하지 않을 때**, 굳이 불필요한 `<div>` 같은 태그를 추가할 필요가 없어요.

  이럴 때는 `<> </>` **Fragment**를 사용하면, **추가적인 DOM 요소 없이** 여러 태그를 묶어서 반환할 수 있습니다.

  즉, 화면에는 불필요한 태그가 생기지 않고 코드도 훨씬 깔끔해져요.

- **위의 영상을 보고 Lazy Initialization(게으른 초기화)**에 대해 설명해주세요 🍠
  ```jsx
  setCount(count + 1);
  ```
- **App.tsx** 파일에 직접 카운터가 1씩 증가, 1씩 감소하는 기능을 만들어주세요 🍠

  - 직접 작성한 코드 **App.tsx** 파일을 올려주세요!

    ```jsx
    import { useState } from "react";
    import "./App.css";

    function App() {
      const [count, setCount] = useState(0);

      const increment = () => {
        setCount((prev) => prev + 1);
      };
      const decrement = () => {
        setCount((prev) => prev - 1);
      };
      return (
        <>
          <p>{count}</p>
          <div>
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
          </div>
        </>
      );
    }

    export default App;
    ```

    - 추가 미션 제출 🍠

  **useState**

  - 독립적인 단순 상태 (예: 토글, 카운터)
  - 상태 간 연관성이 없거나 적은 경우
  - 비즈니스 로직이 단순한 경우

  **useReducer**

  - 하나의 액션이 여러 상태를 동시에 변경해야 할 때
  - 상태 변경 로직이 복잡하고 조건이 많을 때
  - 상태가 서로 긍밀하게 연결되어 있을 때
