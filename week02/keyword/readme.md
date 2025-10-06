# 📝 학습 목표

---

- 리액트 사용 방법의 이해
    - `Vite`를 활용해 `React` + `TypeScript` 프로젝트를 초기 세팅할 수 있어요.
    - `JSX` 문법을 익히고, `리액트`가 어떻게 동작하는지 개념적으로 이해합니다.
- **상태 관리 기초 이해**
    - `useState`가 무엇인지, 어떤 상황에서 쓰는지 이해할 수 있어요.
    - 함수형 컴포넌트에서 가장 많이 사용하는 `useState`의 개념과 사용법을 익힙니다.
- **전역 상태 관리 이해**
    - `props drilling` 문제를 이해하고, `useContext`로 이를 어떻게 해결하는지 학습합니다.
- **상태 관리 패턴 선택 기준 학습**
    - 단순한 상태 전이는 `useState`로 충분하다는 것을 이해합니다.
    - 복잡한 상태 전이가 필요할 때 `useReducer`를 활용하여 로직을 깔끔하게 분리하는 방법을 경험합니다.

<aside>
💡 이번 주차는 **React의 기본 사용법과 상태 관리 패턴 선택 기준**을 배우는 시간이에요.
단순히 `useState`를 사용하는 데서 그치지 않고, 복잡한 상태 전이가 필요할 때 `useReducer`를 활용해 어떻게 로직을 깔끔하게 분리할 수 있는지 경험해 봅니다. 
한 번에 완벽히 외우려 하지 말고, 직접 실습하면서 차이를 몸으로 느껴보세요.

- UMC 중앙 웹 파트장 매튜/김용민 -

</aside>

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

# 🍠 React + TypeScript + Vite 초기 세팅 방법

---

<aside>
🍠

아래 핵심 키워드를 진행하시기 전에, 꼭 초기 세팅을 진행하고 해주세요!

</aside>

[React + TypeScript + Vite 초기세팅](https://www.notion.so/React-TypeScript-Vite-271b57f4596b8129a713e9d01f9aee7a?pvs=21)

# 🎯 핵심 키워드

---

<aside>
💡 주요 내용들에 대해 조사해보고, 자신만의 생각을 통해 정리해보세요!
레퍼런스를 참고하여 정의, 속성, 장단점 등을 적어주셔도 됩니다.
조사는 공식 홈페이지 **Best**, 블로그(최신 날짜) **Not Bad**

🍠 이모지가 달린 부분은, 여러분들이 직접 조사하여, 추가 작성하거나, 실습해보실 부분이니, 꼭 진행해주셔야 합니다!

</aside>

### **React 넌 어떻게 동작하니?**

- **React**의 동작 원리
    
    # React의 동작 원리
    
    - **SPA(Single Page Application)**란 무엇인가요?
        
        ## SPA (Single Page Application)란 무엇인가요?
        
        - **한 번 로드한 문서 안에서 화면을 갈아끼우며 동작하는 웹 앱**을 말해요. 페이지 이동 때마다 전체 HTML을 다시 받지 않고, **자바스크립트가 필요한 부분만 갈아끼워서 빠르게 반응**해요.
        - **장점**: 화면 전환이 빠르고, 앱처럼 자연스럽게 동작해요.
        - **주의점**: 첫 로드가 다소 무거울 수 있고, SEO(검색 노출)엔 별도 대비가 필요해요. 그래서 **SSR/SSG(서버 사이드 렌더링/정적 생성)** 같은 방식과 함께 쓰는 경우가 많아요.
        - React는 **SPA를 만들 때 뷰를 그리는 역할(UI Library)** 을 담당하고, 라우팅은 `react-router` 같은 **별도 라이브러리**를 함께 써요.
    - React는 “프레임워크”가 아니라 **“UI 라이브러리”**에요!
        
        ## React는 “프레임워크”가 아니라 “UI 라이브러리”에요!
        
        - React는 **화면(컴포넌트)** 만 책임지는 **작고 단단한 도구**에요.
        - 라우팅, 전역 상태, 데이터 패칭, 빌드/배포 등은 **원하는 도구를 조합**해서 쓰는 문화에요.
            - 예: 라우팅 `react-router`, 상태관리 `zustand`/`Redux`, 번들러 `Vite` 등등이요.
        - 덕분에 **유연성**이 높고, **프로젝트 성격에 가장 맞는 스택**을 골라 붙일 수 있어요.
    - **함수형 컴포넌트**와 **상태/속성의 흐름**을 이해해요!
        
        ## 함수형 컴포넌트와 상태/속성의 흐름을 이해해요
        
        - **함수형 컴포넌트**는 말 그대로 “함수”에요. **입력(props)** 을 받아 **출력(JSX)** 을 반환해요.
        - **상태(state)** 는 컴포넌트가 **기억해야 하는 값**이에요. `useState`로 만들고, **setter로 바꾸면 리렌더링을 트리거**해요.
        - **속성(props)** 은 **부모→자식으로 내려오는 읽기 전용 데이터**예요. 자식은 props를 수정하지 않아요.
        - **언제 리렌더링되나요?**
            - 내 state가 바뀔 때, 부모가 리렌더링되며 **새 props를 줄 때**, 구독한 **Context 값이 바뀔 때**, 또는 **key가 바뀔 때(완전 교체)** **리렌더링** 되요.
        - **불필요한 리렌더 줄이기**
            - `React.memo`(컴포넌트 메모), `useMemo`(값 메모), `useCallback`(함수 메모)로 **동일 입력 → 동일 출력**이면 건너뛰게 만들 수 있어요.
            - 단, 조기 최적화는 금물이고, **측정 후 필요한 곳에만** 적용하는 게 좋아요.
    - **Virtual DOM**과 **Diff(재조정) 원리**에요
        
        ## Virtual DOM과 Diff(재조정) 원리예요
        
        - **Virtual DOM**은 “화면의 설계도(스냅샷)”예요. 상태가 바뀌면 React가 **이전 설계도와 새 설계도를 비교(diff)** 해서 **바뀐 부분만 실제 DOM에 반영**해요.
        - 그래서 매번 전체를 갈아엎지 않고 **필요한 최소 조각만 업데이트**하니 빠르고 일관성 있게 동작해요.
        - **리스트 렌더링 시 `key`가 중요한 이유**
            - key는 **요소의 신분증**이에요. key가 안정적이면 React가 **이전/다음 항목을 정확히 매칭**해서 최소 변경만 해요.
            - 배열 인덱스를 key로 쓰면 **중간 삽입/삭제 때 오매칭**이 벌어질 수 있어, **고유한 id**를 권장해요.
    - **동시성 렌더링(Concurrent Rendering)으로 “부드럽게” 렌더링**해요
        
        ## 동시성 렌더링(Concurrent Rendering)으로 “부드럽게” 렌더해요
        
        - React 18부터 도입된 기능으로, 렌더링을 **작업 우선순위에 따라 쪼개어 처리**해요.
            - 예: 대용량 목록 계산보다 **사용자 입력 반응**을 먼저 처리해요.
        - **`startTransition` / `useTransition`**
            - 급하지 않은 상태 업데이트를 **전환(transition)** 으로 표시하면, React가 **사용자 입력을 우선 처리**하고 전환 작업은 여유 있게 처리해요.
        - **Suspense**
            - 컴포넌트가 데이터 로딩 등으로 “잠시 멈춤”이 필요하면 **대체 UI(fallback)** 를 잠깐 보여줘요.
            - **React 19 변경점**: 어떤 컴포넌트가 “suspend”되면 **가까운 Suspense의 fallback을 더 빨리 커밋**하고, 그 뒤에 멈춘 형제들을 렌더해 **느린 구간을 예열(pre-warm)** 해요. 화면 체감이 더 좋아졌어요. ([React](https://react.dev/blog/2024/04/25/react-19-upgrade-guide))
    - **React의 렌더링이 일어나는 조건**은 무엇인가요?
        
        ## React의 렌더링이 일어나는 조건을 한 번에 정리해요
        
        - **리렌더 트리거**
            1. 내 `setState` 호출, 2) 부모 리렌더 → 새 props 전달, 3) 구독한 `Context` 변경, 4) 내 `key` 변경(=언마운트/마운트)예요.
        - **렌더링 ≠ 실제 DOM 변경**
            - 렌더링 단계에서 **새 설계도(VDOM)** 를 만들고, **Diff 결과가 있을 때만 DOM 패치**가 일어나요.
        - **배칭(automatic batching)**
            - 이벤트 루프 안에서 여러 `setState`가 모이면 **한 번에 묶어** 렌더링해요(성능↑).
        - **StrictMode(개발 전용)**
            - **개발 모드에서만 일부 동작을 두 번 호출**해 “이상 징후”를 빨리 찾게 도와줘요(실서비스에 영향 없어요).
            - React 19에선 StrictMode에서의 **`useMemo`/`useCallback` 이중 호출 시 메모 결과 재사용** 등 개선이 있었어요. ([React](https://react.dev/blog/2024/04/25/react-19-upgrade-guide))
    - **React 19 최신 버전**에서 알아두면 좋은 변화들도 있어요!
        
        ## 7) React 19에서 알아두면 좋은 변화들도 있어요
        
        - **Actions(폼 액션)**: 폼을 제출하면서 **함수 호출 흐름을 간결하게** 만들 수 있는 새로운 패턴을 제공해요.
        - **새 훅과 DOM 개선**: 문서 메타데이터 관리, 웹 컴포넌트 호환, 에셋 로딩, 뷰 전환 API 연동 등이 강화됐어요.
        - **`ref`를 일반 prop처럼 전달**할 수 있게 바뀌었어요(새 JSX 트랜스폼 필요). 기존 `element.ref` 접근은 더는 권장되지 않아요. ([React](https://react.dev/blog/2024/12/05/react-19))
        - **Suspense 동작 개선**: 위에서 설명했듯 **fallback을 더 빨리** 보여줘요. ([React](https://react.dev/blog/2024/04/25/react-19-upgrade-guide))
        - **UMD 빌드 제거**: `<script>`로 쓸 땐 ESM CDN을 권장해요. ([React](https://react.dev/blog/2024/04/25/react-19-upgrade-guide))
        
        > 더 자세한 목록은 React 19 릴리스/업그레이드 가이드에 표로 잘 정리돼 있어요. (React)
        > 
    - **“리액트가 일하는 순서”**를 이해하기!
        
        ## “리액트가 일하는 순서”를 이해하기!
        
        1. **상태/props 변경 감지** →
        2. **렌더 단계**: 함수형 컴포넌트를 실행해 **새 JSX(=VDOM 설계도)** 생성 →
        3. **비교 단계**: 이전 VDOM과 **Diff** →
        4. **커밋 단계**: 바뀐 곳만 **실제 DOM 패치** & 브라우저 페인트 →
        5. **효과 실행**: `useEffect`/`useLayoutEffect` 정리 → 재실행 순서로 동작해요.
        
        이 흐름만 잡혀 있어도, “왜 지금 화면이 안 바뀌지?”, “왜 두 번 호출되지?” 같은 상황을 **원인-대응**으로 빠르게 추적할 수 있어요.
        
    - **실전에서 유용한 팁**
        
        ## 실전 팁 몇 가지예요
        
        - **리스트엔 안정적인 `key`** 를 써요(id 권장). 인덱스 key는 삽입/삭제에서 꼬일 수 있어요.
        - **이벤트 핸들러**는 가급적 **컴포넌트 바깥(혹은 `useCallback`)** 에서 정의해 **불필요한 재생성**을 줄여요.
        - **상태는 최소화**해요. 계산 가능하면 `useMemo`로 파생해 쓰고, 원본만 상태로 두는 게 좋아요.
        - **느린 업데이트**는 `startTransition`으로 표시해 **입력 반응성**을 지켜요.
        - **개발 모드 StrictMode의 이중 호출**은 버그를 찾기 위한 “일부러 흔들기”예요. 당황하지 말고 **부작용 코드**(예: 렌더 중 setState, 외부 변이)를 점검해요.
    
    ---
    
    ### 총 정리
    
    - React는 **UI 그리는 일에 특화된 라이브러리**예요.
    - **Virtual DOM + Diff** 로 **최소 DOM 변경**을 하며,
    - **동시성 렌더링/배칭/Suspense** 로 **부드럽고 똑똑하게** 화면을 업데이트해요.
    - **React 19**는 **Suspense 체감 개선**, **ref as prop**, **액션/폼 개선**, **JSX 트랜스폼 요구** 등 **일상 개발 품질**을 올려줘요. ([React](https://react.dev/blog/2024/12/05/react-19))
- **React**의 일반적인 폴더 구조
    
    # React의 일반적인 폴더 구조
    
    React 프로젝트는 **파일을 어떻게 나누느냐**에 따라 협업 효율과 유지보수성이 크게 달라져요.
    
    아래는 많은 프로젝트에서 참고하는 기본 구조에요.
    
    ```
    src/
     ┣ assets/
     ┣ components/
     ┣ pages/
     ┣ hooks/
     ┣ context/
     ┣ utils/
     ┣ types/
     ┣ apis/
     ┣ App.tsx
     ┗ main.tsx
    ```
    
    ---
    
    ## 1) assets/ (정적 파일)
    
    이미지, 아이콘, CSS 같은 정적 자산을 넣어요.
    
    ```
    src/assets/logo.png
    src/assets/global.css
    ```
    
    ---
    
    ## 2) components/ (공용 컴포넌트)
    
    재사용 가능한 작은 단위 UI 컴포넌트를 모아둬요.
    
    ```
    src/components/Button.tsx
    src/components/Modal.tsx
    ```
    
    ---
    
    ## 3) pages/ (페이지 단위 컴포넌트)
    
    라우팅과 연결되는 큰 화면 컴포넌트에요.
    
    ```
    src/pages/Login.tsx
    src/pages/Home.tsx
    ```
    
    ---
    
    ## 4) hooks/ (커스텀 훅)
    
    재사용 가능한 로직을 함수로 묶어둔 폴더에요.
    
    ```
    src/hooks/useAuth.ts
    src/hooks/useFetch.ts
    ```
    
    ---
    
    ## 5) context/ (전역 상태 관리)
    
    Context API로 전역 데이터를 관리해요.
    
    ```
    src/context/AuthContext.tsx
    src/context/ThemeContext.tsx
    ```
    
    ---
    
    ## 6) utils/ (유틸 함수 모음)
    
    자주 쓰이는 공통 함수를 넣는 곳이에요.
    
    ```
    src/utils/date.ts
    src/utils/formatter.ts
    ```
    
    ---
    
    ## 7) types/ (타입 정의)
    
    TypeScript 프로젝트라면 **타입 정의**를 모아두는 곳이에요.
    
    ```
    src/types/user.ts
    src/types/post.ts
    ```
    
    👉 여러 컴포넌트나 API에서 공통으로 쓰이는 타입을 관리하기 좋아요.
    
    ---
    
    ## 8) apis/ (API 요청 관리)
    
    서버와 통신하는 코드(axios, fetch 등)를 모아두는 곳이에요.
    
    ```
    src/apis/auth.ts     // 로그인, 회원가입 API
    src/apis/todo.ts     // ToDo 관련 API
    ```
    
    👉 API 코드를 따로 두면 **네트워크 요청과 UI 로직을 분리**할 수 있어서 깔끔해져요.
    
    ---
    
    ## 9) App.tsx
    
    앱의 뼈대(루트 컴포넌트) 역할을 해요.
    
    ---
    
    ## 10) main.tsx
    
    React 앱의 진짜 시작점이에요.
    
    여기서 `App.tsx`를 DOM에 붙여줘요.
    
    ---
    
    # 마지막으로 강조!
    
    여기서 정말 강조 드리고 싶은 부분은, **폴더 구조에는 “정답”이 없다는 점**이에요.
    
    프로젝트의 특성과 규모, 팀의 선호도, 유지보수 방식에 따라 자유롭게 설계할 수 있습니다.
    
    위에서 소개한 구조는 많은 개발자들이 참고하는 **일반적인 예시**일 뿐이고,
    
    가장 중요한 건 **팀원들과 소통하여 진행하는 프로젝트에 맞는 구조를 정하는 것**이에요.
    

---

### JSX 문법에 대해 배워보자! (단, tsx를 곁들인..) 🍠

- JSX 사용시 유의 사항 (기초) 🍠
    - JSX는 반드시 하나의 태그만 반환해야 한다.
        
        ## JSX는 반드시 하나의 태그만 반환해야 한다
        
        React 컴포넌트에서 JSX를 반환할 때는 **무조건 하나의 부모 태그**로 감싸야 해요.
        
        ---
        
        ### **⭕ 가능한 경우**
        
        ```tsx
        function App() {
          return (
             <strong>상명대학교</strong>
          )
        }
        export default App
        ```
        
        ### **❌ 불가능한 경우**
        
        ```tsx
        function App() {
          return (
             <strong>상명대학교</strong>
             <p>매튜/김용민</p>
          )
        }
        export default App
        ```
        
        ---
        
        <aside>
        🍠
        
        그러면, 위와 같이 **여러 개의 태그를 동시에 반환하려고 할 때**는 어떻게 해야 할까요?
        
        </aside>
        
        - 답변 🍠
            
            ```jsx
            // 코드 아래 첨부
            
            React Fragment 사용하기
            ```
            
            <aside>
            🍠
            
            이유: **React Fragment**는 불필요한 태그 없이 여러 요소를 묶을 수 있도록 도와주는 기능입니다. DOM에 추가 노드를 생성하지 않기 때문에 더 깔끔한 코드를 만들 수 있어 **가장 권장되는 방식**입니다.
            
            </aside>
            
        - 해설
            
            ```jsx
            function App() {
              return (
                 <>
                  <strong>상명대학교</strong>
                  <p>매튜/김용민</p>
                 </>
              )
            }
            
            export default App
            
            ```
            
            많은 분들이 `<> 빈 태그(Fragment)`의 존재를 잘 모르시는 경우가 있어요.
            
            여러 개의 태그를 반환해야 하지만, 특별히 **스타일링이나 레이아웃을 위해 부모 태그가 필요하지 않을 때**, 굳이 불필요한 `<div>` 같은 태그를 추가할 필요가 없어요.
            
            이럴 때는 `<> </>` **Fragment**를 사용하면, **추가적인 DOM 요소 없이** 여러 태그를 묶어서 반환할 수 있습니다.
            
            즉, 화면에는 불필요한 태그가 생기지 않고 코드도 훨씬 깔끔해져요.
            
    - React에서 스타일링 방법
        
        ### React에서 스타일링 방법
        
        ---
        
        ### 1. `className`을 활용한 스타일링
        
        HTML에서는 **`class`**를 쓰지만, React의 JSX에서는 **`className`**을 사용해야 해요.
        
        ```tsx
        import './App.css'
        
        function App() {
          return (
             <>
              <strong className='school'>상명대학교</strong>
              <p>매튜/김용민</p>
             </>
          )
        }
        
        export default App
        ```
        
        위 코드에서 `App.tsx` 상단에 `./App.css` 파일을 불러오고 있죠.
        
        이제 `App.css` 안에 스타일을 아래처럼 작성해줍니다.
        
        ```css
        .school {
          background-color: blue;
          color: white;
          font-size: 10rem;
        }
        ```
        
        ![스크린샷 2025-09-11 오후 6.07.44.png](attachment:cb7f1e68-239d-4bf6-a63a-120dcfc567d2:스크린샷_2025-09-11_오후_6.07.44.png)
        
        ---
        
        ### 2. Inline 스타일링을 활용한 방법
        
        JSX에서는 `style` 속성을 객체 형태로 작성해야 합니다.
        
        즉, **중괄호를 두 번** 쓰고, CSS 속성은 **카멜 표기법**을 따라야 해요.
        
        ```tsx
        import './App.css'
        
        function App() {
          return (
             <>
              <strong className='school'>상명대학교</strong>
              <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>매튜/김용민</p>
             </>
          )
        }
        
        export default App
        ```
        
        ---
        
        **중괄호를 두 번 쓰는 이유**
        
        1. 바깥쪽 `{}` → 자바스크립트 문법임을 알려줍니다.
        2. 안쪽 `{}` → 자바스크립트의 객체임을 의미합니다.
        
        ---
        
        **HTML과 JSX 비교**
        
        ```html
        <!-- HTML 방식 (케밥 표기법) -->
        <div style="background-color: purple">
          고구마
        </div>
        ```
        
        ```jsx
        // JSX 방식 (카멜 표기법)
        <div style={{backgroundColor: 'purple'}}>
          고구마
        </div>
        ```
        
        ---
        
        ### 3. 로컬 변수(local variable) 선언
        
        컴포넌트 안에서 변수를 선언하고 JSX 안에서 활용할 수 있어요.
        
        ```tsx
        import './App.css'
        
        function App() {
          return (
             <>
              <strong className='school'>상명대학교</strong>
              <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>매튜/김용민</p>
             </>
          )
        }
        
        export default App
        
        ```
        
        여기서 `"매튜"`라는 문자열을 직접 쓰는 대신, `nickname`이라는 변수를 만들어서 사용해보겠습니다.
        
        ```tsx
        import './App.css'
        
        function App() {
          const nickname = '매튜'
          return (
             <>
              <strong className='school'>상명대학교</strong>
              <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>nickname/김용민</p>
             </>
          )
        }
        
        export default App
        
        ```
        
        만약 `"매튜/김용민"`을 그대로 `"nickname/김용민"`이라고 쓰면 단순 문자열로 인식돼요.
        
        변수의 값을 출력하려면 **중괄호 `{}`**를 사용해야 합니다.
        
        ```tsx
        import './App.css'
        
        function App() {
          const nickname = '매튜'
          return (
             <>
              <strong className='school'>상명대학교</strong>
              <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>
                {nickname}/김용민
              </p>
             </>
          )
        }
        
        export default App
        
        ```
        
        이제 `nickname` 안의 값을 바꾸면 화면에 표시되는 내용도 같이 바뀌는 걸 확인할 수 있어요.
        
- TSX 사용시 유의 사항 (심화) 🍠
    - 문자열과 함께 변수 사용하기
        
        ### 문자열과 함께 변수 사용하기
        
        **`중괄호 {}`**와 **`백틱( ` )`**을 활용해서, 문자열과 변수를 함께 사용할 수 있어요.
        
        아주 자주 쓰는 패턴이라 꼭 익숙해지시면 좋아요!
        
        ```tsx
        import './App.css'
        
        function App() {
          const nickname = '매튜'
          const sweetPotato = '고구마'
          return (
             <>
              <strong className='school'>상명대학교</strong>
              <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>{nickname}/김용민</p>
              <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
             </>
          )
        }
        
        export default App
        ```
        
        ![스크린샷 2024-09-09 오후 5.16.19.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/da56da7b-3210-4644-b4fd-4872afd15bad/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.16.19.png)
        
    - 배열의 요소를 나타내는 방법
        
        ### 2. 배열의 요소를 나타내는 방법
        
        배열의 각 요소를 화면에 그리려면 **`map`**을 활용해요.
        
        **`map`**이 낯설다면 JS 워크북을 다시 보시거나 간단히 구글링해 보셔도 좋아요!
        
        ```tsx
        import './App.css'
        
        function App() {
          const nickname = '매튜'
          const sweetPotato = '고구마'
          const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE']
          return (
             <>
              <strong className='school'>상명대학교</strong>
              <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>{nickname}/김용민</p>
              <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
              <ul>
                {array.map((yaho, idx) => {
                  return <li key={idx}>{yaho}</li>
                })}
              </ul>
             </>
          )
        }
        
        export default App
        ```
        
        **`map`**은 각 요소(**`yaho`**)를 받아서 새 값을 반환해요.
        
        **`중괄호 {}`** 블록을 쓰면 **반드시 `return`**을 적어야 화면에 보여져요.
        
        ```tsx
        <ul>
          {array.map((yaho, idx) => {
            return <li key={idx}>{yaho}</li>
          })}
        </ul>
        ```
        
        소괄호 **`()`**를 쓰면 **`return`**을 생략할 수 있어요.
        
        ```tsx
        <ul>
          {array.map((yaho, idx) => (
             <li key={idx}>{yaho}</li>
          ))}
        </ul>
        ```
        
        `map`을 쓸 때는 **반드시 `key` props**를 넣어야 해요. `key`는 각 원소의 **고유값**이어야 하고요.
        
        예제에서는 임시로 `index`를 썼지만, 실제 앱에서는 **서버에서 내려주는 고유 `id`**를 쓰는 걸 권장해요.
        
        변수 이름은 자유예요. 다만 가독성을 위해 **복수/단수**를 구분하면 좋아요.
        
        ```tsx
        // 복수/단수 네이밍을 권장해요
        const numbers = [1, 2, 3, 4, 5]
        
        numbers.map((number, index) => {
          return <li key={index}>{number}</li>
        })
        ```
        
        ![스크린샷 2024-09-09 오후 5.27.56.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/7a3741ba-5f49-4af9-95a1-0c773825accf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.27.56.png)
        
- 첫 컴포넌트 만들어보기 🍠
    
    ### 첫 컴포넌트 만들어보기
    
    `React`에서는 컴포넌트로 UI를 재사용 가능한 조각들로 나눠서 각각 관리할 수 있어요.
    
    위에서 순서를 따라오셨다면, 현재 코드는 아래와 같아요.
    
    ```tsx
    import './App.css'
    
    function App() {
      const nickname = '매튜'
      const sweetPotato = '고구마'
      const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE']
      return (
         <>
          <strong className='school'>상명대학교</strong>
          <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>{nickname}/김용민</p>
          <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
          <ul>
            {array.map((yaho, idx) => (
               <li key={idx}>{yaho}</li>
            ))}
          </ul>
         </>
      )
    }
    
    export default App
    ```
    
    이제 `yaho`를 렌더링하던 `<li>` 부분을 **`List` 컴포넌트**로 분리해볼게요.
    
    ```tsx
    <li key={idx}>{yaho}</li>
    ```
    
    **`src` 폴더** 안에 **`components`** 폴더를 만들고, 그 안에 **`List.tsx`** 파일을 생성해줘요.
    
    ![스크린샷 2025-09-12 오전 6.41.08.png](attachment:55194880-e733-433d-912c-60fb64c80e41:스크린샷_2025-09-12_오전_6.41.08.png)
    
    > 우리가 궁극적으로 만들 모습은 아래와 같아요.
    > 
    
    ![스크린샷 2024-09-09 오후 5.37.05.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/e20d1131-591b-4581-802f-03a75ebb4fa2/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.37.05.png)
    
    `App.tsx`에서 `List`를 불러와서 교체해줘요.
    
    ```jsx
    import './App.css'
    // 1) List 컴포넌트를 import해요.
    import List from './components/List';
    
    function App() {
      const nickname = '매튜'
      const sweetPotato = '고구마'
      const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE']
      return (
         <>
          <strong className='school'>상명대학교</strong>
          <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>{nickname}/김용민</p>
          <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
          <ul>
            {array.map((yaho, idx) => (
              // 2) <li key={idx}>{yaho}</li> → <List />로 교체해요.
              <List />
            ))}
          </ul>
         </>
      )
    }
    
    export default App
    
    ```
    
    컴포넌트는 props로 데이터를 전달받을 수 있어요.
    `map`으로 반복 렌더링한 요소들이 있으면, React는 **"어떤 요소가 추가/삭제/변경되었는지"를 구분**해야 합니다. 
    
    이를 위하여 `key`가 필요하니, `List`에도 `key`를 넘겨줄게요.
    
    ```tsx
    <List key={idx} />
    ```
    
    그리고 각 항목의 텍스트도 넘겨야 하니, 의미 있는 이름으로 **`tech`**라는 props로 전달할게요.
    
    ```tsx
    <List key={idx} tech={yaho} />
    ```
    
    이 상태에서 실행해보면 아직 `List`가 아무것도 반환하지 않아서 화면에 안 보여요.
    
    ![스크린샷 2024-09-09 오후 5.41.47.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/7bd5e857-40f6-401f-b9fa-178e46ce149e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.41.47.png)
    
    ```tsx
    const List = () => {
      return (
        <>
          
        </>
      )
    }
    
    export default List
    ```
    
    전달된 props를 확인해볼게요.
    
    ```tsx
    const List = (props) => {
      console.log(props)
      return (
        <>
          
        </>
      )
    }
    
    export default List
    ```
    
    개발할 때는 **`console.log()`**로 값을 수시로 확인하는 습관이 좋아요.
    
    브라우저에서 **Chrome → F12** 개발자도구를 열어 `props`를 확인해보세요.
    
    ![스크린샷 2024-09-09 오후 5.43.17.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/99ecfc9e-0a76-462f-8174-a3fd8a0a6a41/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.43.17.png)
    
    `<List key={idx} tech={yaho} />`로 넘겼으니 `{ tech: 'REACT' }` 같은 형태가 보여요.
    
    이 말은 값을 쓸 때 **`{tech}`가 아니라 `{props.tech}`**로 접근해야 한다는 뜻이에요.
    
    ```tsx
    // props를 직접 사용해요.
    const List = (props) => {
      return (
        <li>
          {props.tech}
        </li>
      )
    }
    
    export default List
    ```
    
    ![스크린샷 2024-09-09 오후 5.46.22.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/765780fd-dd7d-483a-a8c4-cba2f856fae9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.46.22.png)
    
    <aside>
    ⚠️
    
    잘 따라오셨다면, `List.tsx`에서 이런 에러가 발생할거에요!! 일단은 뒤에서 우리가 해당 에러를 어떻게 해결하는지 배워볼 예정이니 무시하고 넘어가주세요!
    
    ![스크린샷 2025-09-12 오전 6.45.58.png](attachment:a067cd30-2ae3-4ec0-ab34-5dc268ee5426:스크린샷_2025-09-12_오전_6.45.58.png)
    
    </aside>
    
    다만, props가 많아지면 `props.tech`, `props.name`처럼 계속 적기 번거로워요.
    그래서 우리가 이전에 핸드북 자바스크립트때 학습한 **구조 분해 할당**을 쓰면 코드가 훨씬 깔끔해져요.
    
    <aside>
    🍠
    
    여러분들이, 직접 한번 구조분해 할당을 활용해서 어떻게 깔끔하게 코드를 작성할 수 있을지 고민해보세요!! 
    저는 두가지 방식이 크게 떠오르는데요, 여러분들이 생각하는 방식으로 한번 해결해보세요! 저는 해설로 한번 저의 생각을 공유드릴테니 여러분들도 한번 직접 고민해보세요
    
    </aside>
    
    - 구조분해 할당 활용
    - 해설 🍠
        
        **방식 1) 매개변수에서 바로 구조 분해해요.**
        
        ```tsx
        const List = ({ tech }) => {
          return <li>{tech}</li>
        }
        
        export default List
        ```
        
        ---
        
        **방식 2) 함수 내부에서 구조 분해해요.**
        
        ```tsx
        const List = (props) => {
          const { tech } = props
          return <li>{tech}</li>
        }
        
        export default List
        ```
        
    
    ---
    
    이제 한번, 스타일링을 해볼려고해요.
    
    일단은 저는 먼저 리스트 점(•)이 거슬리기에 이를 인라인 스타일을 활용하여 제거할려고해요.
    
    ```tsx
    const List = ({ tech }) => {
      return (
        <li style={{ listStyle: 'none' }}>
          {tech}
        </li>
      )
    }
    
    export default List
    ```
    
    여기까지가 컴포넌트 분리·스타일링의 기본 흐름이에요. 구조 분해 할당으로 가독성도 챙길 수 있어요.
    
    ---
    
    ![Screenshot 2025-02-16 at 5.48.19 PM.png](attachment:9b137465-7bf2-400f-8ee8-6c1aca8e93a8:Screenshot_2025-02-16_at_5.48.19_PM.png)
    
    이제 **TypeScript** 관점에서 중요한 차이가 등장해요.
    우리는 `array`를 `map`으로 돌면서 `List`에 값을 넘기고 있어요.
    
    ```tsx
    const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE'];
    ```
    
    `array.map((yaho) => <List tech={yaho} />)`에서 `yaho`는 **string** 타입이에요.
    JS였다면 틀린 타입을 넘겨도 바로 에러가 안 날 수 있지만, TS는 **컴파일 단계에서** 막아줘요.
    
    ```tsx
    <List key={idx} tech={42} /> // ❌ TS 에러: tech는 string이어야 해요.
    ```
    
    그래서 `List`가 받는 **props 타입을 명확히 선언**해줘야 해요. 보통 **인터페이스**를 써요.
    
    ```tsx
    interface ListProps {
      tech: string;
    }
    
    // 구조 분해 할당 사용!
    const List = ({ tech }: ListProps) => {
      return (
        <li style={{ listStyle: 'none' }}>
          {tech}
        </li>
      )
    };
    
    export default List;
    ```
    
    ![스크린샷 2025-09-12 오전 7.05.40.png](attachment:c8dcb2db-c39f-4786-b203-83e165d325aa:스크린샷_2025-09-12_오전_7.05.40.png)
    
    이렇게 타입을 선언하면, 에디터에서 **타입 힌트**도 잘 나오고, 실수로 다른 타입을 넘기는 버그를 미리 방지할 수 있어요.
    
    ---
    
    ### 특정 문자열만 받을 수 있도록 제한하기
    
    보통 `interface`만으로는 구체적인 값 제한을 주기 어렵지만, `type`과 조합하면 **union 타입**을 활용해서 보다 엄격한 타입을 정의할 수 있어요.
    
    즉, **타입 별칭(`type`)과 인터페이스(`interface`)를 적절히 조합하면 안전하고 가독성 높은 타입 설계를 할 수 있어요.**
    
    참고로, 언제 **타입 별칭(`type`)과 인터페이스(`interface`)를 활용하는지에 대한** 저의 고민을 ****다룬 블로그 글을 **Chapter 01**에서 함께 확인하셨을 거에요.
    
    [개발자 매튜 | type vs interface 어떤 것을 사용해야 할까?](https://www.yolog.co.kr/post/ts-interface-type)
    
    지금은 `tech`라는 props가 단순히 `string` 타입이 아니라, 실제 사용하는 기술 스택만 받을 수 있도록 `유니온 타입`으로 제한했어요.
    
    ```tsx
    type Tech = 'REACT' | 'NEXT' | 'VUE' | 'SVELTE' | 'ANGULAR' | 'REACT-NATIVE';
    
    interface ListProps {
      tech: Tech;
    }
    
    const List = (props: ListProps) => {
      return (
        <li style={{ listStyle: 'none' }}>
          {props.tech === 'REACT' ? '고구마와 함께하는 리액트' : props.tech}
        </li>
      )
    };
    
    export default List;
    ```
    
    `tech: string`이 아니라, `'REACT' | 'NEXT' | ...` 처럼 **유니온 타입**으로 제한했기 때문에 안정성이 높아져요.
    
    → 잘못된 문자열을 props로 넘기면 TypeScript가 컴파일 단계에서 에러를 발생시켜요.
    
    ```tsx
    import './App.css';
    import List from './components/List';
    
    function App() {
        const nickname = '매튜';
        const sweetPotato = '고구마';
        const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE'];
        return (
            <>
                <strong className="school">상명대학교</strong>
                <p
                    style={{
                        color: 'purple',
                        fontWeight: 'bold',
                        fontSize: '3rem',
                    }}
                >
                    {nickname}/김용민
                </p>
                <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
                <ul>
                    {array.map((yaho, idx) => (
    		                // 'string' 형식은 'Tech' 형식에 할당할 수 없습니다.
                        <List key={idx} tech={yaho} />
                    ))}
                </ul>
            </>
        );
    }
    
    export default App;
    ```
    
    ![스크린샷 2025-09-14 오후 9.29.17.png](attachment:aff681d9-687a-4a7f-b1f9-1ec6339d1567:스크린샷_2025-09-14_오후_9.29.17.png)
    
    순서대로 잘 따라오셨다면 이런 에러가 발생할꺼에요.
    
    ---
    
    ### 왜 이런 에러가 발생할까요?
    
    우리가 작성한 코드를 보면, `array`는 단순히 문자열(string)들의 배열이에요.
    
    ![스크린샷 2025-09-14 오후 9.30.08.png](attachment:c6b791c8-841d-4324-a3e1-385dd5b9f738:스크린샷_2025-09-14_오후_9.30.08.png)
    
    겉으로 보기엔 `"REACT"`, `"NEXT"` 같은 값들이 들어가 있으니까 문제가 없어 보이죠.
    
    하지만 타입스크립트 입장에서는 단순히 **`"문자열들의 배열(string[])"`**로만 이해해요.
    
    그런데, `List` 컴포넌트는 이렇게 선언되어 있어요.
    
    ![스크린샷 2025-09-14 오후 9.30.58.png](attachment:f78f916e-6516-48db-af2c-d406c896602b:스크린샷_2025-09-14_오후_9.30.58.png)
    
    즉, **`tech`에는 string 전체가 아니라 특정 문자열만 들어와야 한다**고 명시했어요.
    그래서 타입스크립트는 `"string"`과 `"Tech"`가 불일치한다고 에러를 낸 거예요.
    
    ![스크린샷 2025-09-14 오후 9.31.37.png](attachment:9bd7e10d-8994-484f-9866-39ac923100e5:스크린샷_2025-09-14_오후_9.31.37.png)
    
    ---
    
    ### 해결 방법
    
    ### 1. 타입 단언(as) 활용하기
    
    일단은, 기존에 작성했던 List 컴포넌트에서의 type을 다른 컴포넌트에서 사용할 수 있게 export를 해줄게요.
    
    ![스크린샷 2025-09-14 오후 9.48.30.png](attachment:51f73600-d9b7-43c7-a7a1-e35eb4cf550b:스크린샷_2025-09-14_오후_9.48.30.png)
    
    ```tsx
    export type Tech =
      | 'REACT'
      | 'NEXT'
      | 'VUE'
      | 'SVELTE'
      | 'ANGULAR'
      | 'REACT-NATIVE';
    ```
    
    우리는 사실 `array` 안에 들어있는 값이 `'REACT' | 'NEXT' | ...` 중 하나라는 걸 알고 있어요.
    
    그렇다면 타입스크립트에게 이렇게 알려줄 수 있습니다.
    
    ```tsx
    import './App.css';
    import List, { type Tech } from './components/List';
    
    function App() {
      const nickname = '매튜';
      const sweetPotato = '고구마';
      const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE'];
    
      return (
        <>
          <strong className='school'>상명대학교</strong>
          <p
            style={{
              color: 'purple',
              fontWeight: 'bold',
              fontSize: '3rem',
            }}
          >
            {nickname}/김용민
          </p>
          <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
          <ul>
            {array.map((yaho, idx) => (
    	        // as를 통한 타입 단언
              <List key={idx} tech={yaho as Tech} />
            ))}
          </ul>
        </>
      );
    }
    
    export default App;
    
    ```
    
    즉, `yaho`는 무조건 `Tech` 타입이라고 단언하는 방식이에요.
    
    하지만 이 방식은 **실제 런타임에서 다른 문자열이 들어가도 타입체크가 무력화되는 위험**이 있어요.
    → 따라서, **되도록이면 `as`를 남발하는 건 지양**하는 게 좋아요.
    
    ---
    
    ### 2. `as const` 활용하기 (추천)
    
    더 안전한 방법은 **배열 자체를 상수처럼 취급**하게 만드는 거예요.
    
    ![스크린샷 2025-09-14 오후 9.50.00.png](attachment:40e29fb4-1678-45ec-842a-5d2221cf9849:스크린샷_2025-09-14_오후_9.50.00.png)
    
    ```tsx
    const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE'] as const;
    ```
    
    여기서 `as const`는 **리터럴 타입으로 고정**하라는 의미예요.
    
    - 그냥 작성하면
        
        ```tsx
        const array: string[]
        ```
        
        (단순히 문자열 배열)
        
    - `as const`를 붙이면:
        
        ```tsx
        const array: readonly ["REACT", "NEXT", "VUE", "SVELTE", "ANGULAR", "REACT-NATIVE"]
        ```
        
        ![스크린샷 2025-09-14 오후 9.37.20.png](attachment:10ea9d9f-8360-4469-9baa-3a0a54fc1f26:스크린샷_2025-09-14_오후_9.37.20.png)
        
        (배열 원소 하나하나가 `"REACT" | "NEXT" | ...` 라는 **리터럴 타입**으로 취급됨)
        
    
    즉, `array`의 값이 **정해진 문자열 중 하나**로 제한되니까 `Tech`와 완전히 호환돼요.
    
    ---
    
    ### 질문
    
    ![스크린샷 2025-09-14 오후 9.50.54.png](attachment:e946c246-f8b2-4e2c-87ef-3a4fbc4869a2:스크린샷_2025-09-14_오후_9.50.54.png)
    
    이런 식으로 한다면, 결괏값이 어떻게 예측되시나요?
    
    ---
    
    ### 예상 결과
    
    1. **`REACT`를 전달했을 때**
        - 조건문에 따라 `"고구마와 함께하는 리액트"`라는 문자열이 렌더링돼요.
        - 즉, `props.tech`가 `"REACT"`라면 특별한 문구로 대체되는 거예요.
        
        ```tsx
        <List tech="REACT" />
        ```
        
        → 결과:
        
        ```tsx
        고구마와 함께하는 리액트
        ```
        
    2. **다른 기술 스택(`NEXT`, `VUE`, `SVELTE`, `ANGULAR`, `REACT-NATIVE`)을 전달했을 때**
        - 조건문이 false가 되므로 그대로 해당 값이 출력돼요.
            
            ```tsx
            <List tech="NEXT" /> // VUE, SVELTE, ANGULAR, REACT-NATIVE도 동일
            ```
            
            → 결과:
            
            ```
            NEXT
            ```
            
    
    ![스크린샷 2025-09-12 오전 7.19.00.png](attachment:728ed5a2-d8ee-4e1e-8b3c-e6498324ce9b:스크린샷_2025-09-12_오전_7.19.00.png)
    
    ---
    
    마지막으로, 실제 개발에서는 `key={idx}` 대신 서버에서 내려주는 **고유 id**를 쓰는 걸 권장해요.
    
    삭제/정렬 같은 변경이 발생할 때 인덱스 키는 예기치 않은 리렌더 문제가 생길 수 있어요.
    
    여기까지 따라오셨다면, 여러분의 **첫 컴포넌트 분리 + 타입 지정**을 성공하신 거예요. 축하해요! 🎉
    

---

### 나의 첫 번째 React Hook (useState) 🍠

<aside>
🍠

리액트 함수 컴포넌트에서 가장 중요한 개념은 **Hook**이에요.

원래는 클래스 컴포넌트에서만 가능했던 **`state`**, **`ref`** 같은 핵심 기능들을

**함수형 컴포넌트**에서도 간단하게 쓸 수 있도록 만든 게 바로 **Hook**이에요.

오늘은 그중 가장 기본이자 많이 쓰이는 **`useState`**를 배워볼 거예요.

</aside>

- **useState** 기초 🍠
    
    ### useState 기초
    
    `useState`는 함수형 컴포넌트 안에서 **상태(state)**를 정의하고, 이 상태를 관리할 수 있게 해주는 훅이에요.
    
    가장 기본적인 사용법은 아래와 같아요.
    
    ```tsx
    import { useState } from 'react';
    
    // <> 안에는 초기값에 해당하는 타입을 넣어주면 돼요!
    // 초기값 자리에 1을 넣는 경우 → <number>
    // useState<number>(1)
    
    // 초기값 자리에 ['오', '타', '니']를 넣는 경우 → <string[]>
    // const [state, setState] = useState<string[]>(['오', '타', '니']);
    
    const [state, setState] = useState<초기값에 해당하는 타입>(초기값);
    ```
    
    - `useState`는 배열을 반환해요.
    - 첫 번째 원소는 **현재 상태 값(state)**, 두 번째 원소는 **상태를 변경하는 함수(setState)**예요.
    - `state`는 처음엔 `useState`의 괄호 안에 넣어준 초기값을 그대로 가지고 있어요.
    - `setState`를 호출하면 상태 값이 바뀌고, **상태가 바뀌면 React는 컴포넌트를 다시 렌더링해요.**
        
        → 이 원리를 꼭 이해해 두는 게 중요합니다!
        
    
    ---
    
    ### useState 실습 진행
    
    글로만 보면 와닿지 않으니까, 간단한 **카운터(counter)** 예제를 만들어볼게요.
    
    `App.tsx`를 아래처럼 수정해 주세요.
    
    ```tsx
    import { useState } from 'react';
    
    function App() {
      const [count, setCount] = useState<number>(0);
      return (
        <>
          <h1>{count}</h1>
        </>
      );
    }
    
    export default App;
    ```
    
    여기서 `count`의 초기값을 `0`으로 설정했으니, 웹을 실행하면 당연히 화면에는 `0`이 출력돼요.
    
    그럼 이제 버튼을 눌렀을 때 이 숫자를 증가시켜 볼게요.
    
    React에서는 JS의 `onclick`처럼 **`onClick` 이벤트 핸들러**를 제공해요.
    
    ```tsx
    import './App.css'
    import { useState } from 'react';
    
    function App() {
      const [count, setCount] = useState(0)
      return (
         <>
          <h1>{count}</h1>
          <button onClick={() => {}}>숫자 증가</button>
         </>
      )
    }
    
    export default App
    ```
    
    여기서 중요한 점은, **상태를 바꾸고 싶을 땐 반드시 `useState`가 반환해주는 두 번째 값(`setState`)을 사용해야 한다는 것**이에요.
    
    그래서 버튼 클릭 시 `setCount(count + 1)`을 실행해 줄게요.
    
    ```tsx
    import './App.css'
    import { useState } from 'react';
    
    function App() {
      const [count, setCount] = useState(0)
      return (
         <>
          <h1>{count}</h1>
          <button onClick={() => setCount(count + 1)}>숫자 증가</button>
         </>
      )
    }
    
    export default App
    ```
    
    ![스크린샷 2024-09-09 오후 6.24.59.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/5862b26a-8b90-4d41-86de-dc6801be00e9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.24.59.png)
    
    버튼을 누를 때마다 `setCount`가 실행돼서 `count` 값이 1씩 증가하고,
    
    React는 새로운 값으로 컴포넌트를 리렌더링해요. 그래서 화면에 증가된 값이 보이게 돼요.
    
- **useState** 심화 🍠
    
    ### useState 심화
    
    앞에서 `useState`의 기초를 다뤘다면, 이번에는 조금 더 깊이 들어가 볼게요.
    
    ---
    
    ### 1. 타입 추론과 제네릭
    
    `TypeScript`에서는 `useState`에 타입을 명시하지 않아도, 초기값을 보고 자동으로 타입을 추론해요.
    
    ```tsx
    const [count, setCount] = useState(0);
    // count → number로 추론됨
    setCount(5);       // ✅ 정상
    setCount("hello"); // ❌ 오류 (number 타입이라 문자열 불가)
    ```
    
    즉, **초기값이 명확하다면 타입을 생략해도 안전해요.**
    
    ---
    
    하지만 초기값이 `null`이나 `undefined`라면, 타입을 제대로 추론하지 못할 수 있어요.
    이때는 **제네릭**을 명시해 주는 게 좋아요.
    
    ```tsx
    const [value, setValue] = useState<string | null>(null);
    // 초기값이 null → 타입 추론 불가 → 직접 지정
    
    setValue("Hello"); // ✅ 정상
    setValue(123);     // ❌ 오류 (string | null 타입만 허용)
    ```
    
    ---
    
    ### 2. onClick 함수 분리하기
    
    간단한 예제에서는 `onClick={() => setCount(count + 1)}`로 써도 돼요.
    
    하지만 기능이 복잡해지면, 함수로 따로 분리하면 더 읽기 좋아요.
    
    ```tsx
    import './App.css'
    import { useState } from 'react';
    
    function App() {
      const [count, setCount] = useState(0)
    
      const handleIncreaseNumber = () => {
        setCount(count + 1)
      }
    
      return (
         <>
          <h1>{count}</h1>
          <button onClick={handleIncreaseNumber}>숫자 증가</button>
         </>
      )
    }
    
    export default App
    ```
    
    이제 `handleIncreaseNumber`만 봐도 “숫자를 증가시키는 함수구나” 하고 이해할 수 있죠.
    
    ---
    
    ### 3. setState를 여러 번 호출하면?
    
    아래 코드의 동작을 예측해볼까요?
    
    ```tsx
    import './App.css'
    import { useState } from 'react';
    
    function App() {
      const [count, setCount] = useState(0)
    
      const handleIncreaseNumber = () => {
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1)
      }
    
      return (
         <>
          <h1>{count}</h1>
          <button onClick={handleIncreaseNumber}>숫자 증가</button>
         </>
      )
    }
    
    export default App
    ```
    
    버튼을 누르면 **6씩 증가할 것 같지만, 실제로는 1만 증가해요.**
    
    **왜 그런 걸까? (Lexical Environment)**
    
    React는 상태를 즉시 업데이트하지 않아요.
    대신 함수가 실행될 당시의 상태(`count`)를 기억해 두고, 그 값으로 계산해요.
    
    즉, `handleIncreaseNumber` 안에서 `count`는 항상 **0으로 고정된 것처럼 동작**해요.
    
    ```tsx
    setCount(count + 1); // 0 + 1
    setCount(count + 1); // 0 + 1
    setCount(count + 1); // 0 + 1
    setCount(count + 1); // 0 + 1
    setCount(count + 1); // 0 + 1
    setCount(count + 1); // 0 + 1
    
    // 최종 결과: 1
    ```
    
    이건 자바스크립트의 **클로저**와 관련이 있어요.
    
    → 함수가 실행될 때의 **변수 환경(Lexical Environment)**을 기억하기 때문이에요.
    
    (참고: [MDN 클로저](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures))
    
    ![스크린샷 2024-09-09 오후 6.35.30.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/2bb27390-3b77-4ae1-9781-7713b9189b88/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.35.30.png)
    
    **해결 방법: setState의 함수형 업데이트**
    
    `setState`는 두 가지 방식으로 쓸 수 있어요.
    
    1. 직접 값을 업데이트
    
    ```tsx
    setCount(count + 1);
    ```
    
    1. **이전 상태 값을 인자로 받아서 업데이트**
    
    ```tsx
    setCount(prev => prev + 1);
    ```
    
    두 번째 방식이 바로 문제 해결의 핵심이에요!
    
    ```tsx
    import './App.css'
    import { useState } from 'react';
    
    function App() {
      const [count, setCount] = useState(0)
    
      const handleIncreaseNumber = () => {
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
      }
    
      return (
         <>
          <h1>{count}</h1>
          <button onClick={handleIncreaseNumber}>숫자 증가</button>
         </>
      )
    }
    
    export default App
    ```
    
    이제는 버튼을 한 번 누를 때마다 **6씩 증가**해요.
    
- **useState** 객체 상태 업데이트 🍠
    
    ### useState로 객체 상태 변화하기
    
    `useState`는 숫자뿐만 아니라 **객체 상태**도 관리할 수 있어요.
    
    하지만 객체는 **참조 타입**이기 때문에, 상태를 변경할 때 **얕은 복사**와 **깊은 복사** 개념을 이해하고 전개 연산자(`...`)를 잘 활용하는 게 중요합니다.
    
    ---
    
    - 얕은 복사
        
        ### 얕은 복사
        
        얕은 복사는 **한 단계까지만 복사**하는 방식이에요.
        
        복사된 객체는 원본 객체와 내부 참조를 공유하기 때문에, 중첩 객체가 있다면 원본도 같이 바뀔 수 있어요.
        
        ```tsx
        const [person, setPerson] = useState({
          name: "김용민",
          age: 26,
          nickname: "매튜"
        });
        
        const newPerson = { ...person }; // 얕은 복사
        newPerson.nickname = "야호";
        
        console.log(person.nickname); // "매튜" (원본은 그대로 유지)
        ```
        
    - 깊은 복사
        
        ### 깊은 복사
        
        깊은 복사는 **중첩된 값까지 전부 새로운 복사본**을 만드는 방식이에요.
        
        복사본을 수정해도 원본 객체에는 영향을 주지 않아요.
        
        ```tsx
        const newPersonDeep = JSON.parse(JSON.stringify(person)); // 깊은 복사
        ```
        
        - 장점: 원본과 완전히 독립된 객체가 생성됨
        - 단점: `undefined`, 함수 같은 값은 복사되지 않음 → 라이브러리(`lodash.cloneDeep`)를 쓰는 게 더 안전할 수 있어요.
    - 실습: **useState**로 객체 업데이트하기
        
        ### 실습: useState로 객체 업데이트
        
        ```tsx
        import { useState } from 'react';
        
        function App() {
          // 초기 상태: name, age, nickname, city를 가진 객체
          const [person, setPerson] = useState({
            name: '김용민',
            age: 26,
            nickname: '매튜',
            city: '', // city 키를 미리 넣어둬야 타입이 추론됨
          });
        
          // city 업데이트
          const updateCity = () => {
            setPerson((prevPerson) => ({
              ...prevPerson,   // 기존 상태 복사
              city: '서울',    // city 값만 덮어쓰기
            }));
          };
        
          // age 1 증가
          const increaseAge = () => {
            setPerson((prevPerson) => ({
              ...prevPerson,           // 기존 상태 복사
              age: prevPerson.age + 1, // age만 +1
            }));
          };
        
          return (
            <>
              <h1>이름: {person.name}</h1>
              <h2>나이: {person.age}</h2>
              <h3>닉네임: {person.nickname}</h3>
              {person.city && <h4>도시: {person.city}</h4>}
              <button onClick={updateCity}>도시 추가</button>
              <button onClick={increaseAge}>나이 증가</button>
            </>
          );
        }
        
        export default App;
        ```
        
        ![스크린샷 2024-09-09 오후 7.03.11.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/510e5b89-e5c0-4da9-baa6-01ad4d4ca7ab/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.03.11.png)
        

https://youtu.be/Rl6H2MyRBUk?si=ICkFPWbPhyhI2TOA

- **위의 영상을 보고 Lazy Initialization(게으른 초기화)**에 대해 설명해주세요 🍠
    
    무거운 계산이 필요한 초기값을 설정할 때, 그 계산을 맨 처음 딱 한 번만 실행하도록 해서 성능을 최적화하는 기법입니다.
    
- **App.tsx** 파일에 직접 카운터가 1씩 증가, 1씩 감소하는 기능을 만들어주세요 🍠
    - 직접 작성한 코드 **App.tsx** 파일을 올려주세요!
        
        
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
        
- 영상을 보고 실습을 하면서 몰랐던 개념들을 토글을 열어 정리해주세요 🍠

---

### 나의 두 번째 React Hook (useContext) 🍠

<aside>
🍠

React의**`useContext`**는 전역 상태 관리를 도와주는 훅이에요.

컴포넌트 간에 데이터를 주고받을 때, 일일이 **`props`**를 단계별로 전달하는 **props drilling 문제**를 해결해 줍니다.

즉, **어떤 값이나 상태를 최상위에서 한 번만 정의해 두고, 필요한 모든 하위 컴포넌트에서 바로 꺼내 쓸 수 있게 해주는 도구**라고 생각하면 돼요.

</aside>

- **props drilling**은 무엇인가요?
    
    # props drilling 문제점 이해하기
    
    리액트에서 컴포넌트 간 데이터를 주고받는 기본적인 방법은 **props에요.**
    
    그런데 컴포넌트 구조가 깊어지면, 실제로 필요하지 않은 컴포넌트까지 props를 억지로 내려줘야 하는 상황이 생겨요.
    
    이걸 props drilling이라고 해요.
    
    ---
    
    ## 1. props drilling이란?
    
    부모 → 자식 → 손자 컴포넌트로 데이터를 전달하려면 props를 계속 내려줘야 해요.
    
    - 문제는, 중간 컴포넌트는 그 데이터를 직접 쓰지 않는데도 단순히 다음 컴포넌트로 전달하기 위해 props를 받아야 해요.
    - 이런 방식은 불필요한 코드가 많아지고, 관리하기가 점점 어려워져요.
    
    ---
    
    ## 2. props drilling 예제
    
    **App.tsx**
    
    ```tsx
    import { useState } from 'react';
    import ButtonGroup from './components/ButtonGroup';
    
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
          <ButtonGroup
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </>
      );
    }
    
    export default App;
    ```
    
    **ButtonGroup.tsx**
    
    ```tsx
    interface ButtonGroupProps {
      handleIncrement: () => void;
      handleDecrement: () => void;
    }
    
    const ButtonGroup = ({
      handleIncrement,
      handleDecrement,
    }: ButtonGroupProps) => {
      return (
        <div>
          <button onClick={handleIncrement}>+1 증가</button>
          <button onClick={handleDecrement}>-1 감소</button>
        </div>
      );
    };
    
    export default ButtonGroup;
    ```
    
    지금은 `App`에서 상태를 관리하고, 그걸 바꾸는 함수를 `ButtonGroup`으로 내려주고 있어요.
    
    이런 구조는 간단해 보이지만, 컴포넌트가 많아지면 계속 props를 전달해야 해서 귀찮아져요.
    
    ---
    
    ### 3. Button 컴포넌트로 분리하기
    
    버튼 두 개를 보면 스타일은 같고 동작과 텍스트만 달라요.
    
    이럴 때는 **공용 컴포넌트**를 따로 만들어서 관리하는 게 좋아요.
    
    **Button.tsx**
    
    ```tsx
    interface ButtonProps {
      onClick: () => void;
      text: string;
    }
    
    const Button = ({ onClick, text }: ButtonProps) => {
      return <button onClick={onClick}>{text}</button>;
    };
    
    export default Button;
    ```
    
    **ButtonGroup.tsx**
    
    ```tsx
    import Button from './Button';
    
    interface ButtonGroupProps {
      handleIncrement: () => void;
      handleDecrement: () => void;
    }
    
    const ButtonGroup = ({
      handleIncrement,
      handleDecrement,
    }: ButtonGroupProps) => {
      return (
        <div>
          <Button onClick={handleIncrement} text="+1 증가" />
          <Button onClick={handleDecrement} text="-1 감소" />
        </div>
      );
    };
    
    export default ButtonGroup;
    ```
    
    이제 버튼을 재사용할 수 있어서 코드가 더 깔끔해지고 관리하기 쉬워져요.
    
    ---
    
    ### 4. props drilling의 문제점
    
    1. 컴포넌트가 많아질수록 관리하기 어려워져요.
    2. 중간 컴포넌트가 불필요한 props를 받아야 해요.
    3. 특정 props에 의존하게 되면서 재사용성이 떨어져요.
    
    ---
    
    ## 5. 해결 방법
    
    이런 문제를 해결하려고 나온 게 **useContext**에요.
    
    **useContext**를 쓰면 중간에 props를 전달하지 않아도 전역적으로 상태를 공유할 수 있어요.
    
- **useContext**란?
    
    ## useContext란?
    
    React의 `useContext`는 **전역 상태를 쉽게 공유**할 수 있도록 도와주는 Hook이에요.
    
    기존처럼 컴포넌트마다 일일이 props를 내려보내지 않아도, **여러 컴포넌트에서 같은 데이터를 바로 꺼내서 쓸 수 있어요.**
    
    즉, **props drilling 문제를 줄여주는 방법**이라고 이해하시면 돼요.
    
    ---
    
    또한 `useContext`는 단순히 전역 상태 관리뿐만 아니라, **의존성 주입(Dependency Injection, DI)** 역할도 해요.
    
    예를 들어, 공통적으로 쓰이는 API 클라이언트, 테마, 인증 정보 같은 것들을 **Context**로 감싸두면, 하위 컴포넌트 어디에서든 쉽게 주입받아 사용할 수 있어요.
    
    - **의존성 주입(Dependency Injection, DI)**에 대해서 관심있으신 분들은 아래 영상을 참고해봐도 좋아요!
        
        <aside>
        🍠
        
        물론, 저희는 이번 워크북에서 **의존성 주입(Dependency Injection, DI)**에 대해서 깊게 다루지는 않을 거예요.
        
        하지만, 그렇다고 해서 **DI가 프론트엔드에서는 쓰이지 않는다**고 오해하지는 않으셨으면 해요.
        
        DI는 원래 백엔드 프레임워크에서 많이 활용되는 개념이지만, React 같은 프론트엔드 개발에서도 많이 사용하는 패턴이에요.
        
        중요한 건, **다양한 언어와 프레임워크에서 자주 활용되는 좋은 패턴들을 꼭 백엔드 전용으로만 생각할 필요는 없다는 점**이에요.
        
        우리가 하고 있는 프론트엔드 React 개발에도 이점이 크다면, 단점보다 장점이 많다면, **충분히 한번 적용해볼 만한 가치가 있지 않을까요?.**
        
        </aside>
        
        https://youtu.be/dnvS2q6vKxw?si=1vJBSqBFE73xs4RX
        
    
    ---
    
    ## useContext 실습
    
    아래 예제는 앞에서 만든 “props drilling” 예제를 **useContext**로 단계적으로 바꿔보는 흐름으로 이어져요.
    
    지금까지 따라오셨다면, 현재 코드는 이렇게 돼요.
    
    - 현재 코드
        
        **App.tsx**
        
        ```tsx
        import { useState } from 'react';
        import ButtonGroup from './components/ButtonGroup';
        
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
              <ButtonGroup
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            </>
          );
        }
        
        export default App;
        ```
        
        **components/ButtonGroup.tsx**
        
        ```tsx
        import Button from './Button';
        
        interface ButtonGroupProps {
          handleIncrement: () => void;
          handleDecrement: () => void;
        }
        
        const ButtonGroup = ({
          handleIncrement,
          handleDecrement,
        }: ButtonGroupProps) => {
          return (
            <div>
              {/* <button onClick={handleIncrement}>+1 증가</button> */}
              {/* <button onClick={handleDecrement}>-1 감소</button> */}
              <Button onClick={handleIncrement} text='+1 증가' />
              <Button onClick={handleDecrement} text='-1 감소' />
            </div>
          );
        };
        
        export default ButtonGroup;
        ```
        
        **components/Button.tsx**
        
        ```tsx
        interface ButtonProps {
          onClick: () => void;
          text: string;
        }
        
        const Button = ({ onClick, text }: ButtonProps) => {
          return <button onClick={onClick}>{text}</button>;
        };
        
        export default Button;
        ```
        
        **폴더 구조**
        
        ![Screenshot 2025-02-16 at 7.55.13 PM.png](attachment:3b226907-fd6d-41e2-9865-1c2b1214362e:Screenshot_2025-02-16_at_7.55.13_PM.png)
        
    
    이 상태를 기준으로 `useContext`를 적용해볼게요.
    
    ---
    
    ## 1. Counter Provider 만들기
    
    `src` 폴더 안에 `context` 폴더를 만들고, `CounterProvider.tsx` 파일을 만들어요.
    
    ```tsx
    import { createContext, useContext, useState, ReactNode } from 'react';
    
    // Context의 타입 정의
    interface CounterContextType {
      count: number;
      handleIncrement: () => void;
      handleDecrement: () => void;
    }
    
    // Context 생성 (초기값은 undefined로 설정)
    export const CounterContext = createContext<CounterContextType | undefined>(
      undefined
    );
    
    // Context Provider 생성
    export const CounterProvider = ({ children }: { children: ReactNode }) => {
      const [count, setCount] = useState(0);
    
      const handleIncrement = () => setCount((prev) => prev + 1);
      const handleDecrement = () => setCount((prev) => prev - 1);
    
      return (
        <CounterContext.Provider
          value={{ count, handleIncrement, handleDecrement }}
        >
          {children}
        </CounterContext.Provider>
      );
    };
    ```
    
    여기서 핵심은 **Context 초기값을 `undefined`로 둬요.** 이렇게 해두면 Provider로 감싸지 않은 곳에서 실수로 `useContext`를 호출했을 때 타입 단계에서 경고를 줄 수 있어요.
    
    안전하게 쓰기 위해, 나중에 커스텀 훅에서 “Provider 안에서만 써야 해요”라고 **명확하게 에러를 던질** 수도 있어요.
    
    - ※ ****Fast refresh only works when a file only exports components. Move your React context(s) to a separate file. 에러가 뜨는데 이건 뭔가요?
        
        ![스크린샷 2025-09-14 오후 8.50.01.png](attachment:b28e7fa1-59fc-4e4d-b08b-3cb1d14c7542:스크린샷_2025-09-14_오후_8.50.01.png)
        
        이 경고(Fast refresh only works when a file only exports components)는 리액트 개발 도구의 편의 기능에 대한 안내일 뿐, 실제 코드 실행이나 학습에는 전혀 영향을 주지 않습니다.
        
        **처음 배우는 분들은 이 경고를 무시해도 괜찮아요!**
        
        나중에 프로젝트 구조를 더 잘 이해하게 되면, Context와 Provider를 분리하는 방법을 익혀도 충분합니다.
        
    
    ---
    
    ## 2. App.tsx에서 useContext 사용하기
    
    이제 `CounterContext`를 직접 꺼내서 쓸 수 있어요.
    
    ```tsx
    import { useContext } from 'react';
    import ButtonGroup from './components/ButtonGroup';
    import { CounterContext } from './context/CounterProvider';
    
    function App() {
      const context = useContext(CounterContext);
    
      return (
        <>
          <h1>{context?.count}</h1>
          <ButtonGroup
            handleIncrement={context?.handleIncrement}
            handleDecrement={context?.handleDecrement}
          />
        </>
      );
    }
    
    export default App;
    ```
    
    ![Screenshot 2025-02-16 at 8.18.34 PM.png](attachment:f4f18f80-e326-4aeb-8ea1-26185e0b84d9:Screenshot_2025-02-16_at_8.18.34_PM.png)
    
    여기서 “`context`가 없을 수도 있다”는 타입 경고를 볼 수 있어요.
    
    우리가 `createContext`의 초기값을 `undefined`로 설정했기 때문에, **`?`(옵셔널 체이닝)** 처리가 필요해요.
    
    또한, `ButtonGroup`과 `Button`의 props 타입도 **`?`를 붙여서** `undefined` 가능성을 반영해줘야 에러가 사라져요.
    
    ```tsx
    // ButtonGroup.tsx
    interface ButtonGroupProps {
      handleIncrement?: () => void;
      handleDecrement?: () => void;
    }
    
    // Button.tsx
    interface ButtonProps {
      onClick?: () => void;
      text: string;
    }
    ```
    
    ---
    
    ## 3. Provider 적용하기 (중요)
    
    지금 화면이 비어 보인다면, 아직 **Provider로 감싸지 않았기 때문**이에요.
    
    전역 상태를 쓰려면 **가장 바깥에서 `CounterProvider`로 감싸줘야 해요.**
    
    ```tsx
    // main.tsx
    import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';
    import './index.css';
    import App from './App.tsx';
    import { CounterProvider } from './context/CounterProvider.tsx';
    
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <CounterProvider>
          <App />
        </CounterProvider>
      </StrictMode>
    );
    ```
    
    ![Screenshot 2025-02-16 at 8.26.38 PM.png](attachment:f660fef6-589b-489b-b15d-f3cd0322ea3c:Screenshot_2025-02-16_at_8.26.38_PM.png)
    
    이제 화면이 정상적으로 보이고, 버튼을 눌러도 잘 동작돼요.
    
    ---
    
    ## 4. Context 안에 뭐가 들어있는지 확인해봐요
    
    `console.log`로 실제로 어떤 값이 들어오는지 확인해보면 이해가 빨라져요.
    
    ```tsx
    import { useContext } from 'react';
    import ButtonGroup from './components/ButtonGroup';
    import { CounterContext } from './context/CounterProvider';
    
    function App() {
      const context = useContext(CounterContext);
      console.log(context);
    
      return (
        <>
          <h1>{context?.count}</h1>
          <ButtonGroup
            handleIncrement={context?.handleIncrement}
            handleDecrement={context?.handleDecrement}
          />
        </>
      );
    }
    
    export default App;
    ```
    
    ![Screenshot 2025-02-16 at 8.29.18 PM.png](attachment:55c402bc-4b47-43a0-a649-fe1aad36512f:Screenshot_2025-02-16_at_8.29.18_PM.png)
    
    `CounterProvider`의 `value`로 넣어준 값들이 그대로 들어와요.
    
    ![Screenshot 2025-02-16 at 8.29.55 PM.png](attachment:c84bb0fc-697d-4b60-a9b7-42e6e8f8eb49:Screenshot_2025-02-16_at_8.29.55_PM.png)
    
    Provider로 감싸주지 않은 곳에서 `useContext`를 쓰면 이렇게 경고가 떠요.
    
    타입스크립트가 “여긴 우산이 없어요”라고 알려주는 거라서, 실수를 빨리 잡아내기 좋아요.
    
    ---
    
    ## 5. 커스텀 훅으로 깔끔하게 만들어요
    
    매번 `useContext(CounterContext)`를 쓰는 대신, **커스텀 훅**을 만들어서 더 안전하고 짧게 쓸 수 있어요.
    
    ```tsx
    // CounterProvider.tsx 맨 아래 추가
    export const useCount = () => {
      const context = useContext(CounterContext);
      if (!context) {
        throw new Error(
          'useCount는 반드시 CountProvider 내부에서 사용되어야 합니다.'
        );
      }
      return context;
    };
    ```
    
    이제 App에서 이렇게 깔끔하게 써요.
    
    ```tsx
    import ButtonGroup from './components/ButtonGroup';
    import { useCount } from './context/CounterProvider';
    
    function App() {
      // const context = useContext(CounterContext);
      const context = useCount();
    
      console.log(context);
    
      return (
        <>
          <h1>{context?.count}</h1>
          <ButtonGroup
    	      // ? 를 지워도 더이상 타입스크립트에서 에러가 발생하지 않음.
    	      // 우리가 useCount 훅에서, context가 없는 경우의 에러처리를 했기 떄문.
            handleIncrement={context.handleIncrement}
            handleDecrement={context.handleDecrement}
          />
        </>
      );
    }
    
    export default App;
    ```
    
    ![Screenshot 2025-02-16 at 8.35.27 PM.png](attachment:c0ad956b-6158-47b8-ba95-e3854ee19c39:Screenshot_2025-02-16_at_8.35.27_PM.png)
    
    옵셔널 체이닝(`?.`)을 지워도 에러가 안 떠요.
    왜냐하면 **커스텀 훅에서 undefined인 경우의 케이스를 throw new Error를 통해 useCount 훅에서 처리해주었기 때문이에요.**
    
    ---
    
    ### 6. 진짜로 props drilling을 없애볼게요
    
    전역 상태를 쓴 진짜 이유는 **중간 컴포넌트에 props를 전달하지 않기 위해서에**요.
    
    이제 `App.tsx`는 **`count`만 직접 쓰고**, 버튼 핸들러는 `ButtonGroup` 내부에서 바로 꺼내서 쓰도록 바꿔요.
    
    **App.tsx**
    
    ```tsx
    import ButtonGroup from './components/ButtonGroup';
    import { useCount } from './context/CounterProvider';
    
    function App() {
      const { count } = useCount();
    
      return (
        <>
          <h1>{count}</h1>
          <ButtonGroup />
        </>
      );
    }
    
    export default App;
    ```
    
    **ButtonGroup.tsx**
    
    ```tsx
    import { useCount } from '../context/CounterProvider';
    import Button from './Button';
    
    const ButtonGroup = () => {
      const { handleIncrement, handleDecrement } = useCount();
      return (
        <div>
          <Button onClick={handleIncrement} text='+1 증가' />
          <Button onClick={handleDecrement} text='-1 감소' />
        </div>
      );
    };
    
    export default ButtonGroup;
    ```
    
    **Button.tsx**
    
    ```tsx
    interface ButtonProps {
      onClick?: () => void;
      text: string;
    }
    
    const Button = ({ onClick, text }: ButtonProps) => {
      return <button onClick={onClick}>{text}</button>;
    };
    
    export default Button;
    ```
    
    이제 **App → ButtonGroup → Button**으로 props를 계속 내려보내지 않아도 돼요.
    필요한 곳에서 `useCount()`만 호출하면 끝이에요.
    
    ---
    
    ## 7. Provider 없이 쓰면 어떻게 돼요?
    
    커스텀 훅에서 예외를 던지도록 만들었기 때문에, Provider로 감싸지 않으면 바로 에러가 떠요.
    
    이건 “실수로 우산 밖에서 썼다”는 걸 **즉시 알려주기 위한 안전장치**예요.
    
    ```tsx
    export const useCount = () => {
      const context = useContext(CounterContext);
      if (!context) {
        throw new Error(
          'useCount는 반드시 CountProvider 내부에서 사용되어야 합니다.'
        );
      }
      return context;
    };
    ```
    
    `main.tsx`에서 잠깐 Provider를 주석 처리해볼게요.
    
    ```tsx
    import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';
    import './index.css';
    import App from './App.tsx';
    import { CounterProvider } from './context/CounterProvider.tsx';
    
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        {/* <CounterProvider> */}
        <App />
        {/* </CounterProvider> */}
      </StrictMode>
    );
    ```
    
    ![Screenshot 2025-02-16 at 8.35.27 PM.png](attachment:c0ad956b-6158-47b8-ba95-e3854ee19c39:Screenshot_2025-02-16_at_8.35.27_PM.png)
    
    우리가 던진 에러 메시지가 바로 보여요.
    
    다시 주석을 풀면 정상적으로 카운터가 작동돼요.
    
    ![Screenshot 2025-02-16 at 8.43.51 PM.png](attachment:ca3f614a-080c-4332-b2a4-0a542e973bca:Screenshot_2025-02-16_at_8.43.51_PM.png)
    

---

# 🍠 미션 1 - TypeScript + React를 활용하여 **To-Do List** 만들기

<aside>
🔥 이번 미션에서는 **React + TypeScript**를 활용해 **To-Do List**를 구현하는 것이 목표에요.

> 📌 **목표:** 
- Chapter 01에서 만든 **TypeScript 기반 To-Do List**를 React 환경으로 리팩토링
- 상태 관리(`useState`) → 컴포넌트 분리 → 전역 상태 관리(`useContext`)까지 경험
> 
> 
> 📌 **권장 학습 흐름:**
> 1. `App.tsx` 하나의 파일에서 먼저 기능 완성
> 2. 컴포넌트 단위로 분리
> 3. `contextAPI`를 활용해 **props-drilling** 문제 해결
> 
</aside>

- **`Chapter 01`**에 사용했던 To-Do List 코드 공유 (스타일 코드 포함)
    
    `📌 index.html`
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- css 파일 임포드 -->
    	    <link rel="stylesheet" href="./styl 
          <h1 class="todo-container__header">YONG TODO</h1>
          <form id="todo-form" class="todo-container__form">
            <input
              type="text"
              id="todo-input"
              class="todo-container__input"
              placeholder="할 일 입력"
              required
            />
            <button type="submit" class="todo-container__button">할 일 추가</button>
          </form>
          <div class="render-container">
            <div class="render-container__section">
              <h2 class="render-container__title">할 일</h2>
              <ul id="todo-list" class="render-container__list"></ul>
            </div>
            <div class="render-container__section">
              <h2 class="render-container__title">완료</h2>
              <ul id="done-list" class="render-container__list"></ul>
            </div>
          </div>
        </div>
      </body>
    </html>
    
    ```
    
    `📌 style.css`
    
    ```css
    /* ===== 기본 스타일 ===== */
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #eef2f3;
      margin: 0;
    }
    
    /* ===== Todo 컨테이너 ===== */
    .todo-container {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      width: 350px;
      text-align: center;
    }
    
    /* ===== 제목 ===== */
    .todo-container__header {
      font-size: 24px;
      margin-bottom: 16px;
    }
    
    /* ===== 입력 폼 ===== */
    .todo-container__form {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .todo-container__input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 14px;
    }
    
    .todo-container__button {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 6px;
      transition: background-color 0.3s ease;
    }
    
    .todo-container__button:hover {
      background-color: #218838;
    }
    
    /* ===== 리스트 컨테이너 ===== */
    .render-container {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }
    
    /* ===== 리스트 ===== */
    .render-container__section {
      width: 100%;
      text-align: left;
    }
    
    .render-container__title {
      font-size: 18px;
      margin-bottom: 10px;
    
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    
    .render-container__list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    /* ===== 리스트 아이템 ===== */
    .render-container__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    
      padding: 8px;
      border-bottom: 1px solid #ddd;
      background: #f9f9f9;
      border-radius: 6px;
      margin-bottom: 6px;
      width: 100%; /* Make sure the item takes full available width */
    }
    
    .render-container__item-text {
      flex: 1;
    
      white-space: nowrap; /* Prevent text from wrapping */
      overflow: hidden; /* Hide any overflow */
      text-overflow: ellipsis; /* Add '...' when text overflows */
      display: block; /* Ensure it's treated as a block for the overflow to work */
    }
    
    .render-container__item-button {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 6px 10px;
      cursor: pointer;
      border-radius: 6px;
      font-size: 12px;
      transition: background-color 0.3s ease;
    }
    
    .render-container__item-button:hover {
      background-color: #c82333;
    }
    
    ```
    
    `📌 script.ts`
    
    ```tsx
    // HTML 요소 선택
    const todoInput = document.getElementById('todo-input') as HTMLInputElement;
    const todoForm = document.getElementById('todo-form') as HTMLFormElement;
    const todoList = document.getElementById('todo-list') as HTMLUListElement;
    const doneList = document.getElementById('done-list') as HTMLUListElement;
    
    // 할 일 및 완료된 작업을 저장할 배열
    type Task = {
      id: number;
      text: string;
    };
    
    let todos: Task[] = [];
    let doneTasks: Task[] = [];
    
    // 할 일 텍스트 입력 처리 함수
    const getTodoText = (): string => {
      return todoInput.value.trim();
    };
    
    // 할 일 추가 함수
    const addTodo = (text: string): void => {
      todos.push({ id: Date.now(), text });
      console.log(todos);
      todoInput.value = '';
      renderTasks();
    };
    
    // 할 일 상태 변경 (완료로 이동)
    const completeTask = (task: Task): void => {
      todos = todos.filter((t) => t.id !== task.id);
      doneTasks.push(task);
      renderTasks();
    };
    
    // 완료된 할 일 삭제 함수
    const deleteTask = (task: Task): void => {
      doneTasks = doneTasks.filter((t) => t.id !== task.id);
      renderTasks();
    };
    
    // 할 일 아이템 생성 함수
    const createTaskElement = (task: Task, isDone: boolean): HTMLLIElement => {
      const li = document.createElement('li');
      li.classList.add('render-container__item');
      li.textContent = task.text;
    
      const button = document.createElement('button');
      button.classList.add('render-container__item-button');
    
      // 완료 여부에 따른 버튼 텍스트 및 색상 설정
      if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545'; // 빨간색 (삭제)
      } else {
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745'; // 초록색 (완료)
      }
    
      button.addEventListener('click', () => {
        if (isDone) {
          deleteTask(task);
        } else {
          completeTask(task);
        }
      });
    
      li.appendChild(button);
      return li;
    };
    
    // 할 일 목록 렌더링 함수
    const renderTasks = (): void => {
      todoList.innerHTML = '';
      doneList.innerHTML = '';
    
      todos.forEach((task) => {
        const li = createTaskElement(task, false);
        todoList.appendChild(li);
      });
    
      doneTasks.forEach((task) => {
        const li = createTaskElement(task, true);
        doneList.appendChild(li);
      });
    };
    
    // 폼 제출 이벤트 리스너
    todoForm.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const text = getTodoText();
      if (text) {
        addTodo(text);
      }
    });
    
    // 초기 렌더링
    renderTasks();
    
    ```
    

**🎨 화면**

![스크린샷 2025-09-11 오후 7.48.13.png](attachment:e98d8ea6-18b6-4d27-a261-5828b8300a68:스크린샷_2025-09-11_오후_7.48.13.png)

**🎥 동작 영상**

[ToDoList-Matthew.mov](attachment:f39a49ba-e7cc-4b92-972d-49ec396e596d:ToDoList-Matthew.mov)

**🍠 React로 구현 시 요구 사항**

---

- [ ]  기존 **ToDo List 구조와 스타일링**을 React 컴포넌트 기반으로 작성
- [ ]  **`useState`**를 활용해 **할 일 추가 / 완료 / 삭제** 기능 구현
- [ ]  초기에는 **App.tsx 하나의 파일**에서만 구현

### 🎅🏻 `useState`를 활용한 강의 영상 제공

https://youtu.be/Q4ktchHGLSM?si=RDgSoR86L0Q9KugS

---

**🍠 컴포넌트 분리 단계**

- [ ]  `App.tsx`의 코드들을 기능/역할별 **컴포넌트로 분리**
- [ ]  각 컴포넌트 간 데이터 전달 과정에서 발생하는 **props-drilling 문제 확인**
- [ ]  **props-drilling**이 발생하는 구체적인 부분 작성

---

**🍠 contextAPI 확장 단계**

- [ ]  `contextAPI`를 활용해 전역 상태 관리
- [ ]  props 없이도 컴포넌트들이 공통 상태를 공유할 수 있도록 개선
- [ ]  props-drilling 문제를 어떻게 해결했는지 정리

### 🎅🏻 `contextAPI`를 활용한 강의 영상 제공 (컴포넌트 분리 포함)

https://youtu.be/GMqNMJsHUdg?si=kUHcYHzOLHAPSQK0

### 🍠 미션 1. 제출

- 깃허브 주소
- 실행 영상

---

# 🍠 미션 2 - useContext를 활용해서 다크모드 구현하기!

<aside>
🔥

이번 미션에서는 **`useContext`**를 활용해 **다크모드 기능을 구현**하는 것이 목표에요!  
단순히 CSS를 적용하는 방식이 아니라, **상태 관리(Context API)**를 활용해 **전역적인 다크모드 토글**을 경험할 수 있어요.

이번 구현에서는 `TailwindCSS`를 사용할 예정이며, 아직 배우지 않았더라도 **세팅 방법**을 참고해서 직접 구성해보면 됩니다.

(추후 `Chapter 03`에서 TailwindCSS의 장점을 깊이 다룰 예정이에요.)

> 📌 방법:
> 
> 1. `TailwindCSS`를 먼저 프로젝트에 세팅해주세요.
> 2. `useContext`를 활용해 다크모드를 구현해보세요.
> 3. 강의 영상을 참고하되, 먼저 직접 구현해보고, 이후 스타일링은 자유롭게 바꿔도 좋아요 .
</aside>

### 🎅🏻 useContext를 활용하여 다크/라이트 모드 구현 강의 영상 제공

https://youtu.be/52zTzYQh8h0?si=7EaoNifJiaXh8cU4

**진행 방법 체크리스트**

- [ ]  `TailwindCSS`를 세팅해주세요 (Vite 기준)
    - `TailwindCSS` 세팅 방법
        1. 설치
        
        ```bash
        pnpm install tailwindcss @tailwindcss/vite
        ```
        
        1. vite.config.ts 설정
        
        ```tsx
        import { defineConfig } from 'vite'
        import tailwindcss from '@tailwindcss/vite'
        
        export default defineConfig({
          plugins: [
            tailwindcss(),
          ],
        })
        ```
        
        1. `index.css` 최상단에 추가
        
        ```css
        @import "tailwindcss";
        ```
        
        1. 참고 문서 → [TailwindCSS 공식 설치 가이드](https://tailwindcss.com/docs/installation/using-vite)
- [ ]  `useContext`를 활용하여 다크모드 토글 상태를 전역에서 관리해보세요.
- [ ]  `TailwindCSS`를 활용해 **라이트/다크 모드 스타일링**을 적용해주세요.
- [ ]  영상과 동일하게 구현해도 좋고, 자신만의 스타일을 적용해도 좋습니다.
- [ ]  필요하다면 `TailwindCSS` 문서를 검색하여 다양한 스타일을 활용해보세요.

<aside>
⚠️

이번 미션에서는 **TailwindCSS**를 처음 접하게 되었는데요,

처음에는 `className` 안에 축약어 같은 유틸리티 클래스가 많이 보여서 헷갈릴 수 있어요.

그렇지만 모든 걸 외워야 하는 건 아니고, 필요한 순간마다 찾아보면 됩니다.

예를 들어 **“margin은 어떻게 쓰지?”** 라는 생각이 들면

검색창에 **`Tailwind CSS v4 margin`** 이렇게 입력하면 바로 공식 문서를 확인할 수 있어요.

자주 쓰는 속성이 어떤 식으로 적용되는지만 익혀도 충분하니, 부담 갖지 말고 그때그때 찾아보면서 사용해보면 좋아요.

TailwindCSS의 본격적인 사용 방법은 **Chapter 03**에서 함께 진행할 예정이에요.

- [TailwindCSS 공식 문서 바로가기](https://tailwindcss.com/docs)
</aside>

### 🍠 미션 2. 제출

- 깃허브 주소
- 실행 영상

---

# 🍠 추가 미션. `useState` vs `useReducer`

<aside>
💡

React에서 상태 관리를 할 때 가장 먼저 떠올리는 훅은 단연 `useState`입니다.

하지만 프로젝트 규모가 커지거나, 상태 전이가 복잡해질수록 `useReducer`를 사용하는 편이 코드의 **가독성**과 **유지보수성**을 높여주는 경우가 많습니다.

막상 실제 코드에서 마주치면

> "이건 그냥 `useState`로 해도 충분하지 않을까?"
> 
> 
> "아니면 `reducer`로 분리하는 게 나을까?"
> 

이런 고민을 한 번쯤은 하게 되죠. 이번 미션을 통해 **나만의 선택 기준**을 정리해 보세요.

앞으로 팀원들과 코드 리뷰를 할 때 "왜 `useState` 대신 `useReducer`를 선택했는지"

명확하게 설명할 수 있다면, 훨씬 설득력 있는 의사결정을 할 수 있을 것입니다.

</aside>

**제가 정리한 글도 참고하실 수 있습니다!**

[개발자 매튜 | useState 대신 useReducer를 선택해야 하는 순간](https://www.yolog.co.kr/post/when-to-use-usestate-vs-usereducer/)

**또한 제가 촬영한 강의 영상도 참고하실 수 있습니다.**

https://youtu.be/9ISInVDo5m0?si=Q5yejT629QOzltXB

여러분도 블로그 글이나 노션 링크를 남겨주셔도 좋고, 간단히 키워드 위주로 정리해서 공유해주셔도 좋습니다.

혹시 **공개 가능한 링크**로 정리하신 분들은 오픈 채팅방에 한 번씩 올려 주시면 다른 분들에게도 큰 도움이 될 거예요. 같이 보면서 의견을 나누면 훨씬 더 깊이 있는 학습이 될 수 있습니다. 💡

- 추가 미션 제출 🍠

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
    

# 🍠 트러블 슈팅

---

<aside>
🍠 실습을 진행하면서 생긴 문제들 또는 어려웠던 내용에 대해서, 이슈 - 문제 - 해결 순서로 작성해 주세요.

</aside>

- 🍠 이슈 No.1 (예시, 서식만 복사하시고 지워주세요.)
    
    **`이슈`**
    
    👉 React 상태 관리 중 `useState`로 배열을 업데이트할 때, 원본 배열이 변경되지 않는 문제가 발생했다.
    
    ---
    
    **`문제`**
    
    👉 `push()` 메서드를 사용해 상태 배열에 새 요소를 추가했지만, React가 상태 변경을 감지하지 않아 화면이 갱신되지 않았다.
    
    ```jsx
    const [items, setItems] = useState<string[]>([]);
    
    function addItem(newItem: string) {
      items.push(newItem); // 상태 직접 변경
      setItems(items);     // 동일 참조 전달
    }
    ```
    
    React는 상태 변경 여부를 **참조(Reference)** 기준으로 판단하기 때문에, 기존 배열을 직접 변경하면 리렌더링이 일어나지 않는다.
    
    ---
    
    **`해결`**
    
    👉 기존 배열을 복사하여 새로운 배열 객체를 만들어 전달했다.
    
    ```jsx
    function addItem(newItem: string) {
      setItems([...items, newItem]); // 새로운 배열 생성
    }
    ```
    
    이로써 React가 새로운 참조를 감지하여 정상적으로 리렌더링이 발생했다.
    

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
        

# 🥕 **“잠깐, 왜 다들 리액트를 쓰지?”**

---

<aside>
🥕

최근에 **“왜 그렇게 많은 프론트엔드 팀들이 React를 선택했을까?”** 하는 궁금증이 있으셨던 분들이 계실 것 같아, 관련 내용을 정리한 글을 공유드립니다.

단순히 “무조건 React가 최고다”라는 이야기가 아니라, **React가 어떤 배경에서 탄생했는지**, **Angular·Vue 같은 다른 프레임워크들과는 무엇이 다른지**, 그리고 **Preact, Remix** 같은 새로운 흐름은 왜 주목받는지까지 한눈에 볼 수 있도록 정리했습니다.

특히 Remix가 React를 쓰다 왜 Preact로 전환을 시도했는지 같은 흥미로운 사례도 포함되어 있어, 프레임워크 선택의 기준을 다시 생각해볼 수 있을 겁니다.

심심할 때 한 번쯤 읽어보시면, 각 프레임워크가 가진 장단점과 **지금 시장에서 왜 React가 압도적으로 쓰이는지** 이해하는 데 도움이 될 거예요.

참고로, 이 글은 100% **Perplexity**를 활용해 정리했습니다.

</aside>

[왜 모든 개발자가 React를 선택할까? ](https://www.notion.so/React-271b57f4596b8130b48bc57609b3519e?pvs=21)

# 🤔 참고 자료

---

[Optional chaining - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

[Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.](https://tailwindcss.com/)

[개발자 매튜 | type vs interface 어떤 것을 사용해야 할까?](https://www.yolog.co.kr/post/ts-interface-type)

[개발자 매튜 | useState 대신 useReducer를 선택해야 하는 순간](https://www.yolog.co.kr/post/when-to-use-usestate-vs-usereducer/)

[useReducer – React](https://react.dev/reference/react/useReducer)

# 🛡️ 저작권

---

**© 2025 [Kim Yongmin (Matthew)](https://www.youtube.com/@yongcoding). All rights reserved.**