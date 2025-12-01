# 📝 학습 목표

---

### 1) **Props Drilling 이해 & 해결 전략 습득**

- Props Drilling이 무엇이며, 왜 문제가 되는지 설명할 수 있다.
- 어떤 상황에서 Props Drilling이 발생하는지 파악하고 예시로 설명할 수 있다.
- Props Drilling을 해결하는 방법(Context, 상태관리 라이브러리, 컴포넌트 구조 개선)을 코드와 함께 적용할 수 있다.

---

### 2) **useReducer 실전 활용 능력 익히기**

- useReducer의 개념과 useState와의 차이를 명확히 설명할 수 있다.
- reducer, action, dispatch 구조를 이해하고 직접 상태 관리 로직을 구현할 수 있다.
- 객체 상태/복잡한 상태를 useReducer로 관리하는 패턴을 적용할 수 있다.
- useReducer + Context 조합으로 간단한 전역 상태관리를 구축할 수 있다.

---

### 3) **Redux → Redux Toolkit 흐름 이해 및 적용**

- Redux의 기본 개념(스토어, 리듀서, 액션)을 설명할 수 있다.
- Redux Toolkit이 왜 필요한지, 기존 Redux 대비 이점이 무엇인지 이해한다.
- RTK의 핵심 API(createSlice, configureStore, Provider, useSelector, useDispatch)를 사용할 수 있다.
- RTK로 전역 상태를 구조적으로 설계하고 비동기 로직(createAsyncThunk)을 구현할 수 있다.

---

### 4) **Zustand를 활용한 가볍고 직관적인 상태 관리 구현**

- Zustand의 핵심 개념과 철학을 이해하고, 왜 사용하는지 설명할 수 있다.
- 간단한 Store 생성부터 selector, 비동기 로직까지 직접 작성해볼 수 있다.
- Persist, Immer 등 미들웨어를 사용해 상태 저장 및 불변성 관리를 구현할 수 있다.
- Zustand와 Context API, Redux Toolkit의 차이를 설명하고 상황에 따른 선택 기준을 제시할 수 있다.

---

### 5) **전역 상태 관리 도구들의 역할과 선택 기준 정립**

- 프로젝트 규모·상태 복잡도에 따라 적절한 상태관리 방식(useState/useReducer/Context/RTK/Zustand)을 선택할 수 있다.
- 전역 상태가 필요한 시점과 과한 시점을 판단할 수 있다.
- 다양한 상태 관리 기법들을 실무 코드에 적용하고 비교·분석할 수 있다.

# ⚠️ 스터디 진행 방법

---

1. **워크북 완료 후 스터디 참여**
    - 스터디 전, 워크북 내용을 **모두 작성**하고 이해되지 않은 부분을 준비합니다.
2. **스터디 미션 수행**
    - 워크북 완료 후 미션을 수행합니다.
    - 진행 내용과 문제점을 스터디 시간에 공유합니다.
    - **코드 리뷰**는 GitHub PR에서 상시 진행합니다.
3. **스터디 시간 구성**
    1. 각자 진행한 미션 중 **해결하지 못한 이슈 공유**
    2. 해당 문제를 **스터디원과 함께 해결 방법 공유**, 필요 시 같이 해결
    3. 미션 후 **피드백 공유 및 개선**
4. **주차별 미션 제출**
    - 매주 **워크북과 미션을 제출**합니다. (디자인은 개인 보완 가능)
    - 워크북 완료 후 [**워크북 피드백 폼 제출**](https://forms.gle/aXPWVZpDSfYTAiCd6?utm_source=chatgpt.com)
        - 특정 주제에 많은 피드백 요청이 들어올 경우, 피드백 이후 해당 내용을 바탕으로 **추가 강의 영상** 제공 예정 ([유튜브 구독](https://www.youtube.com/@yongcoding?utm_source=chatgpt.com))
    - **🍠 코드 리뷰 제출 기준**
        - 본인이 리뷰한 코드 **최소 1개**
        - 본인이 받은 리뷰를 코드에 **실제 반영한 것 최소 1개**
5. **스터디 인증샷**
    - 매주 대표 사진 **1장** 남기기
    - 이미지 임베드 또는 복사·붙여넣기 가능

# 📸 잠깐 ! 스터디 인증샷은 찍으셨나요?📸

---

* 스터디리더께서 대표로 매 주차마다 한 장 남겨주시면 좋겠습니다!🙆💗
 (사진을 저장해서 이미지 임베드를 하셔도 좋고, 복사+붙여넣기해서 넣어주셔도 좋습니다!)

[]()

# 🎯 핵심 키워드

---

<aside>
💡 주요 내용들에 대해 조사해보고, 자신만의 생각을 통해 정리해보세요!
레퍼런스를 참고하여 정의, 속성, 장단점 등을 적어주셔도 됩니다.
조사는 공식 홈페이지 **Best**, 블로그(최신 날짜) **Not Bad**

🍠 이모지가 달린 부분은, 여러분들이 직접 조사하여, 추가 작성하거나, 실습해보실 부분이니, 꼭 진행해주셔야 합니다!

</aside>

- **Props Drilling**
    - **Props Drilling**이란?
        
        # **Props Drilling**이란?
        
        ---
        
        **Props Drilling**은 상위 컴포넌트에서 하위 컴포넌트로 데이터를 내려보낼 때,
        
        > 실제로 그 값을 쓰지 않는 중간 컴포넌트들도
        props를 계속 받아서, 다시 아래로 전달해야 하는 상황을 의미해요.
        > 
        
        리액트는 **데이터가 위에서 아래로만 흐르는 구조(단방향 데이터 흐름)** 를 사용하기 때문에, 컴포넌트 깊이가 깊어질수록 이런 문제가 점점 더 눈에 띄게 나타나요.
        
        ---
        
        # 2. 가장 쉬운 예시로 이해하기
        
        ### 예시 코드
        
        ```tsx
        function App() {
          return <Parent name="Matthew" />;
        }
        
        function Parent({ name }: { name: string }) {
          return <Child name={name} />;
        }
        
        function Child({ name }: { name: string }) {
          return <GrandChild name={name} />;
        }
        
        function GrandChild({ name }: { name: string }) {
          return <div>Hello {name}</div>;
        }
        ```
        
        여기서 사실 **`name`이 필요한 컴포넌트는 `GrandChild` 하나뿐**이에요.
        
        하지만 구조 때문에:
        
        - `App` → `Parent` → `Child` → `GrandChild`
        
        이렇게 **중간에 있는 `Parent`, `Child`도 name을 받아서 그대로 내려보내야만 하는 상황**이 생겨요.
        이런 패턴이 바로 **Props Drilling**이에요.
        
        ---
        
    - 왜 **Props Drilling**이 문제일까?
        
        # 왜 **Props Drilling**이 문제일까?
        
        ---
        
        ### 1) 유지보수가 점점 어려워져요
        
        - 중간 컴포넌트가 많아질수록, 어떤 데이터를 어디에서 전달하는지 추적하기가 점점 어려워져요.
        - 나중에 `name` 같은 props 이름을 바꾸거나 타입을 바꾸고 싶을 때 **중간에 지나가는 모든 컴포넌트**를 수정해야 해요.
        
        ### 2) 코드 가독성이 떨어져요
        
        - 어떤 컴포넌트는 실제로 `name`을 전혀 사용하지 않는데, 단지 “아래로 전달해주기 위해서” props를 받고 또 넘겨야 해요.
        - 이러면 코드만 봤을 때 “이 컴포넌트도 name을 쓰는 건가?” 하고 헷갈리기 쉬워요.
        
        ### 3) 컴포넌트 구조를 바꾸기 부담스러워져요
        
        - 화면 구조를 리팩토링하면서 컴포넌트를 위아래로 옮기면, 그에 맞춰 props 전달 경로도 전부 다시 손을 봐야 해요.
        - 그래서 구조를 개선하고 싶어도 **손대기 귀찮은 코드**가 됩니다.
        
        ---
        
    - 어떤 상황에서 **Props Drilling**이 자주 생길까?
        
        # 어떤 상황에서 **Props Drilling**이 자주 생길까?
        
        ---
        
        아래와 같은 **“여러 곳에서 공통으로 필요한 값”** 들을 내려보낼 때 **Props Drilling**이 자주 발생해요.
        
        - 로그인한 사용자 정보 (user, profile)
        - 다크 모드 / 라이트 모드 같은 **테마 정보**
        - 언어 설정 (i18n, locale)
        - 레이아웃 전체에서 쓰는 설정 값들
        - 모달 열림 여부, 알림 상태 등 **전역 UI 상태**
        
        처음에는 컴포넌트 몇 개만 있어서 괜찮지만, 프로젝트가 커질수록 “여기도 필요하네?”, “저기도 필요하네?” 하면서 점점 Drilling 구간이 길어질 수 있어요.
        
    - **Props Drilling**을 줄이거나 없애는 방법
        
        # **Props Drilling**을 줄이거나 없애는 방법
        
        ---
        
        ### 가장 먼저 확인할 것: 컴포넌트 설계
        
        무조건 Context나 전역 상태관리로 가기 전에, 먼저 아래를 생각해보면 좋아요.
        
        1. **이 데이터가 진짜 이 깊이까지 내려가야 할까?**
        2. **컴포넌트 역할을 다시 나누면 props 경로를 줄일 수 있을까?**
        
        예를 들어, 특정 데이터가 항상 **특정 섹션에서만** 사용된다면 그 섹션을 별도 컴포넌트로 묶고, 그 안에서만 데이터를 관리하도록 설계할 수도 있어요.
        
        ---
        
        ### React Context API 사용하기
        
        **여러 컴포넌트에서 공통으로 사용하는 값**이라면 `Context`를 사용해서 **Props Drilling**을 줄일 수 있어요.
        
        **1) 타입 정의하기**
        
        ```tsx
        import { createContext, useContext } from "react";
        
        interface UserContextType {
          name: string;
        }
        
        const UserContext = createContext<UserContextType | null>(null);
        ```
        
        **2) 상위에서 Provider로 감싸기**
        
        ```tsx
        function App() {
          return (
            <UserContext.Provider value={{ name: "Matthew" }}>
              <Parent />
            </UserContext.Provider>
          );
        }
        ```
        
        이제 `Parent` 아래에 있는 모든 컴포넌트는 props로 name을 받지 않아도, **Context를 통해 값에 접근할 수 있어요.**
        
        **3) 하위 컴포넌트에서 사용하기**
        
        ```tsx
        function GrandChild() {
          const user = useContext(UserContext);
        
          if (!user) return null;
        
          return <div>Hello {user.name}</div>;
        }
        ```
        
        이렇게 하면:
        
        - `Parent`, `Child`는 더 이상 name을 전달할 필요가 없어요.
        - `GrandChild`는 **필요한 곳에서 바로** 값을 꺼내서 쓸 수 있어요.
        
        ---
        
        ### 상태관리 라이브러리 사용하기
        
        프로젝트가 조금 더 커지면, 아래와 같은 **상태관리 라이브러리**도 많이 사용해요.
        
        - **`Redux Toolkit`  (밑에서 같이 학습해볼꺼에요)**
        - **`Zustand`** **(밑에서 같이 학습해볼꺼에요)**
        - Recoil
        - Jotai 등
        
        이런 도구들을 사용하면:
        
        - 전역에 가까운 상태를 하나의 “스토어”에서 관리하고,
        - 필요한 컴포넌트에서 **직접 스토어에 접근해서** 값을 읽고 업데이트할 수 있어요.
        - 따라서 불필요하게 props를 단계별로 전달할 필요가 줄어들어요.
        
        ---
        
        ### Custom Hook으로 로직 분리하기
        
        여러 컴포넌트에서 **같은 로직**을 사용해야 한다면 `useSomething` 형태의 Custom Hook으로 분리하는 것도 좋아요.
        
        ```tsx
        function useDarkMode() {
          const [isDarkMode, setIsDarkMode] = useState(false);
        
          const toggle = () => setIsDarkMode((prev) => !prev);
        
          return { isDarkMode, toggle };
        }
        ```
        
        이제 필요한 컴포넌트에서:
        
        ```tsx
        function Header() {
          const { isDarkMode, toggle } = useDarkMode();
        
          return (
            <header>
              <button onClick={toggle}>
                {isDarkMode ? "다크 모드" : "라이트 모드"}
              </button>
            </header>
          );
        }
        ```
        
        이런 식으로 직접 사용하면 돼요.
        
        물론 이 상태를 여러 곳에서 공유해야 한다면, Custom Hook 안에서 Context나 상태관리 라이브러리를 함께 사용할 수도 있어요.
        
    - **Props Drilling** → Context로 리팩토링
        
        # **Props Drilling** → Context로 리팩토링
        
        ---
        
        ### 리팩토링 전 (**Props Drilling** 발생)
        
        ```tsx
        function App() {
          return <Page isDarkMode={true} />;
        }
        
        function Page({ isDarkMode }: { isDarkMode: boolean }) {
          return <Layout isDarkMode={isDarkMode} />;
        }
        
        function Layout({ isDarkMode }: { isDarkMode: boolean }) {
          return <Header isDarkMode={isDarkMode} />;
        }
        
        function Header({ isDarkMode }: { isDarkMode: boolean }) {
          return <h1>{isDarkMode ? "Dark" : "Light"} Mode</h1>;
        }
        ```
        
        여기서는:
        
        - 실제로 `isDarkMode`를 사용하는 컴포넌트는 `Header` 하나뿐인데,
        - `App → Page → Layout → Header`까지 계속 전달해줘야 해요.
        
        ---
        
        ### 리팩토링 후 (Context 사용)
        
        ```tsx
        import { createContext, useContext } from "react";
        
        interface ThemeContextType {
          isDarkMode: boolean;
        }
        
        const ThemeContext = createContext<ThemeContextType | null>(null);
        
        function App() {
          return (
            <ThemeContext.Provider value={{ isDarkMode: true }}>
              <Page />
            </ThemeContext.Provider>
          );
        }
        
        function Page() {
          return <Layout />;
        }
        
        function Layout() {
          return <Header />;
        }
        
        function Header() {
          const theme = useContext(ThemeContext);
        
          if (!theme) return null;
        
          return <h1>{theme.isDarkMode ? "Dark" : "Light"} Mode</h1>;
        }
        ```
        
        이제는:
        
        - 중간 컴포넌트 `Page`, `Layout`은 `isDarkMode`를 전혀 신경 쓰지 않아도 돼요.
        - `Header`에서 필요한 값을 **Context를 통해 직접 가져와서** 사용해요.
        - 코드가 훨씬 단순해지고, 나중에 구조를 바꾸기도 편해져요.
        
    - TypeScript 관점에서 살펴보기
        
        # TypeScript 관점에서 살펴보기
        
        ---
        
        TypeScript를 사용하면 **props와 Context의 타입을 명확하게 관리**할 수 있어요.
        
        **Props 타입 정의**
        
        ```tsx
        interface UserProps {
          name: string;
        }
        
        function Profile({ name }: UserProps) {
          return <div>{name}</div>;
        }
        ```
        
        - 이렇게 타입을 정의해두면, 잘못된 타입을 전달할 때 컴파일 단계에서 바로 에러를 볼 수 있어요.
        
        **Context 타입 정의**
        
        ```tsx
        interface AuthContextType {
          userName: string;
          isLoggedIn: boolean;
        }
        
        const AuthContext = createContext<AuthContextType | null>(null);
        ```
        
        TypeScript와 함께 Context를 사용하면:
        
        - 어떤 값들이 Context에 들어가는지 한눈에 알 수 있고,
        - `useContext`를 사용할 때도 자동완성의 도움을 받을 수 있어서 **실수 가능성이 줄어들어요.**
        
    - ✔ **Props Drilling** 을 피하기 위한 체크리스트
        
        # ✔ **Props Drilling**을 피하기 위한 체크리스트
        
        ---
        
        ✔ **이 props는 진짜 이 컴포넌트가 필요해서 받는 걸까요?**
        
        → 아니고, 그냥 아래로 전달하기만 한다면 Drilling일 가능성이 커요.
        
        ✔ **이 상태는 특정 영역에서만 쓰이나요, 아니면 앱 전역에서 필요하나요?**
        
        → 전역에 가깝게 쓰인다면 Context나 상태관리 라이브러리를 고려해볼 수 있어요.
        
        ✔ **컴포넌트 구조를 다시 나누면 props 깊이를 줄일 수 있나요?**
        
        ✔ **Context를 도입했을 때, 오히려 너무 많은 전역 상태가 생기지 않나요?**
        
        → Context를 남발하면 “전역 변수 지옥”이 될 수 있어서, 진짜 여러 곳에서 공통으로 쓰는 값에만 쓰는 게 좋아요.
        
        ✔ **공통 로직은 Custom Hook으로 빼둘 수 있나요?**
        
- **useReducer** 🍠
    
    # **useReducer**
    
    ---
    
    ### **🎥 실습 강의 영상**
    
    https://youtu.be/9ISInVDo5m0?si=Y43GTVSDerVncPBi
    
    <aside>
    🥕
    
    위의 영상을 보고 **useReducer**에 대해 정리해주세요!
    위의 영상과 함께 실습을 진행하시고 아래에 실습 영상에 제출해주세요!
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    </aside>
    
    [useReducer – React](https://react.dev/reference/react/useReducer)
    
    ---
    
    - **useReducer**란 무엇인가요?
        
        # **useReducer**란 무엇인가요?
        
        ---
        
        **useReducer**는 React에서 상태(state)를 관리하기 위한 훅이에요.
        일반적으로 `useState`로도 상태를 관리할 수 있지만, **상태 변화 로직이 복잡해지거나 여러 타입의 업데이트가 필요한 경우에는 useReducer가 더 적합해요.**
        
        쉽게 말하면:
        
        > "상태 업데이트 로직을 한 곳에 모아서 깔끔하게 관리할 수 있게 도와주는 도구"라고 생각하면 좋아요.
        > 
        
        특히 TypeScript와 함께 쓰면 더 강력해져요. 상태와 액션 타입을 명확하게 정의할 수 있기 때문이에요!
        
        ---
        
        # 왜 **useReducer**를 사용할까요?
        
        ---
        
        ### ✔ 상태 업데이트가 여러 형태일 때 좋아요
        
        예: 증가, 감소, 리셋 등 다양한 변경이 필요할 때
        
        ### ✔ state 구조가 복잡할 때 좋아요
        
        예: 객체 형태의 상태 → 여러 필드를 제각각 업데이트해야 하는 상황
        
        ### ✔ 상태 업데이트 로직을 컴포넌트 밖으로 분리할 수 있어요
        
        → 재사용성 증가, 테스트가 쉬워짐
        
        ### ✔ props drilling 없이 dispatch만 넘기면 돼요
        
        → 불필요한 state 전달을 줄일 수 있어요
        
    - **useReducer** 기본 문법
        
        # **useReducer** 기본 문법
        
        ```tsx
        const [state, dispatch] = useReducer(reducer, initialState);
        ```
        
        - **state**: 현재 상태
        - **dispatch**: 상태 변경을 요청하는 함수
        - **reducer**: 상태 업데이트 로직이 들어있는 함수
        - **initialState**: 초기 상태 값
        
        ---
        
        ### reducer 함수 형태
        
        ```tsx
        function reducer(state: StateType, action: ActionType): StateType {  
        	switch (action.type) {    
        		case 'increment':      
        			return { count: state.count + 1 };    
        		default:      
        			return state;  
        }}
        ```
        
        ---
        
        ### Counter 예제
        
        ```tsx
        import { useReducer } from "react";
        
        interface State {
           count: number;
        }
        
        type Action =
        | { type: "increment" }
        | { type: "decrement" }
        | { type: "reset" };
        
        const initialState: State = { count: 0 };
        
        function reducer(state: State, action: Action): State {
          switch (action.type) {
           case "increment":
            return { count: state.count + 1 };
           case "decrement":
            return { count: state.count - 1 };
           case "reset":
            return { count: 0 };
           default:
            return state;
          }
        }
        
        export default function Counter() {
          const [state, dispatch] = useReducer(reducer, initialState);
        
          return (
            <div>
              <h1>{state.count}</h1>
              <button onClick={() => dispatch({ type: "increment" })}>+1</button>
              <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
              <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
            </div>
         );
        }
        ```
        
    - useState와 **useReducer** 비교하기
        
        # useState와 **useReducer** 비교하기
        
        ---
        
        | **항목** | **useState** | **useReducer** |
        | --- | --- | --- |
        | **상태가 단순한 경우** | 👍 매우 좋음 | 😐 과할 수 있음 |
        | **상태 업데이트 로직이 복잡한 경우** | 😐 관리 어려움 | 👍 훨씬 깔끔함 |
        | **여러 액션이 존재할 때** | 😐 if/else 난무 | 👍 switch로 명확하게 구분 |
        | **컴포넌트 재사용/테스트 용이성** | 보통 | 매우 좋음 |
        | **전역 상태처럼 사용하기** | 제한적 | dispatch만 내려도 가능 |
    - **useReducer** 객체 상태 관리
        
        # **useReducer** 객체 상태 관리
        
        ---
        
        **useReducer**의 진가는 **객체 상태를 다룰 때** 드러나요.
        
        **폼(Form) 상태 관리 예시**
        
        ```tsx
        interface FormState {
        name: string;
        age: number;
        }
        
        type FormAction =
        | { type: "setName"; payload: string }
        | { type: "setAge"; payload: number }
        | { type: "reset" };
        
        const initialForm: FormState = {
           name: "",
           age: 0,
        };
        
        function formReducer(state: FormState, action: FormAction): FormState {
          switch (action.type) {
           case "setName":
            return { ...state, name: action.payload };
           case "setAge":
            return { ...state, age: action.payload };
           case "reset":
            return initialForm;
           default:
            return state;
          }
        }
        ```
        
    - dispatch를 통해 props로 전달해보기
        
        # dispatch를 props로 전달해보기
        
        ---
        
        props drilling을 줄이기 위해 **state 대신 dispatch만 전달하는 방식**도 자주 사용해요.
        
        ```tsx
        function Child({ dispatch }: { dispatch: React.Dispatch<Action> }) {
          return (
           <button onClick={() => dispatch({ type: "increment" })}>+1</button>
          );
        }
        ```
        
        - 이렇게 하면 상태값(state)을 굳이 여러 컴포넌트에 전달할 필요가 없어요.
        - 하위 컴포넌트는 dispatch만 받아서 필요한 액션을 보내면 되어요.
    - **useReducer** + Context 함께 사용하기
        
        # **useReducer** + Context 함께 사용하기
        
        ---
        
        규모가 조금 커지면 아래 조합을 자주 사용해요.
        
        > **useReducer** + Context → 간단한 전역 상태 관리 구현
        > 
        
        **ex:**
        
        ```tsx
        const CounterContext = createContext<{
          state: State;
          dispatch: React.Dispatch<Action>;
        } | null>(null);
        ```
        
        App 전체를 Provider로 감싸면, Redux 없이도 깔끔한 전역 상태 시스템이 생겨요.
        
    - ✔ **useReducer** 사용 시 체크리스트
        
        ### ✔ 상태 업데이트 로직이 복잡해지나요?
        
        액션이 많다면 **useReducer**가 더 좋아요.
        
        ### ✔ 상태 변경이 여러 경우로 나뉘나요?
        
        if/else보다 switch가 훨씬 명확해요.
        
        ### ✔ 테스트 가능한 로직을 만들고 싶나요?
        
        reducer 함수는 독립적이어서 테스트하기 쉬워요.
        
        ### ✔ dispatch를 내려보내면 props drilling을 줄일 수 있나요?
        
        상위에서 state를 모두 들고 있을 필요가 없어요.
        
    
    ---
    
    ### 🍠 실습 1. 제출
    
    - 깃허브 주소 🍠
    - 실행 영상 🍠
    - **useReducer** 학습 회고
        
        <aside>
        📢 이번 **useReducer** 실습을 해결해보면서 어땠는지 **회고**해봅시다.
        
        - **핵심 키워드**에 대해 완벽하게 이해했는지? 
        - **이해한 점 - 어려운 점 (개선 방법) - 회고** 순서로 작성해주세요.
        - **참고 자료**가 있다면 아래에 남겨주세요.
        
        </aside>
        
    
- **`Redux`** vs **`Redux Toolkit`** 🍠
    
    # **`Redux`** vs **`Redux Toolkit`**
    
    ---
    
    <aside>
    💡
    
    **`Redux Toolkit`**은 처음 접하실 때 다소 복잡하게 느껴질 수 있습니다. 그래서 이번 챕터에서는 여러분의 이해를 돕기 위해 **`Redux Toolkit` 개념 설명을 먼저 제공**해 두었습니다.
    
    다만, 앞으로의 개발 과정에서는 스스로 학습하고 정리하는 습관이 매우 중요하기 때문에, 제공된 설명만 보지 말고 아래 방법도 함께 활용해 보시길 추천드립니다.
    
    ---
    
    ## 미션 수행을 위한 권장 학습 방법
    
    ### 1. 제공된 개념 설명 먼저 정독하기
    
    - 이번 챕터에 포함된 **`Redux Toolkit` 개념 설명**을 꼼꼼히 읽으면서 전반적인 흐름을 먼저 잡아주세요.
    - 한 번에 이해되지 않는 부분은 표시해 두었다가, 공식 문서나 추가 자료를 참고하면서 다시 보완해 주세요.
    
    ---
    
    ### 2. 공식 문서 및 자료 추가 탐색
    
    - **`Redux Toolkit`** 공식 문서와 신뢰할 수 있는 블로그 글을 함께 참고해 보세요.
    - 특히 다음을 중점적으로 살펴보면 좋습니다:
        - 제공된 개념 설명과 공식 문서의 내용이 어떻게 연결되는지
        - 예시 코드가 어떤 의도와 패턴을 가지고 작성되었는지
    
    ---
    
    ### 3. 워크북 작성 원칙 (중요!)
    
    - 워크북의 각 토글을 하나씩 펼쳐 보면서
        
        **제공된 개념 설명 + 스스로 찾아본 내용**을 정리해 주세요.
        
    - ⚠️ **절대 복사·붙여넣기를 하지 마세요!** ⚠️
        
        직접 이해한 내용을 **자신의 언어로 타이핑**하는 과정이 학습에 가장 중요합니다.
        
    
    ---
    
    ### 4. 영상 활용 (선택 사항)
    
    - 학습이 여전히 막막하게 느껴진다면, 아래 미션 강의 영상을 참고해 주세요.
    - 영상 속 실습 순서에 맞춰 따라 하면서,
        - 제공된 개념 설명에서 읽은 내용과
        - 공식 문서에서 본 내용이
            
            실제 코드에서 어떻게 사용되는지 함께 연결해 보시면 큰 도움이 됩니다.
            
    
    ---
    
    앞으로의 개발 과정에서는 **필요한 지식을 스스로 탐색하고, 이해하고, 기록하는 능력**이 매우 중요합니다.
    
    이번 미션을 통해 그런 능력을 탄탄히 다져 가시길 응원합니다! 🚀
    
    </aside>
    
    - **`Redux`는 무엇인가요?**
        
        # **`Redux`**는 무엇인가요?
        
        ---
        
        **`Redux`**는 **전역 상태(state)를 예측 가능하게 관리할 수 있도록 도와주는 라이브러리**에요.
        
        리액트뿐만 아니라, 어떤 프론트엔드 환경에서도 사용할 수 있는 “상태 관리 패턴”과 “도구 모음”이라고 생각하면 좋아요.
        
        [Redux - A JS library for predictable and maintainable global state management | Redux](https://redux.js.org/)
        
        **특징 정리:**
        
        - 상태(State)는 하나의 큰 저장소(Store)에 모여 있어요.
        - 상태는 항상 **순수 함수(reducer)** 를 통해서만 변경돼요.
        - 변경하려면 반드시 **action** 객체를 사용해야 해요.
        - 구조가 명확해서 예측 가능성이 높아요.
        
        **단점도 있어요:**
        
        - 코드가 길어지고 반복되는 부분(boilerplate)이 많아요.
        - action, action creator, reducer, switch문 등 작성할 코드가 많아서 처음엔 부담될 수 있어요.
        
        ---
        
        # **`Redux`** 예시
        
        ```tsx
        // actions.ts
        export const INCREMENT = "INCREMENT";
        
        export const increment = () => ({
          type: INCREMENT,
        });
        
        // reducer.ts
        import { INCREMENT } from "./actions";
        
        const initialState = { count: 0 };
        
        export function counterReducer(state = initialState, action: any) {
          switch (action.type) {
            case INCREMENT:
              return { ...state, count: state.count + 1 };
            default:
              return state;
          }
        }
        ```
        
        작성해야 할 파일도 많고, 코드량도 많아요.
        
    - **`Redux Toolkit`**은 무엇인가요?
        
        # **`Redux Toolkit`(RTK)**은 무엇인가요?
        
        ---
        
        **`Redux Toolkit`**(RTK)은 기존 Redux의 불편한 점들을 해결하고, **더 적은 코드로 더 편하게 Redux를 사용할 수 있도록 만든 공식 도구 세트**에요.
        
        [Getting Started | Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
        
        **`Redux`** 팀에서 공식적으로 권장하는 방식이고, 현재는 대부분의 프로젝트가 Redux Toolkit을 기본으로 사용하고 있어요.
        
        특징:
        
        - **보일러플레이트(중복 코드)** 를 크게 줄여줘요.
        - Immer가 포함되어 있어서 **불변성 관리가 자동**으로 돼요.
        - `createSlice`를 통해 action + reducer를 한 번에 만들 수 있어요.
        - 비동기 로직도 `createAsyncThunk`로 쉽게 관리할 수 있어요.
        
        ---
        
        # **`Redux Toolkit`** 예시
        
        ```tsx
        import { createSlice } from "@reduxjs/toolkit";
        
        const counterSlice = createSlice({
          name: "counter",
          initialState: { count: 0 },
          reducers: {
            increment(state) {
              state.count += 1; // 불변성 신경 쓸 필요 없음!
            },
          },
        });
        
        export const { increment } = counterSlice.actions;
        export default counterSlice.reducer;
        ```
        
    - **`Redux` vs `Redux Toolkit`** 한눈에 비교
        
        # Redux vs **`Redux Toolkit`** 한눈에 비교
        
        ---
        
        | **항목** | **Redux** | **`Redux Toolkit`** |
        | --- | --- | --- |
        | **코드량** | 많아요 (보일러플레이트 존재) | 매우 적어요 |
        | **불변성 관리** | 직접 해줘야 해요 | 자동으로 처리돼요 (Immer 사용) |
        | **Reducer 작성** | switch문 사용 | createSlice로 간결하게 |
        | **Action 생성** | action creator 따로 작성 | slice에서 자동 생성 |
        | **비동기 처리** | redux-thunk 또는 saga 설정 필요 | createAsyncThunk로 간단 |
        | **학습 난이도** | 상대적으로 높아요 | 더 쉬워요 |
        | **공식 권장 여부** | 과거 방식 | **현재 Redux 공식 권장 방식** |
        | **생산성** | 낮음 | 매우 높음 |
        
    - **`Redux Toolkit`이 공식적으로 권장되는 이유**
        
        # **`Redux Toolkit`이 공식적으로 권장되는 이유**
        
        ---
        
        **Redux** 팀이 직접 말하는 핵심은 이것이에요:
        
        > “RTK는 **Redux**를 더 쉽고, 더 빠르고, 더 안전하게 사용할 수 있는 표준 도구입니다.”
        > 
        
        즉, 기존 **Redux**의 문제점을 거의 다 해결하면서도 **Redux**의 장점(예측 가능성, 구조화된 패턴)은 그대로 가져갈 수 있어요.
        
    - ✔ 언제 **`Redux Toolkit`**을 사용할까요?
        
        # 언제 **`Redux Toolkit`**을 사용할까요?
        
        ---
        
        **👉 이런 경우라면 강력 추천해요**
        
        ✔ 여러 컴포넌트에서 공유하는 복잡한 상태가 많아요.
        
        ✔ 비동기 API 요청이 자주 발생해요.
        
        ✔ 데이터 구조가 복잡해서 불변성 관리가 힘들어요.
        
        ✔ 상태 모듈을 여러 개로 나눠 관리하고 싶어요.
        
        ✔ **Redux**를 쓰고 싶은데 “코드가 너무 많아서 부담스럽다”라고 느낀 적이 있어요.
        
        **👉 이런 경우**  **Redux가 과할 수도 있어요**
        
        ✔ useState나 useReducer로 충분히 관리 가능한 작은 규모일 때
        
        ✔ Context API만으로도 해결 가능한 경우
        
    - **`Redux Toolkit`** 사용법을 공식문서를 보며 직접 정리해보기 🍠
        
        [Getting Started | Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
        
        - Provider
            
            리액트 앱 전체에서 Redux Store에 접근할 수 있도록 최상위 컴포넌트(보통 App 또는 index)를 감싸는 역할을 한다. store props를 통해 생성된 Redux 저장소를 하위 컴포넌트들에게 전달하여 어디서든 상태를 사용할 수 있게 한다.
            
        - configureStore
            
            Redux Store를 생성하는 함수로, 기존 createStore보다 설정이 간편하고 Redux DevTools와 Thunk 미들웨어가 기본적으로 내장되어 있다. 여러 개의 리듀서(Reducer)를 객체 형태로 전달하면 자동으로 하나로 병합(combineReducers)하여 스토어를 구성한다.
            
        - createSlice
            
            초기 상태(initialState), 리듀서 함수, 슬라이스 이름을 받아 액션 생성자 함수와 리듀서 함수를 한 번에 자동으로 생성해 준다. 내부적으로 Immer 라이브러리를 사용하기 때문에 불변성을 직접 관리하지 않고도 상태를 직접 수정하는 것처럼 코드를 작성할 수 있다.
            
        - useSelector
            
            Redux Store에 저장된 상태(state) 값을 컴포넌트 내부에서 조회(구독)할 때 사용하는 Hook이다. 상태가 변경되었을 때 해당 값을 구독하고 있는 컴포넌트만 리렌더링되도록 하여 불필요한 렌더링을 방지한다.
            
        - useDispatch
            
            Store에 액션 객체를 전달(dispatch)하여 상태 변경을 요청할 때 사용하는 Hook이다. createSlice를 통해 만들어진 액션 생성자 함수를 실행하고, 그 결과를 dispatch 함수의 인자로 넣어 호출함으로써 리듀서를 동작시킨다.
            
        - 기타 **`Redux Toolkit`** 사용 방법을 상세하게 정리해 보세요
- **Zustand** 🍠
    
    # **Zustand** 🍠
    
    ---
    
    <aside>
    💡
    
    **Zustand** 또한 처음 접하실 때 다소 복잡하게 느껴질 수 있습니다. 하지만 이번 챕터에서는 제가 위에서 **Redux**와 **Redux Toolkit**에 대해 정리해 드린 것 처럼 여러분이 **스스로 탐색하고 정리하는 학습 습관을 기르는 것**을 목표로 하기 때문에, 기본 개념 설명은 따로 제공하지 않았습니다.
    
    대신, 아래의 권장 학습 방법을 따라가며 주도적인 학습 경험을 만들어 보세요.
    
    ---
    
    ### 1. 제공된 개념 설명 먼저 정독하기
    
    - 이번 챕터에 포함된 **Zustand 관련 개념 설명**을 먼저 차분히 읽어보며 전체적인 구조와 흐름을 잡아주세요.
    - 이해가 잘 되지 않는 부분은 표시해 두었다가, 공식 문서나 추가 자료 조사로 보완해 보시길 추천합니다.
    
    ### 2. 공식 문서 및 자료 추가 탐색
    
    - **Zustand** 공식 문서와 신뢰할 수 있는 블로그 글을 참고해 보세요.
    - 특히 다음 관점을 중심으로 학습하면 도움이 됩니다:
        - 제공된 개념 설명과 공식 문서의 내용이 어떻게 연결되는지
        - 예시 코드가 어떤 의도와 패턴을 기반으로 작성되었는지
    - 다른 상태관리 라이브러리(Redux Toolkit 등)와 비교해 보는 것도 이해에 도움이 됩니다.
    
    ### 3. 워크북 작성 원칙 (중요!)
    
    - 워크북의 각 토글을 하나씩 펼쳐 보면서
        
        **제공된 개념 설명 + 직접 찾아본 내용**을 기반으로 정리해 주세요.
        
    - ⚠️ **절대 복사/붙여넣기를 하지 마세요!** ⚠️
        
        직접 이해하고 자신의 문장으로 정리하는 과정이 학습 효과를 극대화합니다.
        
    
    ### 4. 영상 활용
    
    - 학습이 막막하게 느껴진다거나 다양한 내용을 알고 싶다면 아래 제공된 설명 영상을 참고해 주세요.
    - 영상의 실습 흐름에 맞춰 따라 하면서,
        - 개념 설명에서 읽은 내용
        - 공식 문서에서 확인한 API 및 패턴
            
            이 실제 코드에서 어떻게 적용되는지 연결해 보시면 훨씬 깊은 이해를 얻을 수 있습니다.
            
    
    ---
    
    앞으로의 개발 과정에서는 **필요한 지식을 스스로 탐색하고, 정리하고, 기록하는 능력**이 매우 중요해집니다.
    
    이번 미션을 통해 이러한 능력을 더욱 단단하게 쌓아 가시길 응원합니다! 🚀
    
    </aside>
    
    ### 🎥 강의 영상
    
    https://youtu.be/NOdAIlFreOI?si=958aros8pbEXNVsJ
    
    <aside>
    🍠
    
    위의 영상을 보고 **Zustand**에 대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    </aside>
    
    ### 📚 공식 문서
    
    [Zustand](https://zustand-demo.pmnd.rs/)
    
    - **Zustand**란 무엇인가요? 🍠
        
        # **Zustand**란 무엇인가요?
        
        ---
        
        독일어로 '상태'라는 뜻을 가진, 작고 빠르며 확장 가능한 베어본(Bearbones) 상태 관리 라이브러리이다. 훅(Hook) 기반의 API를 사용하여 보일러플레이트가 거의 없고, Redux DevTools를 지원하면서도 설정이 매우 간편하다.
        
    - 왜 **Zustand**를 사용할까요? 🍠
        
        # 왜 Zustand를 사용할까요?
        
        ---
        
        Redux처럼 최상위 컴포넌트를 Provider로 감싸지 않아도 되어 컴포넌트 트리 구조에 영향을 주지 않는다. 문법이 직관적이라 러닝 커브가 낮고, 특정 상태만 구독하는 '선택적 구독(Selector)'을 지원해 렌더링 성능 최적화가 쉽다.
        
    - **Zustand** 기본 사용법 🍠
        
        # **Zustand** 기본 사용법
        
        ---
        
        ### 1) Store 만들기
        
        ```tsx
        create 함수를 사용하여 상태값(state)과 상태를 변경하는 액션 함수들을 정의한 커스텀 훅을 생성한다. 이렇게 만들어진 훅(예: useStore)은 애플리케이션의 어떤 컴포넌트에서든 import하여 사용할 수 있다.생성해 둔 스토어 훅을 컴포넌트 내부에서 호출하여 필요한 상태값이나 액션 함수를 구조 분해 할당 등으로 가져와 사용한다. 별도의 설정 없이 훅을 부르는 것만으로 상태에 접근하거나 수정할 수 있어 매우 직관적이다.
        ```
        
        ### 2) 컴포넌트에서 사용하기
        
        ```tsx
        생성해 둔 스토어 훅을 컴포넌트 내부에서 호출하여 필요한 상태값이나 액션 함수를 구조 분해 할당 등으로 가져와 사용한다. 별도의 설정 없이 훅을 부르는 것만으로 상태에 접근하거나 수정할 수 있어 매우 직관적이다.
        ```
        
    - **Zustand**에서 중요한 개념 🍠
        
        # **Zustand**에서 중요한 개념
        
        ---
        
        ### 1) set 함수
        
        스토어 내부에서 상태를 업데이트할 때 사용하는 함수로, 새로운 상태 객체를 반환하거나 기존 상태와 병합(merge)하는 방식으로 동작한다. 현재 상태를 인자로 받는 콜백 함수를 사용할 수 있어 이전 상태를 기반으로 업데이트할 때 유용하다.
        
        ### 2) get 함수
        
        액션 함수 내부에서 현재의 최신 상태(state) 값을 조회해야 할 때 사용하는 함수이다. 주로 비동기 작업 내에서 현재 상태를 확인해야 하거나, 상태 값에 따라 분기 처리를 해야 하는 복잡한 로직에서 사용된다.
        
        ### 3) 선택적 구독 (selector)
        
        스토어의 전체 상태를 모두 가져오지 않고, useStore(state => state.count)처럼 필요한 데이터만 선택해서 구독하는 방식이다. 이렇게 하면 선택하지 않은 다른 상태가 변경되더라도 해당 컴포넌트는 리렌더링되지 않아 성능이 향상된다.
        
    - **Zustand** 객체 상태 관리 예시 🍠
        
        # **Zustand** 객체 상태 관리 예시
        
        ---
        
        ```tsx
        객체 형태의 상태를 관리할 때는 set 함수 내에서 스프레드 연산자(...)를 사용하여 불변성을 유지하며 업데이트한다. Zustand의 set은 기본적으로 얕은 병합(shallow merge)을 지원하므로 변경하려는 속성만 명시해도 되지만, 중첩 객체는 주의가 필요하다.
        ```
        
    - **Zustand** 비동기 로직 예시 🍠
        
        # **Zustand** 비동기 로직 예시
        
        ---
        
        **Zustand**에서는 비동기 API 호출도 간단하게 store 안에서 사용할 수 있어요.
        
        ```tsx
        Redux와 달리 별도의 미들웨어(Thunk 등) 설정 없이, 스토어 내부 액션 함수에 async/await를 직접 사용하여 비동기 작업을 처리한다. API 요청 후 응답을 받으면 그 시점에 set 함수를 호출하여 상태를 업데이트하는 방식이 매우 간단하다.
        ```
        
    - **Zustand** + Persist 미들웨어 🍠
        
        # **Zustand** + Persist 미들웨어
        
        ---
        
        **Zustand**는 미들웨어를 활용해 로컬스토리지 등에 상태를 저장할 수 있어요.
        
        ```tsx
        새로고침을 하더라도 데이터가 사라지지 않도록 로컬 스토리지나 세션 스토리지에 상태를 자동으로 저장하고 불러오는 기능을 제공한다. persist 미들웨어로 스토어 설정을 감싸고 고유한 이름(name)을 지정하면 간편하게 영구 저장을 구현할 수 있다.
        ```
        
    - **Zustand** + Immer 함께 쓰기 🍠
        
        # **Zustand** + Immer 함께 쓰기
        
        ---
        
        불변성 관리를 쉽게 하고 싶다면 Immer 미들웨어도 사용 가능해요.
        
        ```tsx
        복잡하게 중첩된 객체 구조의 상태를 업데이트할 때 불변성 관리를 편하게 하기 위해 Immer 미들웨어를 결합하여 사용할 수 있다. set 함수 안에서 produce 형식을 사용하면, 상태를 직접 수정(mutation)하는 문법으로 코드를 작성해도 안전하게 처리된다.
        ```
        
    - **Zustand** vs Context API 🍠
        
        # **Zustand** vs Context API
        
        ---
        
        Context API는 상태가 변경되면 해당 Provider 하위의 모든 소비 컴포넌트가 리렌더링될 위험이 있어 별도의 최적화가 필요하다. 반면 Zustand는 스토어가 외부에 존재하며 선택적 구독을 지원하기 때문에 변경된 데이터와 관련된 컴포넌트만 효율적으로 리렌더링된다.
        
- **React 전역 상태 관리 완벽 가이드 블로그** 읽고 개념 정리하기 🍠
    
    # **React 전역 상태 관리 완벽 가이드 블로그** 읽고 개념 정리하기  **🍠**
    
    ---
    
    [개발자 매튜 | React 전역 상태 관리 완벽 가이드: Context API vs Zustand vs Jotai](https://www.yolog.co.kr/post/global-state/)
    
    - **`Context API`**의 **`value 전체 구독 메커니즘`**과 **`Zustand`**의 **`selector 기반 구독`**의 성능 차이를 설명해보세요.
        
        상태 관리 라이브러리는 프로젝트의 규모와 해결하려는 문제(Prop Drilling, 잦은 상태 변경 등)에 따라 적절하게 선택해야 한다. 단순한 전역 상태 공유라면 Context API나 Zustand가 적합하고, 복잡한 비동기 로직과 상태 추적이 중요하다면 Redux 등을 고려한다.
        
    - **`Jotai`**의 **`atom`** 조합 방식이 파생 상태 관리에서 Zustand 대비 갖는 장점을 의존성 추적 관점에서 설명해보세요.
        
        상태 관리 라이브러리는 프로젝트의 규모와 해결하려는 문제(Prop Drilling, 잦은 상태 변경 등)에 따라 적절하게 선택해야 한다. 단순한 전역 상태 공유라면 Context API나 Zustand가 적합하고, 복잡한 비동기 로직과 상태 추적이 중요하다면 Redux 등을 고려한다.
        
    - 서버 상태를 **`useEffect`**로 관리할 때 발생하는 캐싱/중복 요청/불일치 문제를 설명해보세요.
        
        상태 관리 라이브러리는 프로젝트의 규모와 해결하려는 문제(Prop Drilling, 잦은 상태 변경 등)에 따라 적절하게 선택해야 한다. 단순한 전역 상태 공유라면 Context API나 Zustand가 적합하고, 복잡한 비동기 로직과 상태 추적이 중요하다면 Redux 등을 고려한다.
        
    

# 🍠 미션 1 - **Redux Toolkit 활용 UMC Play List 제작**

---

<aside>
🍠

이번 미션에서는 `Redux Toolkit`과 `TypeScript`, 그리고 `Tailwind CSS`를 활용해서

**전역 상태로 관리되는 장바구니(`Shopping Cart`) 화면**을 직접 구현하는 것이 목표예요.

단순히 컴포넌트 안에서만 상태를 관리하는 수준을 넘어서,

**전역 Store를 구성하고, Slice를 설계하고, 액션을 통해 상태를 변화시키는 흐름**까지 한 번에 경험해볼 수 있어요.

Mock 데이터 분리 → Redux 상태 초기값 설정 → 액션/리듀서 설계 → UI와 상태 연결까지

작은 규모지만 **리덕스 상태 관리의 전체 흐름을 맛볼 수 있는 미션**이에요.

> 📌 진행 방법 가이드
> 
> 1. 먼저 **`cartItems` Mock Data를 분리하고, TypeScript 타입을 직접 정의해보세요.**
>     - `constants/cartItems.ts` 파일을 만들고
>     - 음반 정보 구조를 타입으로 표현해보는 것부터 시작해 보세요.
> 2. 그 다음, **`Redux Toolkit`으로 `cartSlice`와 `store`를 직접 구성해보세요.**
>     - `increase`, `decrease`, `removeItem`, `clearCart`, `calculateTotals` 같은 액션들을
>         
>         어떻게 설계할지 스스로 고민해보는 과정이 중요해요.
>         
> 3. UI는 전부 **`Tailwind CSS`만 사용해서** 구현해보세요.
>     - 카드 리스트, 수량 조절 버튼, 전체 삭제 버튼, 총 수량/총 금액 섹션까지
>         
>         하나씩 Tailwind 클래스로 스타일링해 보면서 손에 익혀보면 좋아요.
>         
> 4. 강의나 예시는 **정답지가 아니라 힌트**라고 생각하고,
>     
>     **먼저 직접 구현해본 뒤에**
>     
>     “내가 짠 코드와 어떤 차이가 있는지”를 비교해보는 방식을 추천해요.
>     
>     이 과정이 실력을 가장 많이 키워줘요.
>     

**- UMC 중앙 웹 파트장 매튜/김용민 -** 

</aside>

### 🎥 강의 영상

https://youtu.be/mjGfXU4YsH8?si=51xSC8eJ-0PBEXhy

### 📸 완성 화면 (자세한 화면은 강의 영상을 참고해주세요)

---

**Navbar, Outlet**

![Screenshot 2025-04-26 at 5.56.11 PM.png](attachment:4c2940d1-3aa5-4627-9a46-059735a55ec9:Screenshot_2025-04-26_at_5.56.11_PM.png)

**Footer**

![Screenshot 2025-04-26 at 5.56.49 PM.png](attachment:43d7112a-93d2-4e19-9210-c1d96a5acf1f:Screenshot_2025-04-26_at_5.56.49_PM.png)

---

### 🧱 1. 기본 세팅 & Mock Data 분리

- [x]  `constants` 폴더를 만들고, 그 안에 `cartItems.ts` 파일을 생성해주세요.
- [x]  주어진 Mock-Data를 `cartItems.ts`에 넣고 이를 활용해주세요.
    - 음반 정보 Mock-Data 파일
        
        ```tsx
        const cartItems = [
          {
            id: 'recB6qcHPxb62YJ75',
            title: 'Vancouver',
            singer: 'BIG Naughty (서동현)',
            price: '25000',
            img: 'https://image.bugsm.co.kr/album/images/500/40752/4075248.jpg',
            amount: 1,
          },
          {
            id: 'recdRxBsE14Rr2VuJ',
            title: 'Empty Island',
            singer: 'greenblue',
            price: '18000',
            img: 'https://f4.bcbits.com/img/a1472100223_10.jpg',
            amount: 1,
          },
          {
            id: 'recwTo120XST3PIoW',
            title: 'golden hour',
            singer: 'JVKE',
            price: '28000',
            img: 'https://image.bugsm.co.kr/album/images/200/193874/19387484.jpg?version=20230503022513.0',
            amount: 1,
          },
          {
            id: 'rec1JZlfCIBOPdcT2',
            title: 'Home Sweet Home(From "어쩌면 우린 헤어졌는지 모른다")',
            singer: 'Gogang (고갱)',
            price: '20000',
            img: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/8d/d7/0f/8dd70fba-0a8f-b7ce-a2d2-f0d32dad2837/8809912894132.jpg/1200x1200bf-60.jpg',
            amount: 1,
          },
          {
            id: 'recwTo160XST3PIoW',
            title: 'Lemon',
            singer: 'Kenshi Yonezu(켄시 요네즈/米津 玄師)',
            price: '30000',
            img: 'https://image.bugsm.co.kr/album/images/200/7222/722272.jpg?version=20220514022202.0',
            amount: 1,
          },
          {
            id: 'recaBo120XST3PIoW',
            title: '돌멩이',
            singer: 'MASYTA (마시따)',
            price: '12000',
            img: 'https://image.bugsm.co.kr/album/images/200/3271/327113.jpg?version=20230606014806.0',
            amount: 1,
          },
          {
            id: 'recqBo123XST3PIoK',
            title: 'L’Amour, Les Baguettes, Paris',
            singer: '스텔라 장(Stella Jang)',
            price: '32000',
            img: 'https://image.bugsm.co.kr/album/images/200/40660/4066056.jpg?version=20211020003912.0',
            amount: 1,
          },
          {
            id: 'recqBo133XST3PIoK',
            title: 'NO PAIN',
            singer: '실리카겔',
            price: '22000',
            img: 'https://image.bugsm.co.kr/album/images/200/40790/4079061.jpg?version=20220826063340.0',
            amount: 1,
          },
          {
            id: 'recqBo145XST3PIoK',
            title: '너에게 (feat. HYUN SEO)',
            singer: 'Halsoon',
            price: '20000',
            img: 'https://image.bugsm.co.kr/album/images/200/204634/20463445.jpg?version=20230110013144.0',
            amount: 1,
          },
          {
            id: 'recqBo129XST3PIoK',
            title: '널 떠올리는 중이야(Think About You)',
            singer: 'PATEKO (파테코) , Jayci yucca(제이씨 유카)',
            price: '25000',
            img: 'https://image.bugsm.co.kr/album/images/200/40581/4058181.jpg?version=20210726063528.0',
            amount: 1,
          },
          {
            id: 'rdaqBo129XST3PIoK',
            title: '끝나지 않은 얘기(feat. 다이나믹 듀오)',
            singer: '릴러말즈 & TOIL',
            price: '23000',
            img: 'https://image.bugsm.co.kr/album/images/200/204692/20469237.jpg?version=20220827004220.0',
            amount: 1,
          },
          {
            id: 'rdaqBo149XQT3PIoK',
            title: '각자의 밤',
            singer: '나상현씨 밴드',
            price: '21000',
            img: 'https://image.bugsm.co.kr/album/images/200/202235/20223594.jpg?version=20230904194021.0',
            amount: 1,
          },
        ];
        
        export default cartItems;
        ```
        
- [x]  이 `cartItems`를 Redux 상태의 초기값으로 사용해주세요.

---

### 🎨 2. UI & 스타일링 규칙 (Tailwind CSS)

- [x]  전체 화면 레이아웃, 카드, 버튼, 텍스트 등을 **Tailwind CSS만 사용해서 구성해주세요.**
- [x]  음반 리스트, 수량 증가/감소 버튼, 전체 삭제 버튼, 총 수량 및 총 금액 UI를 Tailwind로 만들어주세요.

---

### 🧠 3. Redux Toolkit 기본 구조 만들기

### 3-1. Redux Store 생성

- [x]  `configureStore`를 사용해서 중앙 저장소(`store`)를 만들어주세요.
- [x]  `cartSlice`를 `store`의 `reducer`에 추가해주세요.

### 3-2. Provider 연결

- [x]  앱 전체를 `<Provider>`로 감싸 Redux Store를 연결해주세요.
- [x]  `<Provider store={store}>` 형태로 적용해주세요.
- [x]  설정 위치는 보통 `main.tsx` 또는 `index.tsx`에 배치해주세요.

---

### 🧺 4. cartSlice 설계

### 4-1. 초기 상태 정의

- [x]  `cartSlice` 파일을 생성해주세요.
- [x]  초기 상태에 다음 값을 포함해주세요:
    - `cartItems`: Mock 데이터
    - `amount`: 전체 수량
    - `total`: 전체 금액
- [x]  초기 렌더링 시 `amount`와 `total`이 자동 계산되도록 구성해주세요.

### 4-2. cart 관련 action들 정의

> 아래 모든 기능을 `cartSlice`의 `reducers`에 구현해주세요.
> 
1. **수량 증가 (`increase`)**
    - [x]  특정 음반의 `amount`를 +1 시키는 기능을 만들어주세요.
    - [x]  **`payload`**로 전달된 `id`를 가진 아이템만 증가시키도록 구현해주세요.
2. **수량 감소 (`decrease`)**
    - [x]  특정 음반의 `amount`를 -1 시키는 기능을 만들어주세요.
    - [x]  감소 결과가 1보다 작아지면 해당 아이템을 자동으로 제거해주세요.
3. **아이템 제거 (`removeItem`)**
    - [x]  특정 음반을 장바구니에서 완전히 제거하는 기능을 만들어주세요.
    - [x]  **`payload`**로 전달된 `id`를 가진 아이템만 제거해주세요.
4. **전체 삭제 (`clearCart`)**
    - [x]  장바구니의 모든 데이터를 전부 삭제하는 기능을 만들어주세요.
    - [x]  삭제 후, 수량과 금액도 0이 되도록 해주세요.
5. **전체 합계 계산 (`calculateTotals`)**
    - [x]  장바구니 전체 수량(`amount`)과 총 금액(`total`)을 계산하는 기능을 만들어주세요.
    - [x]  수량 증가/감소/삭제 등의 변화가 있을 때 자동으로 호출되도록 구성해주세요.

---

### 🖱️ 5. 컴포넌트와 Redux 상태 연결

- [x]  `useSelector`로 Redux의 `cartItems`, `amount`, `total`을 불러와 UI에 표시해주세요.
- [x]  `useDispatch`로 `increase`, `decrease`, `removeItem`, `clearCart`, `calculateTotals`를 호출해주세요.
- [x]  수량 버튼 클릭 시 dispatch 해주세요
- [x]  수량/금액이 변할 때마다 `calculateTotals`가 호출되도록 처리해주세요.

---

### ✅ 6. 최종 동작 점검 체크리스트

- [x]  장바구니에 Mock 데이터가 정상적으로 보이는지 확인해주세요.
- [x]  특정 아이템의 **`+`** 버튼 클릭 시:
    - [x]  해당 음반의 수량이 제대로 증가하는지 확인해주세요.
    - [x]  전체 수량과 총 금액이 즉시 반영되는지 확인해주세요.
- [x]  특정 아이템의 **`-`** 버튼 클릭 시:
    - [x]  해당 음반의 수량이 감소하는지 확인해주세요.
    - [x]  1 아래로 내려갈 경우 자동 삭제되는지 확인해주세요.
    - [x]  전체 수량과 금액이 정확히 줄어드는지 확인해주세요.
- [x]  `전체 삭제` 버튼 클릭 시:
    - [x]  모든 음반이 리스트에서 제거되는지 확인해주세요.
    - [x]  전체 수량/금액이 0으로 초기화되는지 확인해주세요.

### 🍠 미션 1. 제출

- 깃허브 주소 🍠
- 실행 영상 🍠

---

# 🍠 미션 2 - Modal Slice 활용하여, 모달 기능 추가

---

<aside>
🍠

이번 미션에서는 단순히 장바구니 데이터만 전역 상태로 관리하는 것을 넘어, **모달(Modal) 상태도 Redux Toolkit으로 전역 관리하는 경험**을 해보는 것이 핵심이에요.

일반적으로 모달은 쉽게 `useState`로도 만들 수 있지만, 이번에는 **Slice를 추가로 만들고**, **Store에 등록하고**, **Reducer 액션으로만 UI가 움직이는 구조**를 경험하는 것이 목적이에요.

즉, 모달 열고 닫기, **모달 내부에서 다른 Slice의 액션을 호출**하는 이 모든 흐름을 Redux 중심으로 설계해보는 미션이에요.

**- UMC 중앙 웹 파트장 매튜/김용민 -** 

</aside>

### 📸 완성 화면

---

아래 사진 처럼 **`전체 삭제`** 버튼을 클릭했을 때, 아래 영상과 같은 기능처럼 작동하게 만들어보세요!

![Screenshot 2025-04-26 at 5.57.58 PM.png](attachment:1683440c-1363-4681-b0a7-2181b6d6c16e:Screenshot_2025-04-26_at_5.57.58_PM.png)

### 📁 1. Slice 파일 분리

- [x]  `cartSlice`와 `modalSlice`를 **서로 다른 파일로 분리해서** 만들어주세요.
    
    (예: `features/cart/cartSlice.ts`, `features/modal/modalSlice.ts`)
    
- [x]  각각의 Slice를 `store`의 reducer에 별도로 등록해주세요.
    
    (예: `cart: cartReducer`, `modal: modalReducer`)
    

---

### 🪄 2. Modal Slice 제작

- [x]  모달을 켜고/끄는 상태 값을 `modalSlice`에서 관리해주세요.
    
    (예: `isOpen: false`)
    
- [x]  모달을 **열기(open)**, **닫기(close)** 위한 reducer 함수들을 만들어주세요.
    - `openModal()`
    - `closeModal()`
- [x]  컴포넌트에서는 **useState를 절대 사용하지 않고**,
    
    만든 reducer들을 dispatch 해서 모달을 제어해주세요.
    

---

### 🛠 3. Modal UI 기능 연동

- [x]  모달이 열렸을 때만 **전체 화면을 덮는 오버레이 레이어의 배경색**을 **어두운 반투명 색상**으로 보일 수 있게 설정해주세요.
- [x]  모달이 열려야 할 상황에서 `<Modal />` 컴포넌트가 화면에 보여지도록 구현해주세요.
- [x]  모달에서 **"아니요" 버튼**을 눌렀을 때
    
    → 모달이 닫히도록 `closeModal()`을 호출해주세요.
    
- [ ]  모달에서 **"네" 버튼**을 눌렀을 때
    
    → 장바구니 아이템을 모두 삭제하도록
    
    **기존에 만든 `clearCart()` action을 반드시 활용**해주세요.
    
    → 그리고 모달 창도 닫히도록 `closeModal()`도 함께 실행해주세요.
    

---

### 🔁 4. Reducer 중심의 상태 관리 확인

- [x]  모달의 모든 열림/닫힘 상태를 **Reducer로만** 제어했는지 확인해주세요.
- [x]  모달 UI 컴포넌트 내부 및 버튼에서 **useState를 사용하지 않았는지** 확인해주세요.
- [x]  모달 열림/닫힘에 관련된 로직이 모두 modalSlice에 존재하는지 다시 한번 점검해주세요.

---

### 🧪 5. 최종 동작 테스트

- [x]  모달 트리거 버튼을 누르면 모달이 정상적으로 등장하는지 확인해주세요.
- [x]  "아니요" 클릭 → 모달만 닫히는지 확인해주세요.
- [x]  "네" 클릭 → 모든 장바구니 목록이 삭제되며 모달이 닫히는지 확인해주세요.

---

### 🍠 미션 2. 제출

- 깃허브 주소 🍠
- 실행 영상 🍠

---

# 🍠 미션 3 - Redux Toolkit으로 만든 **UMC Play List를 Zustand로 리팩토링**

---

<aside>
🍠

이번 미션에서는 단순히 Redux Toolkit으로 전역 상태를 관리하던 구조에서 한 단계 더 나아가,

**UMC Play List를 Zustand로 전환해서 전역 상태를 관리하는 경험**을 해보는 것이 핵심이에요.

기존에는 Slice를 만들고 Store에 등록한 뒤, Action과 Reducer를 통해 상태를 변경했다면,

이번에는 **Zustand의 전역 Store를 직접 설계하고, 커스텀 훅 형태로 가져와 사용하는 방식**을 경험하게 될 거예요.

즉, 

- 플레이리스트(장바구니 역할) 상태를 Zustand로 관리하고,
- 모달(Modal)과 같은 UI 상태도 함께 Zustand Store에서 관리하면서,
- **한 Store 안에서 여러 상태와 액션을 묶어두고, 컴포넌트에서 필요한 것만 꺼내 쓰는 흐름**을 연습해보는 미션이에요.

Redux Toolkit으로 만들었던 전역 상태 관리 흐름을, 이번에는 **Zustand 스타일로 어떻게 풀어낼 수 있는지** 비교·체험해보는 데에 초점을 맞춰서 진행해보세요.

**- UMC 중앙 웹 파트장 매튜/김용민 -** 

</aside>

### 🎥 강의 영상

---

https://youtu.be/2oam8kJ40lY?si=4F_gz3nXhyO35Zap

### 1️⃣ Zustand 스토어 만들기

- [x]  새로운 Zustand 스토어를 하나 만들어주세요.
    
    (예: `create()`를 사용해서 전역 상태와 액션을 정의해주세요.)
    
- [x]  기존 Redux `cart` / `playlist` 상태에 담겨 있던 값들을 그대로 Zustand 스토어의 초기값으로 옮겨주세요.
- [x]  TypeScript를 사용 중이라면, Zustand 상태와 액션에 대한 타입을 직접 정의해 주세요.

---

### 2️⃣ Redux에서 사용하던 액션/리듀서 로직 옮기기

- [x]  기존 Redux Toolkit에서 사용하던 **증가 / 감소 / 삭제 / 전체 삭제 / 합계 계산** 등의 로직을 Zustand 스토어 안의 액션 함수들로 옮겨주세요.
- [x]  가능한 한 **동일한 의미의 함수 이름과 매개변수**를 유지해서, 컴포넌트 쪽 수정이 최소화되도록 설계해주세요.
- [x]  Redux Toolkit에서 `reducer` 안에 있던 “상태 변경 로직”을 이제는 `set((state) => { ... })` 형태로 잘 변환해 주세요.

---

### 3️⃣ 모달(Modal) 관련 상태도 Zustand로 전환하기

- [x]  기존에 Redux 또는 `useState`로 관리하던 모달의 열림/닫힘 상태를 Zustand 스토어로 옮겨주세요.
- [x]  “모달 열기 / 닫기”에 해당하는 동작을 별도의 액션 함수로 만들어주세요.
    
    (예: `open`, `close` 같은 이름으로 자유롭게 만들어주세요.)
    
- [x]  모달 안에서 다른 상태(예: 전체 삭제)와 연결되는 동작이 있다면, Zustand 액션 안에서 서로 잘 연동되도록 구성해 주세요.

---

### 4️⃣ 컴포넌트에서 Redux 흔적 지우고 Zustand로 연결하기

- [x]  기존에 사용하던 `useSelector`, `useDispatch` 관련 코드를 제거해주세요.
- [x]  대신, 직접 만든 Zustand 스토어 훅을 호출해서 **상태와 액션을 구조 분해 할당으로 가져와 사용**하도록 바꿔주세요.
    
    (예: `const { items, increase, decrease } = useXXXStore();` 같은 형태로 바꿔주세요.)
    
- [x]  Redux Provider, Store 설정 등이 더 이상 필요 없으므로, 관련 설정 코드를 깔끔하게 정리해 주세요.

---

### 5️⃣ 동작 동일성 확인하기

- [x]  Redux Toolkit으로 만들었을 때와 **화면 동작이 완전히 동일한지** 확인해주세요.
- [x]  개별 아이템의 수량 증가/감소, 삭제, 전체 삭제, 합계 계산 등이 이전과 동일하게 잘 동작하는지 확인해주세요.
- [x]  모달 열림/닫힘, “네 / 아니요” 시나리오가 Zustand 기반으로도 자연스럽게 동작하는지 확인해주세요.

---

### 🍠 미션 3. 제출

- 깃허브 주소 🍠
- 실행 영상 🍠

# 🍠 워크북 피드백

---

<aside>
💡

여러분들이 워크북을 학습하며 느낀 **좋았던 점**, **아쉬웠던 점**, **개선이 필요한 부분**을 자유롭게 남겨주세요.

여러분의 솔직한 의견은 다음 기수와 현재 진행하고 있는 웹 파트 스터디를 더 발전시키는 데 큰 힘이 됩니다. 🙌

**📌 설문 안내**

**제출 시점 :** 각 주차 워크북 학습을 마친 뒤 **반드시 제출**해주세요.

(제출하지 않으면 해당 주차 **워크북 미이수**로 간주됩니다.)

</aside>

[](https://forms.gle/PCLJq6NUn1qBd1Ha8)

# 🍠 코드 리뷰

---

<aside>
💡

워크북 하단에 아래 내용을 정리해 제출해 주세요. (제출용 폼은 추후 제공 예정)

1. **내가 리뷰한 내용**
    - 직접 리뷰한 코드 내용을 캡처하여 업로드 (**`GitHub Pull Request`** 캡처 권장)
2. **리뷰 반영 결과**
    - 받은 피드백을 반영한 개선된 코드와 그 캡처를 함께 업로드 (**`GitHub Pull Request`** 캡처 권장)

> 💬 아직 코드 작성을 하지 않은 경우
> 
> 
> 스터디 참여 인증 또는 워크북 피드백을 작성해 제출해 주세요.
> 
</aside>

- 내가 리뷰한 내용을 캡처해 업로드
    
    **예시**
    
    ![스크린샷 2025-09-05 오후 12.46.40.png](attachment:39549968-68c3-4416-b41f-423fd1f7fd79:스크린샷_2025-09-05_오후_12.46.40.png)
    
- 받은 리뷰를 반영하여 개선한 코드와 캡처 업로드
    
    **예시**
    
    ![스크린샷 2025-09-05 오후 12.47.34.png](attachment:01011e3f-c9fd-4041-bdd5-4da72a805955:스크린샷_2025-09-05_오후_12.47.34.png)
    

# 🥕 **React에서 Zustand가 선택받는 이유: 전역 상태 관리의 새로운 시대**

---

<aside>
🥕

**Zustand**는 간결한 API·초경량 번들·자동 최적화 덕분에 Redux를 빠르게 대체하며 React 전역 상태 관리의 새로운 표준으로 떠오르고 있어요.

2024~2025 트렌드에서도 사용률·만족도 모두 크게 상승하며, 특히 TanStack Query와 결합해 Server/Client 상태를 분리하는 현대적 상태 관리 패턴의 핵심 조합이 되었어요.

Redux는 엔터프라이즈급 프로젝트에서 여전히 강력하지만, 대부분의 신규 프로젝트와 중소규모 팀에서는 **Zustand가 더 쉽고 빠르고 효율적인 선택**이라는 흐름이 뚜렷하게 자리 잡았어요.

이러한 프론트엔드의 전역 상태 관리의 흐름을 한번 재미있게 정리해보았어요.

참고로, 이 글의 내용은 전부 **Perplexity**를 기반으로 정리했습니다.

</aside>

[**React에서 Zustand가 선택받는 이유: 전역 상태 관리의 새로운 시대**](https://www.notion.so/React-Zustand-2aeb57f4596b816684ece31bac187194?pvs=21)

# 🍠 학습 회고

---

<aside>
📢 이번 주차 워크북을 해결해보면서 어땠는지 **회고**해봅시다.

- **핵심 키워드**에 대해 완벽하게 이해했는지? 
- **이해한 점 - 어려운 점 (개선 방법) - 회고** 순서로 작성해주세요.
- **참고 자료**가 있다면 아래에 남겨주세요.

</aside>

- 📢 학습 회고 (예시, 서식만 복사하시고 지워주세요.)
    - **프론트엔드 배포, Vercel 활용**
        - **이해한 점**: Vercel은 프론트엔드 프로젝트를 **빠르고 간편하게 배포**할 수 있는 플랫폼입니다.
            
            GitHub 연동, 환경변수 설정, 커스텀 도메인 연결 등 배포 과정 대부분이 GUI와 CLI로 쉽게 처리되며, SPA 환경에서도 라우팅 문제를 `vercel.json` 설정으로 해결할 수 있습니다.
            
            - 예시:
                
                ```bash
                # CLI로 배포
                vercel         # Preview 배포
                vercel --prod  # Production 배포
                ```
                
                ```json
                // SPA 라우팅 문제 해결
                {
                  "routes": [
                    { "src": "/[^.]+", "dest": "/index.html", "status": 200 }
                  ]
                }
                ```
                
        - **어려운 점 (개선 방법)**: SPA 기반 프로젝트는 새로고침 시 404 문제가 발생할 수 있으며, 환경변수 관리, 커스텀 도메인 연결 과정이 처음에는 헷갈렸습니다.
            - 개선 방법: `vercel.json` 설정으로 SPA 라우팅 문제를 해결하고, Vercel Dashboard에서 환경변수와 DNS 설정을 직접 확인하면서 반복적으로 배포 실습을 진행했습니다.
            - 예시:
                
                ```tsx
                // 환경변수 사용
                const api = axios.create({
                  baseURL: import.meta.env.VITE_API_URL,
                  headers: { 'Content-Type': 'application/json' },
                });
                
                ```
                
        - **회고**: 실제 배포 과정을 경험해보니, 로컬 환경과 다른 실제 서비스 환경에서의 테스트 필요성을 이해할 수 있었습니다.
            
            앞으로 프로젝트를 진행할 때, GitHub 연동과 Vercel 배포를 활용해 **즉시 테스트 가능한 환경**을 만들고, SPA 라우팅 문제와 환경변수를 신경 써서 안정적으로 서비스를 운영할 수 있을 것 같습니다.
            
        
        ---
        
        ### 참고 자료
        
        [개발자 매튜 | 우리는 Vercel로 간다! 프론트엔드 배포 가이드](https://www.yolog.co.kr/post/vercel-deployment)
        

# 🤔 참고 자료

---

[useReducer – React](https://react.dev/reference/react/useReducer)

[Redux - A JS library for predictable and maintainable global state management | Redux](https://redux.js.org/)

[Getting Started | Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)

[Introduction to Immer | Immer](https://immerjs.github.io/immer/)

[Zustand](https://zustand-demo.pmnd.rs/)

[개발자 매튜 | React 전역 상태 관리 완벽 가이드: Context API vs Zustand vs Jotai](https://www.yolog.co.kr/post/global-state/)

# 🛡️ 저작권

---

**© 2025 [Kim Yongmin (Matthew)](https://www.youtube.com/@yongcoding). All rights reserved.**