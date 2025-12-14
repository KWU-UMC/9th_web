- **`Referential Equality` (참조 동일성)** 🍠
  - **`Referential Equality`는 무엇인가요?**
    # **`Referential Equality`는 무엇인가요?**
    간단히 말하면,
    > **참조 동일성**은 “두 변수가 **완전히 같은 객체를 가리키고 있는가**?”를 보는 개념이에요.
    - “같은 값이냐?”가 아니라 “같은 **메모리 주소(같은 객체 인스턴스)**를 가리키냐?”를 묻는 거에요.
    그래서 **“두 객체가 진짜로 같은 녀석이냐?”** 를 확인할 때 쓰는 기준이라고 볼 수 있어요.
    ***
    ## 1. 자바스크립트에서 값 vs 참조에요
    ***
    ### 1-1. 값(primitive) 타입
    - `number`, `string`, `boolean`, `null`, `undefined`, `bigint`, `symbol`
    - 변수 안에 **값 자체가 들어있는 경우**에요.
    ```jsx
    let a = 10;
    let b = 10;

    console.log(a === b); // true (값 비교)
    ```
    ***
    ### 1-2. 참조(object) 타입
    - `object`, `array`, `function`, `Date`, `Map` 등
    - 변수 안에는 “객체가 저장된 메모리 위치(참조)”가 들어있어요.
    ```jsx
    const obj1 = { x: 1 };
    const obj2 = { x: 1 };
    const obj3 = obj1;

    console.log(obj1 === obj2); // false (서로 다른 객체(주소값)에요)
    console.log(obj1 === obj3); // true  (같은 객체(주소값)를 가리켜요)
    ```
    - `obj1`과 `obj2`는 모양은 같지만 **서로 다른 객체**에요.
    - `obj1`과 `obj3`는 **정확히 같은 객체**를 공유해요.
      → 이 둘이 “참조 동일”하다고 말하는 거예요.
    ***
    ## 2. 자바스크립트에서 ==, ===, Object.is 에요
    ***
    ### 2-1. `==` (느슨한 동등)
    - 타입을 **암묵적으로 변환**하면서 비교해요.
    - 예측하기 어려운 경우가 많아서, **실무에서는 거의 안 쓰는 게 좋아요.**
    ```jsx
    0 == false; // true
    "" == false; // true
    null == undefined; // true
    ```
    ***
    ### 2-2 `===` (엄격한 동등)
    - 타입 변환 없이 **그대로 비교**해요.
    - primitive에서는 “값 동일성”
    - 객체/배열/함수에서는 “참조 동일성”을 비교해요.
    ```jsx
    // primitive
    1 === 1; // true
    "hi" === "hi"; // true

    // object
    const a = { x: 1 };
    const b = { x: 1 };
    const c = a;

    a === b; // false (서로 다른 객체)
    a === c; // true  (참조 동일성)
    ```
    ***
    ### 2-3. `Object.is`
    - 기본적으로 `===`와 비슷하지만,
      - `NaN` 비교, `+0` vs `-0` 같은 특수 케이스에서만 조금 달라요.
    ```jsx
    NaN === NaN; // false
    Object.is(NaN, NaN); // true

    +0 === -0; // true
    Object.is(+0, -0); // false
    ```
    - **객체에 대해서는 `===`와 똑같이 참조 동일성**을 비교해요.
    ```jsx
    const obj1 = {};
    const obj2 = obj1;

    Object.is(obj1, obj2); // true (같은 참조에요)
    ```
    ***
    ## 3. 객체/배열/함수에서 참조 동일성 예제
    ***
    ### 3-1. 객체
    ```jsx
    const user1 = { name: "kim" };
    const user2 = { name: "kim" };
    const user3 = user1;

    console.log(user1 === user2); // false
    console.log(user1 === user3); // true
    ```
    - `user1`과 `user2`는 **값은 같아 보여도** 서로 다른 객체에요.
    - `user1`과 `user3`는 같은 참조를 공유하니까 참조 동일이에요.
    ***
    ### 3-2. 배열
    ```jsx
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    const arr3 = arr1;

    console.log(arr1 === arr2); // false
    console.log(arr1 === arr3); // true
    ```
    “배열 내용이 같은지”를 보려면 **직접 비교 로직**이 필요해요.
    ```jsx
    const isArrayEqual = (a, b) =>
      a.length === b.length && a.every((v, i) => v === b[i]);

    console.log(isArrayEqual(arr1, arr2)); // true (값 동일성)
    ```
    ***
    ### 3-3. 함수
    ```jsx
    function foo() {}

    const bar = function () {};

    const baz = foo;

    console.log(foo === bar); // false (다른 함수 객체)
    console.log(foo === baz); // true  (같은 함수 객체)
    ```
    - 함수도 결국 **객체**라서, 참조 단위로 비교돼요.
    ***
    ## 4. 참조 동일성이 중요한 이유
    ***
    ### 4-1. 가변 객체 공유로 인한 사이드 이펙트
    ```jsx
    const state = { count: 0 };

    function increment(s) {
      s.count += 1;
      return s;
    }

    const a = state;
    const b = increment(state);

    console.log(a === b); // true (같은 객체)
    console.log(state.count); // 1
    console.log(a.count); // 1
    console.log(b.count); // 1
    ```
    - `state`, `a`, `b` 세 변수가 **같은 객체를 공유**하고 있어요.
    - 어느 한 곳에서 `count`를 바꾸면 **전부 동시에 바뀌는 효과**가 나요.
    - “여기만 바꾼 줄 알았는데, 저기도 같이 바뀌었다”는 버그가 나기 쉬운 패턴이에요.
    ***
    ### 4-2. 불변 객체(immutable) + 참조 동일성
    ```jsx
    const state = { count: 0 };

    function incrementImmutable(s) {
      return { ...s, count: s.count + 1 };
    }

    const a = state;
    const b = incrementImmutable(state);

    console.log(a === b); // false (새 객체)
    console.log(a.count); // 0
    console.log(b.count); // 1
    ```
    - **원본은 그대로 두고, 새로운 객체를 만들어서 반환**해요.
    - 이 패턴을 쓰면
      - 과거 상태를 안전하게 보관할 수 있고
      - “참조가 바뀌었는지”만 봐도 변경 여부를 어느 정도 알 수 있어요.
    리액트에서
    - `useMemo`, `useCallback`
    - `React.memo`, `shouldComponentUpdate`
    - 리덕스의 상태 비교
    같은 곳에서 **“참조가 바뀌었냐?”를 기준으로 리렌더링/계산 최적화를 하는 이유**가 여기에 있어요.
    ***
    ## 5. 자바스크립트에서 자주 하는 실수들
    ***
    ### 5-1. “객체 내용이 같은데 왜 false죠?”
    ```jsx
    const a = { x: 1 };
    const b = { x: 1 };

    console.log(a === b); // false
    ```
    - 이 비교는 **“같은 객체냐?”** 를 묻는 거예요.
    - “내용이 같냐?”를 보려면 별도의 **deepEqual** 로직이나 라이브러리를 써야 해요.
    ***
    ### 5-2. 배열도 마찬가지
    ```jsx
    [1, 2, 3] === [1, 2, 3]; // 항상 false
    ```
    매번 새로 만들어지는 배열은 **다 다른 객체**라서, 참조 동일성이 깨져요.
    ***
    ### 5-3. 상태를 직접 수정하면서, 참조 비교로 변경 여부를 보려는 경우
    ```jsx
    const state = { x: 1 };

    function mutate(s) {
      s.x = 2;
    }

    mutate(state);

    console.log(state === state); // 항상 true죠…
    ```
    - “객체를 직접 수정”했는데, 참조는 그대로니까 참조 동일성으로는 변경 여부를 알 수 없어요.
    - 참조 비교로 변경 여부를 감지하고 싶다면 **불변 패턴(새 객체 생성)**을 써야 해요.
  - **리액트 렌더링 최적화**와 **`Referential Equality`**는 어떤 관계가 있을까요? 🍠
    - 리액트의 렌더링 최적화는 “참조 동일성(===) 기반의 얕은 비교”에 의해 동작하며, 그래서 useMemo, useCallback, React.memo, 불변 업데이트가 필수적이다.
- **`useCallabck`과 `memo`** 🍠
  ### 🎥 실습 1. 강의 영상
  https://www.youtube.com/watch?v=Z3uNjFqYSF8&t=904s
    <aside>
    🍠
    
    위의 영상을 보고 **`useCallabck`과 `memo`에**대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    https://react.dev/reference/react/useCallback
    
    https://react.dev/reference/react/memo
    
    </aside>
    
    - **`useCallabck`** 에 대하여 정리해주세요! 🍠
        
        # **`useCallabck`** 에 대하여 정리해주세요! 🍠
        
        ---
        
        - **`useCallabck`** 이 무엇인지? 🍠
            
            # **`useCallabck`** 이 무엇인지?
            
            ---
            
            - 함수(콜백)를 “메모이제이션” 한다는 게 무슨 뜻인지?
                
                : 랜더링할 떄마다 새 함수를 만들지 말고, 함수의 참조가 유지되도록 막아줌
                
            - 언제 새 함수를 만들고, 언제 기존 함수를 재사용하는지?
                
                : 초기 랜더링& deps가 바뀌면 새함수, 아니면 재사용
                
        - 왜 **`useCallabck`**을 사용하는지? 🍠
            
            # 왜 **`useCallabck`**을 사용하는지?
            
            ---
            
            - **불필요한 리렌더링 방지**와 어떤 관련이 있는지
                
                : 부모가 랜더링 될때마다 자식이 랜더링되지 않도록 도와줌
                
            - 성능 최적화 관점에서 얻는 이득 vs 남용했을 때의 오버헤드
                
                : 이득: 무거운 컴포넌트나 리스트가 많을 때 효과적
                : 남용하면: 메모이제이션 비용이 있음
                
        - **`useCallabck`** 기본 사용법 🍠
            
            # **`useCallabck`** 기본 사용법
            
            ---
            
            - **`useCallabck`**은 어떻게 사용하나요? (코드)
                
                ```tsx
                // 코드를 작성해주세요.
                import { useCallback, useState } from "react";
                
                export default function Example() {
                  const [count, setCount] = useState(0);
                
                  const handleIncrease = useCallback(() => {
                    setCount((prev) => prev + 1);
                  }, []); // 의존성 없음 → 이 함수는 처음 한 번만 생성됨
                
                  return <button onClick={handleIncrease}>+1</button>;
                }
                
                ```
                
            - `deps` 배열에 무엇을 넣어야 하는지 규칙
                
                : 콜백 내부에서 사용하는 모든 state/props/변수
                
            - 의존성 변경 시 콜백이 어떻게 다시 만들어지는지
                
                : deps 배열 중 하나라도 변하면 새함수 생성
                
        - **`useCallabck`**에서 중요한 개념 🍠
            
            # **`useCallabck`**에서 중요한 개념
            
            ---
            
            - **참조 동일성(reference equality)** 이 왜 중요한지 (=== 비교)
                
                : React.memo 비교는 모두 ===비교
                
            - 클로저와 상태: 콜백 안에서 state, props를 사용할 때 주의할 점
                
                : useCallback 내부에서 state를 캡쳐하면 함수 생성 초기의 값으로 고정될 수 있음
                
            - **stale closure(낡은 값 캡처)** 문제는 언제 생기는지, 어떻게 피하는지
                
                : deps에 안넣으니까
                deps에 값을 넣기 OR 함수형 업데이트
                
        - **`useCallabck`**을 사용한 콜백 메모이제이션 예시 🍠
            
            # **`useCallabck`**을 사용한 콜백 메모이제이션 예시
            
            ---
            
            - 부모에서 자식으로 콜백을 내려줄 때, `onClick`, `onChange` 같은 핸들러를 **`useCallabck`** 없이 넘겼을 때와 **`useCallabck`**으로 감싸서 넘겼을 때 차이
                
                ```tsx
                import { useState } from "react";
                import CountButton from "../components/CountButton";
                import TextInput from "../components/TextInput";
                
                export default function UseCallbackPage() {
                  console.log("UseCallbackPage render");
                  const [count, setCount] = useState<number>(0);
                  const [text, setText] = useState<string>("");
                
                  const handleIncreaseCount = (number: number): void => {
                    setCount(count + number);
                  };
                
                  const handleText = (text: string): void => {
                    setText(text);
                  };
                
                  return (
                    <div>
                      <h1>2번 예제 배운 후에 UseCallback</h1>
                
                      <h2>Count : {count}</h2>
                      <CountButton onClick={handleIncreaseCount} />
                
                      <h2>Text</h2>
                      <span>{text}</span>
                      <TextInput onChange={handleText} />
                    </div>
                  );
                }
                ```
                
                ```tsx
                import { useCallback, useState } from "react";
                import CountButton from "../components/CountButton";
                import TextInput from "../components/TextInput";
                
                export default function UseCallbackPage() {
                  console.log("UseCallbackPage render");
                  const [count, setCount] = useState<number>(0);
                  const [text, setText] = useState<string>("");
                
                  const handleIncreaseCount = useCallback((number: number): void => { 
                    setCount(count + number);
                  },[count]);
                
                  const handleText = useCallback((text: string): void => {
                    setText(text);
                  }, []);
                
                  return (
                    <div>
                      <h1>2번 예제 배운 후에 UseCallback</h1>
                
                      <h2>Count : {count}</h2>
                      <CountButton onClick={handleIncreaseCount} />
                
                      <h2>Text</h2>
                      <span>{text}</span>
                      <TextInput onChange={handleText} />
                    </div>
                  );
                }
                
                ```
                
            
        - 이벤트 핸들러 / 비동기 로직에서 **`useCallabck`** 예시 🍠
            
            # 이벤트 핸들러 / 비동기 로직에서 **`useCallabck`** 예시
            
            ---
            
            - 버튼 클릭 시 API 호출하는 핸들러를 `useCallback`으로 감싸는 패턴
                
                ```tsx
                const handleSubmit = useCallback(async () => {
                  const res = await fetch("/api/data");
                  console.log("done");
                }, []);
                
                ```
                
            - `useEffect` 안에서 의존성으로 콜백을 넣을 때 패턴
                
                ```tsx
                useEffect(() => {
                  fetchData();
                }, [fetchData]);
                
                ```
                
            - 폼 제출 핸들러, 디바운스/스로틀 함수와 함께 사용할 때
                
                ```tsx
                const handleSearch = useCallback(
                  debounce((value) => {
                    console.log(value);
                  }, 300),
                  []
                );
                ```
                
            
    - **`memo`**에 대하여 정리해주세요!🍠
        
        # **`memo`**에 대하여 정리해주세요!🍠
        
        ---
        
        - **`memo`**가 무엇인지? 🍠
            
            # **`memo`**가 무엇인지?
            
            ---
            
            : 부모 컴포넌트가 리랜더링 되어도 랜더링되지 않도록 함
            ⇒ props의 변화가 없으면 리랜더링 되지 않음
            
        - 왜 **`memo`**를 사용하는지? 🍠
            
            # 왜 **`memo`**를 사용하는지?
            
            ---
            
            : 성능 최적화
            
        - **`memo`** 기본 사용법 🍠
            
            # **`memo`** 기본 사용법
            
            ---
            
            ```tsx
            import React, { memo } from "react";
            
            function Child({ value }) {
              console.log("Child render");
              return <div>{value}</div>;
            }
            
            export default memo(Child);
            
            ```
            
        - **`memo`**를 언제 쓰면 좋은지 / 안 좋은지 🍠
            
            # **`memo`**를 언제 쓰면 좋은지 / 안 좋은지
            
            ---
            
            좋을떄: props가 자주 바뀌지 않는 컴포 / 부모가 자주 리랜더링 되는데 자식은 아닌경우
            안좋을때: props가 자주 바뀌는 컴포 / 너무 간단한 컴포넌트
            
        
    
    ---
    
    ### 🍠 실습 1. 제출
    
    - 깃허브 주소 🍠
        
        https://github.com/dohyung001/9th_web/tree/main/week10/practice
        
    - 실행 영상 🍠
        
        [practice1 - Chrome 2025-12-11 19-53-28.mp4](attachment:8f433215-624a-4104-888a-36c231608dce:practice1_-_Chrome_2025-12-11_19-53-28.mp4)
        

- **`useMemo`** 🍠
  # **`useMemo`** 🍠
  ***
  ### 🎥 실습 2. 강의 영상
  https://youtu.be/GdnfH_WH8pg?si=lILRTKG4hFOjqrYH
    <aside>
    🍠
    
    위의 영상을 보고 **`useMemo`**에 대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    https://react.dev/reference/react/useMemo
    
    </aside>
    
    - **`useMemo`** 에 대하여 정리해주세요! 🍠
        
        # **`useMemo`** 에 대하여 정리해주세요! 🍠
        
        ---
        
        - **`useMemo`**가 무엇인지? 🍠
            
            # **`useMemo`**가 무엇인지? 🍠
            
            ---
            
            : 값을 메모이제이션 하는 훅
            
        - 왜 **`useMemo`**를 사용하는지? 🍠
            
            # 왜 **`useMemo`**를 사용하는지? 🍠
            
            ---
            
            : 비싼 계산 비용 줄이기
            
        - **`useMemo`** 기본 사용법 🍠
            
            # **`useMemo`** 기본 사용법 🍠
            
            ---
            
            ```tsx
            const memoizedValue = useMemo(() => {
              // 비싼 계산
              return computeSomething(a, b);
            }, [a, b]);
            ```
            
        - **`useMemo`**에서 중요한 개념 🍠
            
            # **`useMemo`**에서 중요한 개념 🍠
            
            ---
            
            ## 1) **메모이제이션(memoization)**
            
            같은 입력 → 같은 출력이면
            
            이전 결과를 캐시해 재사용하는 기술.
            
            useMemo는 "렌더링 사이에서 값을 기억"하는 것.
            
            ---
            
            ## 2) **의존성 배열(deps)**
            
            deps가 변경되면:
            
            - useMemo 내부 콜백이 실행됨
            - 새로운 값 계산
            - 메모리의 이전 값은 폐기됨
            
            deps가 변하지 않으면:
            
            - 이전 값 재사용
            - 내부 함수는 실행되지 않음
            
            ---
            
            ## 3) **참조 동일성(reference equality)**
            
            배열/객체는 참조가 바뀌면 완전히 다른 값으로 취급됨.
            
            따라서 useMemo는 이런 상황에서 강력함:
            
            ```tsx
            const list = useMemo(() => [1, 2, 3], []);
            ```
            
            이렇게 하면
            
            렌더링해도 `[1, 2, 3]`의 참조가 유지됨 → memo에서 최적화 가능.
            
        - **`useMemo`** 실전 예시 🍠
            
            # **`useMemo`** 실전 예시 🍠
            
            ---
            
            ```tsx
            const filteredList = useMemo(() => {
              return items.filter((item) => item.completed);
            }, [items]);
            ```
            
        
    
    ---
    
    ### 🍠 실습 2. 제출
    
    - 깃허브 주소 🍠
        
        https://github.com/dohyung001/9th_web/tree/main/week10/practice
        
    - 실행 영상 🍠
