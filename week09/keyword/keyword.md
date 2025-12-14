### 🍠 실습 1. 제출

- 깃허브 주소 🍠
    
    [9th_web/week09/mission/practice at main · dohyung001/9th_web](https://github.com/dohyung001/9th_web/tree/main/week09/mission/practice)
    
- 실행 영상 🍠
    
    ![image.png](attachment:1303522a-28c4-46cb-8297-1afd91a58a13:image.png)
    
- **useReducer** 학습 회고
    
    <aside>
    📢 이번 **useReducer** 실습을 해결해보면서 어땠는지 **회고**해봅시다.
    
    - **핵심 키워드**에 대해 완벽하게 이해했는지? 
    - **이해한 점 - 어려운 점 (개선 방법) - 회고** 순서로 작성해주세요.
    - **참고 자료**가 있다면 아래에 남겨주세요.
    
    </aside>

- **`Redux Toolkit`** 사용법을 공식문서를 보며 직접 정리해보기 🍠
    
    [Getting Started | Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
    
    - Provider
        
        React에서 Redux store를 사용하는 모든 컴포넌트에 접근 가능하게 만드는 최상위 Wrapper
        
        ```jsx
        import { Provider } from "react-redux";
        import { store } from "./store";
        
        export default function App() {
          return (
            <Provider store={store}>
              <YourRootComponent />
            </Provider>
          );
        }
        
        ```
        
    - configureStore
        
        :기존 Redux의 createStore + applyMiddleware + combineReducers를 **한 번에 처리하는 store 생성 함수**
        
        ```jsx
        import { configureStore } from "@reduxjs/toolkit";
        import userReducer from "./userSlice";
        import modalReducer from "./modalSlice";
        
        export const store = configureStore({
          reducer: {
            user: userReducer,
            modal: modalReducer,
          },
          middleware: (getDefault) => getDefault(), // thunk 포함
          devTools: true,
        });
        
        ```
        
    - createSlice
        
        :리듀서 함수 객체, 슬라이스 이름, 초기 상태 값을 받아들이고, 해당 액션 생성자와 액션 유형을 갖는 슬라이스 리듀서를 자동으로 생성합니다.
        "슬라이스(slice)"는 **상태 + reducer + actions**를 하나로 묶은 단위.
        
        ```jsx
        import { createSlice } from "@reduxjs/toolkit";
        
        const initialState = {
          name: "",
          isLogin: false,
        };
        
        const userSlice = createSlice({
          name: "user",
          initialState,
          reducers: {
            setName(state, action) {
              state.name = action.payload;
            },
            logout(state) {
              state.name = "";
              state.isLogin = false;
            },
          },
        });
        
        export const { setName, logout } = userSlice.actions;
        export default userSlice.reducer;
        
        ```
        
    - useSelector
        
        : Redux store의 상태를 가져오는 Hook.
        
        ```jsx
        import { useSelector } from "react-redux";
        
        const name = useSelector((state) => state.user.name);
        
        ```
        
    - useDispatch
        
        :Redux 액션을 실행시키는 Hook.
        
        ```jsx
        import { useDispatch } from "react-redux";
        import { setName } from "../store/userSlice";
        
        const dispatch = useDispatch();
        
        dispatch(setName("홍길동"));
        
        ```
        
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
        
    - 왜 **Zustand**를 사용할까요? 🍠
        
        # 왜 Zustand를 사용할까요?
        
        ---
        
    - **Zustand** 기본 사용법 🍠
        
        # **Zustand** 기본 사용법
        
        ---
        
        ### 1) Store 만들기
        
        ```tsx
        import { create } from 'zustand'
        
        const useBear = create((set) => ({
          bears: 0,
          increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
          removeAllBears: () => set({ bears: 0 }),
          updateBears: (newBears) => set({ bears: newBears }),
        }))
        ```
        
        ### 2) 컴포넌트에서 사용하기
        
        ```tsx
        function BearCounter() {
          const bears = useBear((state) => state.bears)
          return <h1>{bears} bears around here...</h1>
        }
        
        function Controls() {
          const increasePopulation = useBear((state) => state.increasePopulation)
          return <button onClick={increasePopulation}>one up</button>
        }
        ```
        
    - **Zustand**에서 중요한 개념 🍠
        
        # **Zustand**에서 중요한 개념
        
        ---
        
        ### 1) set 함수
        
        : store 내부에서 사용
        
        ```jsx
        set({ count: 10 });
        set((state) => ({ count: state.count + 1 }));
        ```
        
        ### 2) get 함수
        
        : store의 현재 상태에 즉시 접근
        
        ```jsx
        get().count; // 현재 count 값 읽기
        ```
        
        ### 3) 선택적 구독 (selector)
        
        :원하는 상태만 구독
        
        ```jsx
        const count = useCounterStore((state) => state.count);
        ```
        
    - **Zustand** 객체 상태 관리 예시 🍠
        
        # **Zustand** 객체 상태 관리 예시
        
        ---
        
        ```tsx
        // stores/useUserStore.ts
        import { create } from "zustand";
        
        interface User {
          name: string;
          age: number;
        }
        
        interface UserStore {
          user: User;
          setName: (name: string) => void;
          setAge: (age: number) => void;
        }
        
        export const useUserStore = create<UserStore>((set) => ({
          user: { name: "홍길동", age: 20 },
        
          setName: (name) =>
            set((state) => ({ user: { ...state.user, name } })),
        
          setAge: (age) =>
            set((state) => ({ user: { ...state.user, age } })),
        }));
        
        ```
        
    - **Zustand** 비동기 로직 예시 🍠
        
        # **Zustand** 비동기 로직 예시
        
        ---
        
        **Zustand**에서는 비동기 API 호출도 간단하게 store 안에서 사용할 수 있어요.
        
        ```tsx
        // stores/useTodoStore.ts
        import { create } from "zustand";
        
        interface TodoStore {
          todos: string[];
          loading: boolean;
          fetchTodos: () => Promise<void>;
        }
        
        export const useTodoStore = create<TodoStore>((set) => ({
          todos: [],
          loading: false,
        
          fetchTodos: async () => {
            set({ loading: true });
        
            const res = await fetch("https://jsonplaceholder.typicode.com/todos");
            const data = await res.json();
        
            set({
              todos: data.slice(0, 5).map((item: any) => item.title),
              loading: false,
            });
          },
        }));
        
        ```
        
    - **Zustand** + Persist 미들웨어 🍠
        
        # **Zustand** + Persist 미들웨어
        
        ---
        
        **Zustand**는 미들웨어를 활용해 로컬스토리지 등에 상태를 저장할 수 있어요.
        
        ```tsx
        import { create } from "zustand";
        import { persist } from "zustand/middleware";
        
        interface ThemeStore {
          theme: "light" | "dark";
          toggleTheme: () => void;
        }
        
        export const useThemeStore = create<ThemeStore>()(
          persist(
            (set) => ({
              theme: "light",
              toggleTheme: () =>
                set((state) => ({
                  theme: state.theme === "light" ? "dark" : "light",
                })),
            }),
            {
              name: "theme-storage", // localStorage key
            }
          )
        );
        
        ```
        
    - **Zustand** + Immer 함께 쓰기 🍠
        
        # **Zustand** + Immer 함께 쓰기
        
        ---
        
        불변성 관리를 쉽게 하고 싶다면 Immer 미들웨어도 사용 가능해요.
        
        ```tsx
        import { create } from "zustand";
        import { immer } from "zustand/middleware/immer";
        
        interface CounterStore {
          count: number;
          increase: () => void;
        }
        
        export const useCounterImmerStore = create<CounterStore>()(
          immer((set) => ({
            count: 0,
            increase: () => {
              set((state) => {
                state.count += 1; // Immer 덕분에 mutate 가능
              });
            },
          }))
        );
        
        // 원래
        set((state) => ({
          count: state.count + 1,
        }));
        // immer
        set((state) => {
          state.count += 1; // Immer가 자동으로 새로운 상태 생성
        });
        ```
        
    - **Zustand** vs Context API 🍠
        
        # **Zustand** vs Context API
        
        ---
        
        - Zustand는 **선택적 구독으로 리렌더링 성능이 매우 좋지만**,
        
        Context API는 **Provider 값이 바뀌면 하위 컴포넌트가 전부 리렌더링**된다.
        
        - Zustand는 **보일러플레이트가 거의 없고**,
            
            Context API는 **Provider·Reducer·별도 구조가 필요해 코드가 길어진다.**
            
        - Zustand는 **비동기 로직을 store 내부에서 바로 처리할 수 있지만**,
        - Zustand는 **Persist·Immer 같은 기능도 미들웨어로 쉽게 확장 가능하고**,