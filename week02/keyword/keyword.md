1.  🍠**여러 개의 태그를 동시에 반환하려고 할 때**는 어떻게 해야 할까요?

    ```jsx
    function App() {
      return (
        <>
          <strong>광운대학교</strong>
          <p>아인/박현지</p>
        </>
      );
    }

    export default App;
    ```

    이유: 빈 태그가 <div>와 같은 하나의 컨테이너로서 나머지 태그들을 묶어준다.

2.  🍠여러분들이, 직접 한번 구조분해 할당을 활용해서 어떻게 깔끔하게 코드를 작성할 수 있을지 고민해보세요!!
    저는 두가지 방식이 크게 떠오르는데요, 여러분들이 생각하는 방식으로 한번 해결해보세요!

        ```tsx
        const List = ({ tech }) => {
          return (
            <>
              <li>{tech}</li>
            </>
          )
        }

        export default List
        ```

        매개변수로 가져올 때 props의 {tech}만 가져오도록 가공

3.  🍠 **위의 영상을 보고 Lazy Initialization(게으른 초기화)**에 대해 설명해주세요

    처음 초기 설정에만 함수를 호출하고, 추후 해당 값이 필요할때는 인자값만 불러오도록 하는 것

    - 랜더링 시간 단축
      .tsx 파일에선 페이지 ui 코드가 맨 마지막에 오기 때문에, 무거운 함수가 오게 되면, 함수 호출에 긴 시간이 소요, 페이지 랜더링 또한 늦어지게 된다.
    - 불필요한 호출 방지
      함수가 처음 페이지를 불러올 때만 호출돼도 괜찮은 함수, 예를 들어 어떠한 양식을 정해주는 함수라면 안에 들어가는 값만 바뀔 뿐, 양식은 변하지 않아도 괜찮다. 이런 상황에서 매 새로고침마다 양식을 매번 다시 지정해주는 것은 불필요하다.
      따라서, 처음 한 번만 함수를 호출하여 인자값을 받아오고 이후 코드에선 해당 호출의 결과, 인자값만을 받아옴으로서 불필요한 함수의 재호출을 방지하게 된다.

4.  🍠 App.tsx 파일에 직접 카운터가 1씩 증가, 1씩 감소하는 기능을 만들어주세요

    ```tsx
    import { useState } from "react";

    function App() {
      const [count, setCount] = useState(0);

      const handleIncreaseNumber = () => {
        setCount((prev) => prev + 1);
      };

      const handleDecreaseNumber = () => {
        setCount((prev) => prev - 1);
      };

      return (
        <>
          <h1>{count}</h1>
          <button onClick={() => handleIncreaseNumber()}>숫자 증가</button>
          <button onClick={() => handleDecreaseNumber()}>숫자 감소</button>
        </>
      );
    }

    export default App;
    ```

5.  🍠 영상을 보고 실습을 하면서 몰랐던 개념들을 토글을 열어 정리해주세요
    - function1() : 함수 호출
    - function 또는 () ⇒ function1() 함수 인자값만 받아기
