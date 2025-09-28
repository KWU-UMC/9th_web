- 그러면, 위와 같이 여러 개의 태그를 동시에 반환하려고 할 때는 어떻게 해야 할까요?

- 답변 🍠
    
    ```jsx
    // 코드 아래 첨부
    function App() {
      return (
        <div>
          <h1>UMC</h1>
          <h1>HI</h1>
        </div>
      )
    }
    
    export default App
    ```
    
    ```jsx
    // 코드 아래 첨부
    function App() {
      return (
        <>
          <h1>UMC</h1>
          <h1>HI</h1>
        </>
      )
    }
    
    export default App
    ```
    
    ```jsx
    // 코드 아래 첨부
    function App() {
      return (
        <Fragment>
          <h1>UMC</h1>
          <h1>HI</h1>
        </Fragment>
      )
    }
    
    export default App
    ```
    
    <aside>
    🍠
    
    이유: 하나의 부모 요소로 감싸야함.
    
    </aside>


- 구조분해 할당 활용 

    ```tsx
    const List = ({tech}) => {
    return (
        <li>
        {tech}
        </li>
    )
    }

    export default List
```


- **App.tsx** 파일에 직접 카운터가 1씩 증가, 1씩 감소하는 기능을 만들어주세요 🍠
    - 직접 작성한 코드 **App.tsx** 파일을 올려주세요!
        
        ```tsx
        import { useState } from 'react';
        
        function App() {
          const [count, setCount] = useState(0);
          const count_up_handle = () : void => {
            setCount(count+1);
          }
          const count_down_handle = () : void => {
            setCount(count-1);
          }
          return (
            <>
              <h1>{count}</h1>
              <button onClick={count_up_handle}>증가</button>
              <button onClick={count_down_handle}>감소</button>
            </>
          );
        }
        
        export default App;
        ```
        
    - 정답 (스스로 혼자 해보고 꼭 열어서 확인해주세요!)
        
        ```tsx
        import { useState } from 'react';
        
        function App() {
          const [count, setCount] = useState(0);
        
          const handleIncrement = () => {
            setCount(count + 1);
          };
        
          const handleDecrement = () => {
            setCount(count - 1);
          };
        
          return (
            <>
              <h1>{count}</h1>
              <div>
                <button onClick={handleIncrement}>+1 증가</button>
                <button onClick={handleDecrement}>-1 감소</button>
              </div>
            </>
          );
        }
        
        export default App;
        
        ```