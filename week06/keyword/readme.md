# 📝 학습 목표

---

## 1) TanStack Query 이해 및 초기 세팅 완성

- TanStack Query의 목적(서버 상태 기반 패칭/캐싱/동기화/에러·로딩 관리)을 한 문장으로 설명하고, `QueryClient`–`QueryClientProvider`를 프로젝트에 적용할 수 있다.
- Devtools를 설치·주입하고(개발 모드 한정), 쿼리 키·stale 상태·리페치 트레이스를 확인하여 디버깅에 활용할 수 있다.

## 2) useQuery로 “조회 표준화” 구현

- `useQuery({ queryKey, queryFn })`로 목록/상세 데이터를 가져오고, `isPending / isError / data` 상태에 맞춘 UI 분기(로딩/에러/성공)를 일관되게 구성한다.
- 빈번히 쓰는 옵션의 효과를 코드로 설명·적용한다: `staleTime`, `gcTime`, `retry`, `refetchOnWindowFocus`, `enabled`, `select`, `placeholderData`.
- 동일 `queryKey`의 캐시 공유·신선도(stale/fresh)·백그라운드 리페치 동작을 재현하고, 필요 시 수동 `refetch`로 최신화를 트리거할 수 있다.

## 3) 캐시 정책 설계: gcTime vs staleTime

- `staleTime`(“신선도 유지 시간”)과 `gcTime`(“사용되지 않는 캐시 보관 기간”)의 차이를 정의하고, 데이터 특성(변동 주기/사용 빈도/리스트 vs 상세)에 따라 값을 합리적으로 설정한다.
- 깜빡임 최소화가 필요한 화면에는 `placeholderData` 또는 충분한 `staleTime`을, 트래픽 절감이 필요한 화면에는 `staleTime` 확대+`refetchOnWindowFocus` 정책을 선택 적용한다.

## 4) useInfiniteQuery로 무한 스크롤 완성

- `useInfiniteQuery`의 코어 개념을 설명하고 실제로 적용한다: `initialPageParam`, `getNextPageParam`, `data.pages`, `fetchNextPage`, `hasNextPage`, `isFetchingNextPage`.
- 서버 페이지네이션 방식을 비교·선택한다:
    - 오프셋 기반: 구현 단순·깊은 페이지 성능 저하·중복/누락 가능.
    - 커서 기반: 일관성·성능 우수·랜덤 접근 어려움.
- Intersection Observer로 “바닥 감지형” 자동 로딩을 구현하고, 의존성/해제(관찰 중지) 처리로 중복 호출을 방지한다.

## 5) Skeleton UI로 로딩 경험 개선

- 실제 콘텐츠 레이아웃을 모사한 Skeleton 컴포넌트를 작성하고, 목록/상세/댓글 등 각 화면의 “초기 로딩”과 “추가 로딩” 위치에 맞춰 조건부로 노출한다.
- 쉼머/펄스 애니메이션을 적용해 체감 로딩 시간을 단축하고, 응답이 매우 짧은 구간에서는 Skeleton 과도 노출(깜빡임)을 피하도록 조건을 조정한다.

---

## 완료 후 기대 역량

- TanStack Query를 프로젝트에 도입·표준화하고, Devtools로 쿼리/뮤테이션 상태를 분석·개선한다.
- `useQuery` 기반의 안정적인 조회 흐름과 일관된 에러/로딩 UX를 구축한다.
- 데이터 특성에 맞춘 `staleTime`/`gcTime` 설계로 네트워크 비용·깜빡임·리렌더를 균형 있게 최적화한다.
- `useInfiniteQuery` + Intersection Observer로 버튼/자동 트리거 모두 가능한 무한 스크롤을 구현한다.
- Skeleton UI와 애니메이션으로 사용자 이탈을 줄이고 화면 전환을 자연스럽게 만든다.

<aside>
💡 이번 주차는 그동안 사용하던 단순한 서버 API 호출 방식을 넘어, **TanStack Query**로 데이터 패칭을 구조화·효율화하는 데 집중합니다. 기존 방식의 문제점(중복 요청, 로딩/에러 처리의 중복 코드, 캐시 부재·신선도 관리 한계)을 짚고, 이를 해결할 수 있는 전략들을 비교한 뒤, **키워드 → 실습 → 미션** 순서로 TanStack Query 도입 효과(캐싱, 신선도 관리, 자동 리페치, 에러/로딩 상태 표준화)를 체득합니다.

또한 **useInfiniteQuery**로 무한 스크롤을 구현하고, **Skeleton UI**를 적용해 초기·추가 로딩 시에도 레이아웃이 안정적으로 보이도록 함으로써 실제 서비스와 가까운 사용자 경험을 설계합니다.

**- UMC 중앙 웹 파트장 매튜 / 김용민 -** 

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

# 🎯 핵심 키워드

---

<aside>
💡 주요 내용들에 대해 조사해보고, 자신만의 생각을 통해 정리해보세요!
레퍼런스를 참고하여 정의, 속성, 장단점 등을 적어주셔도 됩니다.
조사는 공식 홈페이지 **Best**, 블로그(최신 날짜) **Not Bad**

🍠 이모지가 달린 부분은, 여러분들이 직접 조사하여, 추가 작성하거나, 실습해보실 부분이니, 꼭 진행해주셔야 합니다!

</aside>

- **Tanstack Query는 무엇인가요? 🍠**
    
    # **`Tanstack Query`**란?  **🍠**
    
    **`Tanstack Query`**(구 React Query)는 **서버 상태**를 중심으로 비동기 데이터 패칭, 캐싱, 동기화, 리페치(갱신), 에러/로딩 상태 관리를 표준화해 주는 라이브러리예요. 
    
    [Installation | TanStack Query React Docs](https://tanstack.com/query/latest/docs/framework/react/installation)
    
    설치하는 방법은 다음과 같아요
    
    ### 설치 방법
    
    ```bash
    # 적합한 환경에 따라 선택해서 설치하시면 돼요. bun도 사용 가능해요.
    pnpm add @tanstack/react-query
    # or
    npm i @tanstack/react-query
    # or
    yarn add @tanstack/react-query
    # or
    bun add @tanstack/react-query
    ```
    
    ### 설정 방법
    
    애플리케이션의 최상위에서 `QueryClient`와 `QueryClientProvider`로 Query 클라이언트를 주입해요. 초안의 예제를 그대로 확장해 볼게요.
    
    ```tsx
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    
    const queryClient = new QueryClient();
    
    function App() {
      return (
        <QueryClientProvider client={queryClient}>
          {/* 애플리케이션 컴포넌트 페이지 컴포넌트 등등 */}
        </QueryClientProvider>
      );
    }
    export default App;
    ```
    
- **Tanstack Query Devtools**는 무엇인가요? **🍠**
    
    # Tanstack Query Devtools는 무엇인가요? **🍠**
    
    React에서 **Tanstack Query**가 관리하는 **쿼리/뮤테이션의 캐시, 상태, 리페치, 에러** 등을 **시각적으로 확인·디버깅**할 수 있는 개발 도구에요. 
    
    [Devtools | TanStack Query React Docs](https://tanstack.com/query/latest/docs/framework/react/devtools)
    
    쿼리 키·stale 상태·네트워크 요청 흐름을 눈으로 보면서 문제를 빠르게 파악하고 성능을 개선할 수 있어요. v5부터는 **뮤테이션 관찰**도 지원해요.
    
    ---
    
    ### 설치 방법
    
    프로젝트 내부에서 다음 중 하나로 설치하시면 돼요.
    
    ```bash
    # pnpm
    pnpm add @tanstack/react-query-devtools
    
    # npm
    npm i @tanstack/react-query-devtools
    
    # yarn
    yarn add @tanstack/react-query-devtools
    
    # bun
    bun add @tanstack/react-query-devtools
    ```
    
    ---
    
    ### 적용 방법
    
    **`QueryClientProvider`** 안쪽, 가능한 루트에 가깝게 Devtols를 배치해 주세요.
    
    ```tsx
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
    
    const queryClient = new QueryClient();
    
    const App = () => {
      return (
        <QueryClientProvider client={queryClient}>
          {/* 애플리케이션 컴포넌트 페이지 컴포넌트 등등 */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      );
    };
    
    export default App;
    ```
    
    - 기본적으로 **개발 번들(`{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}`)에만 포함**되므로, 프로덕션에서 자동 제외돼요. 별도 설정 없이도 빌드 용량이 늘지 않아요.
    - 토글 아이콘이 화면 구석에 생기며, 열고 닫은 상태는 `localStorage`에 저장돼요.
        
        ![스크린샷 2025-10-12 오전 2.39.05.png](attachment:93c80540-549d-4cba-bf1d-6e94a4f37e42:스크린샷_2025-10-12_오전_2.39.05.png)
        
    
    ---
    
    **Tanstack Query Devtools  자주 쓰는 옵션**
    
    ```tsx
    <ReactQueryDevtools
      initialIsOpen={false}               // 시작 시 패널 열림 여부
      buttonPosition="bottom-right"       // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'relative'
      position="bottom"                   // 'top' | 'bottom' | 'left' | 'right'
    />
    ```
    
    옵션 전체 목록은 문서에서 확인하실 수 있어요.
    
    [Devtools | TanStack Query React Docs](https://tanstack.com/query/latest/docs/framework/react/devtools#options)
    
- **useQuery 🍠**
    - **useQuery**는 무엇인가요?
        
        # **useQuery**
        
        ---
        
        ### **useQuery**
        
        **useQuery**는 TanStack Query(구 React Query)가 제공하는 **데이터 조회 훅**이에요.
        
        - **`queryKey`** 배열로 데이터를 식별하고,
        - **`queryFn`**(비동기 함수)을 싫애해 가져오며,
        - 가져온 결과를 `캐싱/신선도 판정(stale/fresh)`**/자동 리페치/에러·로딩 상태**와 함께 관리해요. 즉, “데이터 가져오기 + 캐시 + 갱신”에 필요한 반복 코드를 훅 하나로 표준화해 줘요.
        
        ---
        
        ### **useQuery**로 안전하게 페칭하기
        
        아래는 공개 API에서 할 일 목록을 5개 가져오는 **실행 가능한 예제**예요.
        
        ```tsx
        // todos 네트워크 요청 응답에 대한 인터페이스
        interface TodoResponse {
          userId: number;
          id: number;
          title: string;
          completed: boolean;
        }
        
        export const fetchTodos = async (): Promise<TodoResponse[]> => {
          // 네트워크 요청을 통해 todos 데이터를 가져옵니다.
          const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        
          // 응답이 성공하지 않으면 에러를 던집니다.
          if (!response.ok) {
            throw new Error('Failed to fetch todos');
          }
        
          // 응답을 파싱합니다.
          const todos = await response.json();
        
          // 파싱된 데이터를 반환합니다.
          return todos;
        };
        ```
        
        이제 실제로 이 API를 활용해서 데이터를 가져와볼게요.
        
        ```tsx
        import { useQuery } from '@tanstack/react-query';
        import { fetchTodos } from '../apis/todos';
        
        export const TodoList = () => {
          const { data, isPending, isError, error } = useQuery({
            queryKey: ['todos'],
            queryFn: fetchTodos,
          });
        
          if (isPending) return <div>Loading...</div>;
        
          if (isError) return <div>Error: {error.message}</div>;
        
          return (
            <div>
              <ul>
                {data?.map((t) => (
                  <li key={t.id}>
                    <label>
                      <input type='checkbox' checked={t.completed} readOnly /> {t.title}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          );
        };
        ```
        
        - `queryKey: ['todos']`로 **데이터의 캐시 주소**를 정해요.
        - `queryFn: fetchTodos`로 **비동기 패칭 함수**를 등록해요.
        - **useQuery**는 내부적으로 **로딩/에러/성공 상태, 캐싱, 신선도 판정, 자동 리페치**를 관리하고, 그 결과를 `{ data, isPending, isError, error }`로 노출해요.
        - 따라서 기존의 `useState + useEffect` 커스텀 훅에서 직접 만들던 **요청 중복 방지, 취소, 재시도, 캐시 공유** 같은 로직을 대부분 대체할 수 있어요.
        
        ---
        
        ### 상태 머신과 캐시 동작
        
        **1. 상태 머신(derive된 UI 상태)**
        
        - `isPending`: 첫 로드이거나, 캐시에 데이터가 없어서 **초기 페칭 중**일 때 `true`예요.
        - `isError`: 마지막 시도가 실패했을 때 `true`예요. 에러 객체는 `error`로 전달돼요.
        - 성공 시 `data`에 응답이 들어오며, 이후에는 **캐시**가 우선 사용돼요.
        
        1. **쿼리 키와 캐시**
        - 같은 컴포넌트든 다른 컴포넌트든 `['todos']`라는 **동일 키**를 쓰면 **동일 캐시를 공유**해요.
        - 이미 캐시에 있고 아직 “신선”하다면, 네트워크 없이 즉시 `data`를 반환하고, 필요 시 백그라운드에서 조용히 최신화합니다(옵션으로 제어).
        
        1. **신선도와 리페치(기본 흐름)**
        - 최초 로드 → 캐시 저장 → 시간이 지나거나 포커스 복귀/네트워크 복구 시 **stale 판정**이면 백그라운드 리페치.
        - 이 모든 **시점 계산과 중복요청 결합**(dedupe)을 라이브러리가 처리해요.
        
        ---
        
        ### 코드 해설과 확장 포인트
        
        1. **현재 코드의 렌더링 흐름**
        
        ```tsx
        if (isPending) return <div>Loading...</div>;
        if (isError)   return <div>Error: {error.message}</div>;
        return (
          <ul>{data?.map(/* ... */)}</ul>
        );
        ```
        
        - 초기 로딩(isPending)는 스피너/스켈레톤을 보여주고,
        - 실패하면 `error.message`를 노출,
        - **성공**하면 `data`를 그립니다.
        
        1. **실전에서 바로 사용하기 좋은 옵션들**
        
        필수는 아니지만, 이 코드에 아래 옵션 몇 가지만 더하면 UX가 확 달라져요.
        
        ```tsx
        const { data, isPending, isError, error, isFetching, refetch } = useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          staleTime: 30_000,           // 30초 동안은 fresh로 간주(불필요한 네트워크 감소)
          gcTime: 5 * 60 * 1000,       // 5분 후 사용되지 않는 캐시 정리(메모리 관리)
          retry: 1,                    // 실패 시 재시도 횟수(기본 3에서 낮추기 등)
          refetchOnWindowFocus: true,  // 포커스 복귀 시 최신화(팀 정책에 따라 on/off)
          // select: (raw) => raw.filter(t => !t.completed), // 필요한 형태로 데이터 가공
          // placeholderData: [],       // 첫 페치 이전에 잠깐 보여줄 값(깜빡임 완화)
        });
        ```
        
        UI에서 “수동 새로고침” 버튼을 같이 두면 상태가 더 명확해요.
        
        ```tsx
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? '새로고침 중...' : '새로고침'}
        </button>
        ```
        
        - **`TodoList.tsx`**전체 코드
            
            ```tsx
            import { useQuery } from '@tanstack/react-query';
            import { fetchTodos } from '../apis/todos';
            
            export const TodoList = () => {
              const { data, isPending, isError, error, isFetching, refetch } = useQuery({
                queryKey: ['todos'],
                queryFn: fetchTodos,
                staleTime: 30_000, // 30초 동안은 fresh로 간주(불필요한 네트워크 감소)
                gcTime: 5 * 60 * 1000, // 5분 후 사용되지 않는 캐시 정리(메모리 관리)
                retry: 1, // 실패 시 재시도 횟수(기본 3에서 낮추기 등)
                refetchOnWindowFocus: true, // 포커스 복귀 시 최신화(팀 정책에 따라 on/off)
                // select: (raw) => raw.filter(t => !t.completed), // 필요한 형태로 데이터 가공
                // placeholderData: [],       // 첫 페치 이전에 잠깐 보여줄 값(깜빡임 완화)
              });
            
              if (isPending) return <div>Loading...</div>;
            
              if (isError) return <div>Error: {error.message}</div>;
            
              return (
                <div>
                  <ul>
                    {data?.map((t) => (
                      <li key={t.id}>
                        <label>
                          <input type='checkbox' checked={t.completed} readOnly /> {t.title}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <button disabled={isFetching} onClick={() => refetch()}>
                    {isFetching ? '새로고침 중...' : '목록 새로고침'}
                  </button>
                </div>
              );
            };
            ```
            
        
    - **useQuery**의 주요 옵션
        
        # **useQuery**의 주요 옵션
        
        <aside>
        🍠
        
        모든 **useQuery** 속성을 전부 기억하실 필요는 전혀 없답니다. 
        
        😊 필요하실 때마다 공식 문서를 찾아보시는 것이 가장 정확하고 좋은 방법이에요! 
        
        하지만 자주 사용하게 되는 부분에는 제가 ⭐ 표시를 해드릴게요.
        
        - UMC 중앙 웹 파트장 매튜 / 김용민 - 
        
        </aside>
        
        ---
        
        ### 1. queryKey ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos', { limit: 3 }],
          queryFn: fetchTodos,
        });
        ```
        
        - **무엇/왜**: 캐시의 “주소”이에요. 같은 키면 캐시를 공유하므로 **중복 요청을 막고** 재사용할 수 있어요.
        
        ---
        
        ### 2. queryFn ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos, // 반드시 Promise를 반환해야 해요
        });
        ```
        
        - **무엇/왜**: 실제 데이터를 가져오는 **비동기 함수**예요. API 호출 로직을 넣어 주세요.
        
        ---
        
        ### 3. gcTime ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          gcTime: 5 * 60 * 1000, // 5분 뒤 사용되지 않는 캐시를 정리
        });
        ```
        
        메모리 관리를 위해 **사용되지 않는 데이터의 보관 기간**을 정해요.
        
        ---
        
        ### 4. enabled ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          enabled: Boolean(isLoggedIn), // 로그인 시에만 패칭
        });
        ```
        
        **조건부 실행**이 필요할 때 사용해요. 값이 false면 쿼리가 멈춰요.
        
        ---
        
        ### 5. networkMode
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          networkMode: 'online', // 'always'로 두면 오프라인에도 시도(특수 케이스)
        });
        ```
        
        - **무엇/왜**: 네트워크 동작 방식을 제어해요. 기본적으로 **온라인에서만** 요청하도록 둘 수 있어요.
        
        ---
        
        ### 6. initialData ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          initialData: [{ id: 1, title: '로컬 캐시', completed: false }],
        });
        ```
        
        - **이미 가진 값**을 첫 화면에 바로 보여, 로딩 공백을 줄일 수 있어요.
        
        ---
        
        ### 7. initialDataUpdatedAt
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          initialData: [{ id: 1, title: '로컬 캐시', completed: false }],
          initialDataUpdatedAt: Date.now(), // 초기 데이터의 “신선도” 기준 시각
        });
        ```
        
        - initialData가 **언제의 데이터인지** 알려 신선도 판정에 활용해요.
        
        ---
        
        ### 8. meta
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          meta: { feature: 'todoList', owner: 'growth-team' },
        });
        ```
        
        - 로깅·디버깅을 위해 **커스텀 메타 정보**를 쿼리에 실어 둘 수 있어요.
        
        ---
        
        ### 9. notifyOnChangeProps
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          notifyOnChangeProps: ['data', 'isFetching'], // 이 속성이 바뀔 때만 리렌더
        });
        ```
        
        - 리렌더를 **정교하게 제한**해 성능을 최적화할 수 있어요.
        
        ---
        
        ### 10. placeholderData ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          placeholderData: [{ id: 0, title: '불러오는 중...', completed: false }],
        });
        ```
        
        - 실제 데이터가 오기 전 **임시 표시**로 깜빡임을 줄여요.
        
        ---
        
        ### 11. queryKeyHashFn
        
        ```tsx
        useQuery({
          queryKey: ['todos', { filter: 'open' }],
          queryFn: fetchTodos,
          queryKeyHashFn: (key) => JSON.stringify(key), // 기본과 동일한 간단 예시
        });
        ```
        
        - **복잡한 키의 해싱 방식**을 바꿔 캐싱 일관성을 확보할 수 있어요(특수 케이스).
        
        ---
        
        ### 12. refetchInterval ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          refetchInterval: 10_000, // 10초마다 자동 갱신
        });
        ```
        
        - **주기적 리페치**로 최신 상태를 유지해요.
        
        ---
        
        ### 13 .refetchIntervalInBackground
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          refetchInterval: 10_000,
          refetchIntervalInBackground: true, // 비포커스 상태에서도 계속
        });
        ```
        
        - 창이 백그라운드여도 **주기 리페치**를 유지하고 싶을 때 사용해요.
        
        ---
        
        ### 14. refetchOnMount ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          refetchOnMount: true, // 마운트 때마다 최신화
        });
        ```
        
        - 화면 전환 시 **항상 최신 데이터**가 필요하면 켜 주세요.
        
        ---
        
        ### 15. refetchOnReconnect ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          refetchOnReconnect: true, // 네트워크 복구 시 자동 갱신
        });
        ```
        
        - 오프라인이었다가 온라인으로 돌아오면 **바로 최신화**해요.
        
        ---
        
        ### 16. refetchOnWindowFocus ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          refetchOnWindowFocus: true, // 탭으로 돌아오면 최신화
        });
        ```
        
        - 사용자가 페이지로 돌아왔을 때 **데이터를 최신**으로 유지해요.
        
        ---
        
        ### 17. retry ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          retry: 1, // 실패 시 한 번만 재시도
          // retry: (failureCount, error) => failureCount < 3 && isTransient(error)
        });
        ```
        
        - 일시적 오류에 대해 **자동 복구**를 시도해요.
        
        ---
        
        ### 18. retryOnMount ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          retryOnMount: true, // 이전에 실패했어도 마운트 시 재시도
        });
        ```
        
        - 초기 실패 후 **다시 방문 시 재시도**가 필요할 때 켜요.
        
        ---
        
        ### 19. retryDelay ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          retry: 3,
          retryDelay: 1000, // 재시도 사이 1초 대기
        });
        ```
        
        - 재시도 간격을 조절해 **서버 부하**를 줄여요.
        
        ---
        
        ### 20. select ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          select: (todos) => todos.filter((t) => !t.completed), // 필요한 형태로 가공
        });
        ```
        
        - 컴포넌트가 **필요한 모양**으로 데이터를 변환해 받아요.
        
        ---
        
        ### 21. staleTime ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          staleTime: 30_000, // 30초 동안은 fresh(불필요한 리페치 감소)
        });
        ```
        
        - 신선도 유지 시간을 길게 주면 **네트워크 비용**을 줄일 수 있어요.
        
        ---
        
        ### 22. structuralSharing
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          structuralSharing: true, // 기본값: 참조 유지로 불필요 렌더 감소
        });
        ```
        
        - 구조가 비슷한 새 데이터와 **참조를 공유**해 리렌더를 줄여요.
        
        ---
        
        ### 23. subscribed
        
        ```tsx
        // 내부적으로 쓰이는 옵션이에요. 보통 직접 건드리지 않으시는 걸 권장드려요.
        // 실사용 예시는 생략해도 괜찮아요.
        ```
        
        - 쿼리의 **구독 상태**를 제어하는 내부용 속성이에요.
        
        ---
        
        ### 24. throwOnError ⭐
        
        ```tsx
        useQuery({
          queryKey: ['todos'],
          queryFn: fetchTodos,
          throwOnError: true, // 에러를 throw하여 ErrorBoundary로 전파
        });
        ```
        
        - **컴포넌트 밖(ErrorBoundary)**에서 예외 처리를 하려면 켜 주세요.
        
        ---
        
        ### 빠른 적용 팁
        
        - **자주 변하는 데이터**면 `staleTime`을 짧게, **드물게 변하면** 길게 두시면 좋아요.
        - 깜빡임 완화는 `placeholderData`/`initialData`가 가장 간단해요.
        - 불필요 리렌더가 보이면 `notifyOnChangeProps`와 `structuralSharing`을 점검해 보세요.
    - **`gcTime`**과 **`staleTime`**의 차이점에 대해 정리해보세요! 🍠
        
        # **`gcTime`**과 **`staleTime`**의 차이점에 대해 정리해보세요 🍠
        
        <aside>
        🍠
        
        gcTime과 staleTime은 Tanstack Query에 있어서 정말 중요하게 알고 넘어가야 하는 부분이에요.
        
        **위에서 제가 설명해드렸지만 gcTime**과 **staleTime**의 개념을 다시 정리해주시고, 두 값을 어떤 식으로 설정하면 캐싱 전략에 유리한지 설명해주세요!
        
        - UMC 중앙 웹 파트장 매튜 / 김용민 - 
        
        </aside>
        
        - `gcTime`은 무엇인가요? 🍠
            
            gcTime (Garbage Collection Time)은 캐시된 데이터가 화면(컴포넌트)에서 사용되지 않는 상태(inactive)가 되었을 때, 메모리에 얼마 동안 남아있을지를 정하는 시간이다. 이 시간이 지나면 캐시는 메모리에서 완전히 삭제된다.
            
        - `staleTime`은 무엇인가요? 🍠
            
            staleTime은 캐시된 데이터가 '신선하다(fresh)'고 간주되는 시간이다. 이 시간 안에는 컴포넌트가 다시 마운트되거나 윈도우 포커스가 돌아와도, 데이터를 다시 요청(refetch)하지 않고 즉시 캐시된 데이터를 사용한다.
            
        - 두 값을 어떤 식으로 설정하여야 `캐싱 전략에 유리`한가요? 🍠
            
            데이터가 자주 바뀌지 않는다면 staleTime을 길게(예: 1분~5분) 설정해 불필요한 네트워크 요청을 줄이는 것이 유리하다. gcTime은 staleTime보다 항상 길게(기본 5분) 유지하여, 사용자가 잠시 다른 화면에 다녀와도 캐시가 남아있도록 하는 것이 좋다.
            
- **🍠  실습 1. useQuery 핵심 옵션, 우리가 직접 만들어보며 이해해요**
    
    # 🍠 실습 1.  **useQuery** 핵심 옵션, 우리가 직접 만들어보며 이해해요
    
    <aside>
    🍠 이번 실습은 이전에 함께 만들었던 `CustomFetch` Hook을 확장해 **useQuery의 주요 옵션**들을 직접 구현해보는 경험을 해보려 합니다. 왜 라이브러리를 쓰는지, 그리고 우리가 앞으로 사용할 **TanStack Query**에는 어떤 기능들이 숨겨져 있는지 몸으로 이해해보시면 좋아요.
    
    **실습 목표**
    
    - **useQuery**의 핵심 옵션(예: **`staleTime`**, **`queryKey`**, **`retry`**, **`로딩`** ,**`에러`**, **`데이터 불러오기`** 등)을 직접 구현 관점에서 이해해요.
    - 기존 `CustomFetch` Hook을 확장하여 캐싱, 리트라이, 로딩/에러 상태 관리 등의 동작을 체감해요.
    - 직접 만들어보며 실제 우리가 사용하는 라이브러리는 어떤 느낌으로 만들어졌을지 이해해봐요.
    
    **진행 방식
    
    1. 강의 영상 우선 시청**
    
    - 이번 강의는 9기 시작 이후 첫 촬영본이에요. 전달하고자 한 내용을 영상에 최대한 담아두었으니 먼저 시청해 주세요. 세부 맥락 이해에 큰 도움이 됩니다.
    
    **2. 블로그로 복습
    -** 블로그에는 **전체 예시 코드**를 제공해 두었습니다. 처음에는 영상 설명을 참고해주시고, 이후에는 블로그를 코드 확인·복습 용도로 **활용하셔도 좋아요**.
    
    **3. 손으로 구현 → 라이브러리 비교
    - 직접 확장한 기능과 TanStack Query의 기본 제공 기능을 나란히 비교해 보시면 좋습니다. 각 옵션이 해결하는 문제와 트레이드오프에 주목해 주세요.
    
    2025년 10월 기준으로, 기존에 Vite를 활용하여 React 패키지를 만드는 방식이 변경되었어요. 이 부분도 강의 영상 앞 부분에 다루어 드렸으니 참고해주세요.
    
    이번, 강의 영상을 통해 “왜 라이브러리를 쓰는가”에 대한 설득력 있는 답을 스스로 갖게 되며, 캐싱 / 동기화 / 에러 복구 같은 실전 요구사항을 추상화 레벨에서 이해하게 됩니다.
    
    항상 말하지만 여러분들은 저의 워크북을 처음부터 모든 것을 이해하면 좋겠지만 절대 그럴 수 없습니다. 
    한번 키워드 실습 미션들을 따라쳐보며 경험을 해보고, 나중에 데모데이에 특정 기능을 개발할 때, 워크북에서 배웠던 이 것을 활용하면 더 빨리 개발할 수 있겠다 정도로만 이해해주세요!
    
    필요할 때 공식문서 처럼 찾아와서 활용해주시면 됩니다!
    
    궁금한 점은 언제든지 오픈채팅방을 통해 문의 해주세요. 
    
    음질이 조금 안좋은 것 같아, 이후 촬영하는 모든 영상은 새로운 마이크를 통해 촬영할 예정이니 조금만 양해 부탁드립니다!
    
    - 중앙 웹 파트장 매튜 / 김용민 -** 
    
    </aside>
    
    ### 🎬 실습 강의 영상
    
    https://youtu.be/kMaiDlYvua0?si=LjvPEet9NsE_WyFU
    
    ### 📚 실습 참고 블로그
    
    [개발자 매튜 | React Query 알고 쓰기](https://www.yolog.co.kr/post/react-query)
    
    ### 🍠  실습 1. 제출
    
    - 깃허브 주소
    - 실행 영상
    - 해당 실습을 통해 어떤 접을 느끼셨는지 5줄 이상 정리해주세요!
    
    ---
    
- **useInfiniteQuery 🍠**
    - **`오프셋 기반 페이지네이션`**과 **`커서 기반 페이지네이션`**에 대해 정리해보세요! 🍠
        
        # Pagination 페이지네이션이란 무엇인가요?
        
        <aside>
        🍠
        
        **페이지네이션**은 서버에서 클라이언트로 데이터를 전송할 때, 한 번에 모든 데이터를 보내지 않고 **일정한 단위(페이지)로 나누어 전송하고 보여주는 기법**이에요.
        
        만약 수만 건의 게시글을 한 번에 불러온다면, 사용자 경험은 나빠지고 서버는 과부하가 걸리겠죠? 
        
        페이지네이션은 이러한 문제를 해결하고 데이터 로딩 성능을 최적화하는 데 필수적인 기술이랍니다.
        
        페이지네이션을 구현하는 대표적인 두 가지 방식이 바로 **오프셋 기반**과 **커서 기반**이에요.
        
        조금 더 원활한 이해를 위해 약간의 데이터베이스 개념도 넣을테니 지금은 이런게 있구나 읽어 보시면 될 것 같아요!
        
        - UMC 중앙 웹 파트장 매튜 / 김용민 - 
        
        </aside>
        
        ---
        
        - 오프셋 기반 페이지네이션 (Offset-based Pagination)
            
            # 오프셋 기반 페이지네이션 (Offset-based Pagination)
            
            ---
            
            ### 1. 원리: "몇 번째부터 몇 개”
            
            오프셋 기반 페이지네이션은 흔히 **"숫자 페이지 매기기"** 방식이라고 불려요. 여러분이 웹사이트 하단에서 흔히 보셨던 **[1] [2] [3] ...** 형태의 페이지 이동 방식이 바로 이것이에요.
            
            이 방식은 데이터베이스의 쿼리에서 사용하는 `OFFSET`과 **`LIMIT`** 구문을 활용하는 것이 핵심이에요.
            
            - **`LIMIT`**: 한 페이지에 보여줄 데이터의 **개수** (예: 10개)
            - **`OFFSET`**: 데이터를 건너뛸 **시작점** (예: 앞에서부터 20개를 건너뛰고 시작)
            
            **예시 원리**
            
            1. **1페이지 요청**: `OFFSET 0`, `LIMIT 10`
            2. **2페이지 요청**: `OFFSET 10`, `LIMIT 10`
            3. **3페이지 요청**: `OFFSET 20`, `LIMIT 10`
            
            ---
            
            ### 2. 서버와 클라이언트의 통신
            
            **2-1. 클라이언트의 요청 (프론트엔드)**
            
            클라이언트는 보통 페이지 번호 (`page`)와 한 페이지 당 항목 수 (`limit` 또는 `size`)를 쿼리 파라미터로 서버에 요청해요.
            
            ```tsx
            // 3페이지를 요청하는 URL
            // 'limit'은 보통 서버의 기본값으로 두기도 합니다.
            const pageNumber = 3;
            const pageSize = 10;
            const url = `/api/posts?page=${pageNumber}&size=${pageSize}`;
            ```
            
            **2-2. 서버의 처리 (백엔드 - SQL 기준)**
            
            서버는 전달받은 `page`와 `size`를 이용해 실제 `OFFSET` 값을 계산해요.
            
            ```sql
            -- 3페이지 (size=10) 요청 시
            -- OFFSET = (3 - 1) * 10 = 20
            
            SELECT * FROM posts
            ORDER BY created_at DESC  -- 정렬 기준이 있어야 순서가 일정해요.
            LIMIT 10 
            OFFSET 20;
            ```
            
            ---
            
            ### 3. 주의점: 고질적인 문제점
            
            오프셋 기반은 구현이 매우 직관적이지만, 치명적인 단점이 있어요.
            
            **3-1. 데이터 중복/누락 문제 (가장 중요!)**
            
             페이지를 이동하는 사이에 새로운 데이터가 추가되거나 기존 데이터가 삭제/변경되면, **데이터의 순서가 밀리거나 당겨져서** 사용자가 이미 본 데이터를 다시 보거나, 일부 데이터를 건너뛰고 못 볼 수 있어요.
            
            **3-2. 느려지는 성능 (깊은 페이지)**
            
             `OFFSET` 값이 커질수록 (뒤 페이지로 갈수록), 데이터베이스는 이전의 모든 레코드(row)를 건너뛰어야 하기 때문에 쿼리 성능이 **점점 느려져요.** 
            
            수백만 건의 데이터베이스에서는 이 문제가 심각해질 수 있어요.
            
        - 커서 기반 페이지네이션 (Cursor-based Pagination)
            
            # 커서 기반 페이지네이션 (Cursor-based Pagination)
            
            커서 기반 페이지네이션은 앞에서 살펴본 오프셋 기반의 고질적인 단점, 즉 **데이터 누락/중복**과 **깊은 페이지에서의 성능 저하** 문제를 해결하기 위해 등장한 방식이에요. 
            
            특히 실시간으로 데이터가 끊임없이 추가되는 **무한 스크롤(Infinite Scroll)** 구현에 가장 적합한 방식이랍니다.
            
            ---
            
            ### 1. 원리: “마지막 항목 다음부터”
            
            커서 기반은 "**마지막으로 조회한 데이터의 위치"**를 다음 페이지를 시작할 **기준점(커서)**으로 활용해요. 
            
            마치 책갈피처럼, 내가 어디까지 읽었는지를 표시하고 그 다음부터 읽기 시작하는 원리라고 생각하시면 이해하기 쉬워요.
            
            - **커서(Cursor)**: 보통 데이터의 **고유하고 순서가 있는 값**을 사용해요. 예를 들어, **고유 ID**(`id`)나 **생성 시각**(`created_at`의 타임스탬프) 등이 커서가 될 수 있어요.
            - **요청 방식**: 클라이언트는 서버에 "이전 페이지의 마지막 항목 커서 값을 기준으로, 그 다음 데이터 10개를 줘"라고 요청합니다.
            
            **예시 원리** (데이터를 최신순으로 정렬했을 경우)
            
            1. **1페이지 요청**: 커서 없음. (가장 최신 데이터부터 `LIMIT 10`)
            2. **2페이지 요청**: 1페이지의 마지막 게시물 ID (커서)를 전달하여, **해당 ID보다 작은 (더 오래된) 데이터** 10개를 요청합니다.
            3. **3페이지 요청**: 2페이지의 마지막 게시물 ID (커서)를 전달하여, **해당 ID보다 작은** 데이터 10개를 요청합니다.
            
            ---
            
            ### 2. 서버와 클라이언트의 통신
            
            **2-1. 클라이언트의 요청 (프론트엔드)**
            
            클라이언트는 다음 페이지를 요청할 때, **페이지 번호 대신** 이전에 받아온 목록에서 **가장 마지막 항목의 커서 값** (`after` 또는 `last_id`)을 쿼리 파라미터로 서버에 전달해요.
            
            ```jsx
            // 이전에 받아온 목록의 마지막 게시물 ID가 95라고 가정합니다.
            const lastCursorId = 95;
            const pageSize = 10;
            // 'after'라는 쿼리 파라미터에 커서 값을 담아 전달합니다.
            const url = `/api/posts?after=${lastCursorId}&size=${pageSize}`;
            ```
            
            **2-2. 서버의 처리 (백엔드 - SQL 기준)**
            
            서버는 전달받은 커서 값을 이용하여 데이터베이스의 **`WHERE`** 절을 사용해 직접 다음 시작점을 지정해요. 이 방식이 성능에 큰 이점을 가져다줍니다.
            
            ```sql
            -- 마지막으로 본 게시물 ID가 95이고, ID 내림차순(최신순)으로 정렬했을 경우
            
            SELECT * FROM posts
            WHERE id < 95             -- ID가 95보다 작은 (즉, 더 오래된) 데이터만 가져옵니다.
            ORDER BY id DESC          -- 내림차순 정렬을 유지합니다.
            LIMIT 10;                 -- 10개만 가져옵니다.
            ```
            
            ---
            
            ### 3. 장점: 커서 기반의 매력
            
            커서 기반 페이지네이션이 오프셋 기반의 단점을 어떻게 극복하는지 살펴볼게요.
            
            **1. 데이터 중복/누락 문제 해결 (👍 일관성 유지)**
            
            데이터를 가져오는 기준이 '건너뛴 개수'가 아니라 '특정 항목의 값(커서)'이기 때문에, 페이지를 불러오는 사이에 **새로운 데이터가 추가되더라도** (예: ID 96, 97이 추가) 이미 `ID < 95`라는 조건으로 조회하고 있다면 **사용자가 보던 흐름에는 영향을 주지 않습니다.** 
            
            데이터의 일관성을 완벽하게 유지할 수 있어요.
            
            **2. 우수한 성능 (페이지가 깊어져도 OK!)**
            
            `WHERE` 절에서 사용되는 커서 값(`id < 95`)은 데이터베이스의 인덱스(Index)를 활용하기 때문에 매우 빠르게 원하는 위치를 찾을 수 있어요. 수백만 건의 데이터를 가진 테이블이라도 깊은 페이지로 이동할 때 **이전 데이터를 모두 건너뛸 필요가 없어서** 쿼리 속도 저하 없이 일관되게 빠른 성능을 유지할 수 있습니다.
            
            ---
            
            ### 4. 주의점 : 커서 기반의 한계
            
            커서 기반은 성능과 일관성 면에서 뛰어나지만, 만능은 아닙니다.
            
            **1. 랜덤 접근 불가**
            
            커서 기반은 **[1] [2] [3]**과 같은 페이지 번호를 제공하고, 사용자가 **특정 페이지(예: 50페이지)**를 클릭해 바로 이동하는 **랜덤 접근(Random Access)**이 기본적으로 **불가능**해요. 다음 페이지를 요청하려면 반드시 이전 페이지의 마지막 커서 값이 필요하기 때문이에요. 이 때문에 일반적인 숫자 페이지네이션 UI보다는 무한 스크롤에 주로 사용됩니다.
            
            **2. 복잡한 쿼리 조건**
            
            커서로 사용되는 정렬 기준(예: `id` 또는 `created_at`)이 하나가 아니라 여러 개일 경우(예: 좋아요 수(`likes`)가 같으면 생성 시각(`created_at`)으로 정렬), `WHERE` 절의 조건이 복잡하고 까다로워질 수 있어요.
            
    - **useInfiniteQuery**
        
        # 왜 **useInfiniteQuery** 일까요?
        
        - **문제:** 한 번에 모든 데이터를 받아 렌더링하면 초기 로딩이 느리고, 스크롤 UX도 좋지 않아요.
        - **핵심 아이디어:** 데이터를 **페이지 단위로 분할**해 적시에 불러오고, 이미 받은 페이지는 **캐시에 누적**해 다시 쓰는 것이에요.
        - **useInfiniteQuery가 해주는 일:**
            - 현재 어디까지 가져왔는지 기억하고(`data.pages`),
            - 다음에 무엇을 가져올지(`getNextPageParam`)를 함수로 정의하게 해줘요,
            - 그리고 `fetchNextPage`/`hasNextPage`/`isFetchingNextPage` 같은 **무한 스크롤 전용 상태/함수**를 제공해요.
        
        <aside>
        🥕
        
        물론 `useInfiniteQuery` 없이 `IntersectionObserver`를 통해서 직접 위치를 감지해서 구현할 수 있어요, 하지만 라이브러리를 사용하면 정말 쉽고 간편하게 구현하고자하는 바를 구현할 수 있어요.
        
        </aside>
        
        ---
        
        # 원리: 내부 동작 흐름 이해하기
        
        ```mermaid
        flowchart LR
          A[초기 렌더] --> B[초기 페이지 요청]
          B --> C[응답을 pages 0에 저장]
          C --> D{다음 페이지 결정}
          D -->|다음 pageParam| E[fetchNextPage로 다음 요청]
          D -->|없음| F[더 없음: 로딩 종료]
          E --> G[응답을 pages n에 누적]
          G --> D
        ```
        
        - **initialPageParam**: 첫 페이지 요청 값이에요(예: 1).
        - **getNextPageParam**: 서버 응답을 바탕으로 **다음 페이지 파라미터**를 계산해요. 없으면 `undefined`를 반환해 종료해요.
        - **data.pages**: 받아온 페이지들이 순서대로 누적돼요.
        - **fetchNextPage / hasNextPage**: “다음 불러오기”/“더 있음 여부”를 제어해요.
        
        ---
        
    - **useInfiniteQuery** 주요 옵션
        
        ### **useInfiniteQuery**의 주요 옵션
        
        - **주요 옵션들**
            - **queryKey**
                - 캐싱 및 식별을 위한 유니크 키 (배열 형태 권장)
            - **queryFn**
                - 페이지 정보를 받아 비동기 데이터 패칭 함수. 기본적으로 `pageParam` 값을 사용하며, 초기값을 설정할 수 있음.
            - **getNextPageParam**
                - 마지막 페이지 데이터를 바탕으로 다음 페이지의 `pageParam` 값을 결정하는 함수
                - 반환 값이 `false` 혹은 `undefined`이면 추가 페이지가 없음을 의미합니다.
            - **getPreviousPageParam**
                - (필요한 경우) 이전 페이지의 파라미터를 결정하는 함수
            - **staleTime, cacheTime 등**
                - 일반 useQuery와 유사하게 데이터의 신선도 및 캐싱 전략을 설정할 수 있음
            - **refetchOnWindowFocus, enabled 등**
                - 조건부 패칭 및 자동 재요청 옵션들을 동일하게 활용 가능
    - **`무한 스크롤`** 직접 구현해보기 **🍠**
        
        ## 1. 무한 스크롤이 뭔가요?
        
        ### 🤔 일상에서 경험하는 무한 스크롤
        
        여러분이 인스타그램, 페이스북, 또는 유튜브 쇼츠를 볼 때를 생각해보세요. 스크롤을 내리면 계속해서 새로운 콘텐츠가 나타나죠? 이게 바로 **무한 스크롤**입니다.
        
        [화면 기록 2025-10-12 오후 5.33.56.mov](attachment:dd5cf5f5-5b34-44da-9e1b-5d76c74580dc:화면_기록_2025-10-12_오후_5.33.56.mov)
        
        ### 📖 기술적 정의
        
        - 사용자가 페이지 하단에 도달하면 자동으로 다음 데이터를 불러오는 기능
        - "2페이지로 이동" 같은 페이지네이션 버튼이 필요 없음
        - 끊김 없는 사용자 경험 제공
        
        ### ✅ 장점
        
        무한 스크롤은 이런 장점들이 있어요:
        
        - **사용자 편의성**: 클릭을 계속 안 해도 돼요
        - **모바일 최적화**: 터치 환경에서 특히 효과적이에요
        - **자연스러운 탐색**: 콘텐츠를 발견하는 과정이 부드러워요
        - **참여도 향상**: 사용자가 더 오래 머물게 돼요
        
        ---
        
        ## 2. Tanstack(React) Query는 왜 쓰나요?
        
        ### 😰 기존 방식의 문제점
        
        무한 스크롤을 직접 구현하려면:
        
        ```jsx
        // 이런 것들을 직접 관리해야 해요
        const [data, setData] = useState([]);
        const [page, setPage] = useState(1);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [hasMore, setHasMore] = useState(true);
        
        // fetch 로직 직접 작성
        // 에러 처리 직접 작성
        // 로딩 상태 관리 직접 작성
        // 캐싱 로직 직접 작성 (선택)
        ```
        
        너무 복잡하죠? 😵
        
        ### 💪 React Query가 해결해주는 것들
        
        1. **자동 캐싱**: 한 번 불러온 데이터를 기억해요
        2. **로딩/에러 상태**: 알아서 관리해줘요
        3. **리페칭**: 데이터가 오래되면 자동으로 새로고침
        4. **무한 스크롤 전용 훅**: `useInfiniteQuery`라는 편리한 도구 제공
        
        ### 📦 결과
        
        우리는 비즈니스 로직에만 집중할 수 있어요!
        
        ---
        
        ## 3. 프로젝트 준비하기
        
        ### 📦 패키지 설치
        
        터미널에서 다음 명령어를 실행하세요:
        
        ```bash
        pnpm add @tanstack/react-query
        
        npm install @tanstack/react-query
        
        yarn add @tanstack/react-query
        
        bun add @tanstack/react-query
        ```
        
        ### 🛠️ 개발 도구 추가 (선택사항)
        
        React Query의 상태를 눈으로 확인할 수 있는 DevTools도 설치하면 좋아요:
        
        ```bash
        pnpm add -D @tanstack/react-query-devtools
        
        npm install -D @tanstack/react-query-devtools
        
        yarn add -D @tanstack/react-query-devtools
        
        bun add -D @tanstack/react-query-devtools
        ```
        
        이 도구는 개발 중에만 사용되므로 `-D` 옵션을 붙여요.
        
        ---
        
        ## 4. 기본 설정: QueryClient 세팅
        
        ### 🎯 목표
        
        React Query를 사용하려면 앱 전체를 `QueryClientProvider`로 감싸야 해요. 이게 React Query의 "본부" 역할을 합니다.
        
        ### 📝 App.tsx 수정하기
        
        ```tsx
        // App.tsx
        import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
        import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
        
        // 1. QueryClient 인스턴스 생성
        //    이 객체가 모든 쿼리 상태를 관리해요
        const queryClient = new QueryClient();
        
        const App = () => {
          return (
            // 2. Provider로 앱을 감싸기
            //    이제 하위 컴포넌트에서 React Query를 사용할 수 있어요
            <QueryClientProvider client={queryClient}>
        
              {/* 여기에 여러분의 컴포넌트들이 들어가요 */}
              <h1>내 앱</h1>
        
              {/* 3. 개발 도구 추가 (개발 환경에서만 보여요) */}
              {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
            </QueryClientProvider>
          );
        };
        
        export default App;
        
        ```
        
        ### 🔍 코드 설명
        
        | 코드 | 설명 |
        | --- | --- |
        | `new QueryClient()` | React Query의 중앙 관리 객체를 만들어요 |
        | `QueryClientProvider` | React Context처럼 하위 컴포넌트에 기능을 전달해요 |
        | `ReactQueryDevtools` | 화면 하단에 디버깅 도구를 추가해요 |
        | `import.meta.env.DEV` | Vite 환경변수로, 개발 모드일 때만 true예요 |
        
        ---
        
        ## 5. 첫 번째 실습: 버튼으로 더보기
        
        ### 🎯 목표
        
        "더 보기" 버튼을 클릭하면 다음 페이지 데이터를 불러오는 기능을 만들어봐요.
        
        ### 📝 컴포넌트 만들기
        
        `components/InfinitePostsJsonPlaceholder.tsx` 파일을 생성하세요:
        
        ```tsx
        import { useInfiniteQuery } from '@tanstack/react-query';
        
        // 1. 데이터 인터페이스 정의
        //    TypeScript를 쓰면 자동완성이 되고 오타를 방지할 수 있어요
        interface Post {
          id: number;
          title: string;
          body: string
        };
        
        // 2. 한 번에 가져올 게시글 개수
        const PAGE_SIZE = 10;
        
        // 3. 데이터 가져오는 함수
        //    pageParam: 현재 페이지 번호 (1, 2, 3, ...)
        async function fetchPosts({ pageParam = 1 }: { pageParam?: number }) {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${PAGE_SIZE}`
          );
        
          if (!res.ok) {
            throw new Error('네트워크 에러');
          }
        
          return (await res.json()) as Post[];
        }
        
        // 4. 메인 컴포넌트
        export default function InfinitePostsJsonPlaceholder() {
          // 5. useInfiniteQuery 훅 사용
          const {
            data,              // 지금까지 불러온 모든 데이터
            error,             // 에러가 있으면 여기에 담겨요
            isLoading,         // 처음 로딩 중인지
            fetchNextPage,     // 다음 페이지 불러오는 함수
            hasNextPage,       // 다음 페이지가 있는지
            isFetchingNextPage, // 다음 페이지 로딩 중인지
            status,            // 전체 상태 ('loading', 'error', 'success')
          } = useInfiniteQuery({
            // queryKey: 이 쿼리를 식별하는 고유 키
            //           배열 형태로 쓰고, 값이 바뀌면 새로운 쿼리로 취급해요
            queryKey: ['posts', PAGE_SIZE],
        
            // queryFn: 실제 데이터를 가져오는 함수
            queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
        
            // initialPageParam: 첫 페이지 번호
            initialPageParam: 1,
        
            // getNextPageParam: 다음 페이지 번호를 계산하는 함수
            //   - lastPage: 방금 불러온 페이지의 데이터
            //   - allPages: 지금까지 불러온 모든 페이지의 배열
            //   - undefined를 반환하면 "더 이상 페이지 없음"
            getNextPageParam: (lastPage, allPages) => {
              // 마지막 페이지의 데이터가 PAGE_SIZE보다 적으면 끝!
              const isLast = lastPage.length < PAGE_SIZE;
              return isLast ? undefined : allPages.length + 1;
            },
          });
        
          // 6. 로딩 상태 처리
          if (isLoading) {
            return <div>로딩 중이에요...</div>;
          }
        
          // 7. 에러 상태 처리
          if (error) {
            return <div>에러가 발생했어요: {error.message}</div>;
          }
        
          // 8. 데이터 렌더링
          return (
            <div>
              {/* data.pages는 배열의 배열이에요
                  예: [[post1~10], [post11~20], [post21~30]] */}
              {data?.pages.map((page, pageIndex) => (
                <ul key={pageIndex} style={{ marginBottom: 16 }}>
                  {page.map((post) => (
                    <li key={post.id}>
                      <strong>#{post.id}</strong> {post.title}
                    </li>
                  ))}
                </ul>
              ))}
        
              {/* 9. 더보기 버튼 */}
              <div>
                {hasNextPage ? (
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? '불러오는 중...' : '더 보기'}
                  </button>
                ) : (
                  <span>마지막 페이지예요.</span>
                )}
              </div>
        
              {/* 10. 디버깅용 상태 표시 */}
              <div style={{ marginTop: 8, fontSize: 12, color: '#555' }}>
                상태: {status} / 다음 페이지 가능: {String(!!hasNextPage)}
              </div>
            </div>
          );
        }
        
        ```
        
        ### 🔗 App.tsx에 연결하기
        
        ```tsx
        import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
        import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
        import InfinitePostsJsonPlaceholder from './components/InfinitePostsJsonPlaceholder';
        
        const queryClient = new QueryClient();
        
        const App = () => {
          return (
            <QueryClientProvider client={queryClient}>
              <InfinitePostsJsonPlaceholder />
              {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
            </QueryClientProvider>
          );
        };
        
        export default App;
        
        ```
        
        ### ✅ 작동 확인
        
        1. 브라우저를 열면 게시글 10개가 보여요
        2. "더 보기" 버튼을 클릭하면 다음 10개가 추가돼요
        3. 버튼을 계속 누르면 게시글이 계속 쌓여요
        4. 마지막 페이지에 도달하면 "마지막 페이지예요" 메시지가 나타나요
        
        [화면 기록 2025-10-12 오후 5.36.57.mov](attachment:083b70c8-9630-4ae1-b384-eb06a2ca5994:화면_기록_2025-10-12_오후_5.36.57.mov)
        
        ### 🧠 핵심 개념 정리
        
        ### `data.pages` 구조
        
        ```jsx
        {
          pages: [
            [post1, post2, ..., post10],    // 첫 번째 페이지
            [post11, post12, ..., post20],  // 두 번째 페이지
            [post21, post22, ..., post30],  // 세 번째 페이지
          ],
          pageParams: [1, 2, 3] // 각 페이지에 사용된 pageParam
        }
        
        ```
        
        ### `getNextPageParam` 로직
        
        ```jsx
        getNextPageParam: (lastPage, allPages) => {
          // lastPage.length < PAGE_SIZE 이면 더 이상 데이터가 없다는 뜻
          const isLast = lastPage.length < PAGE_SIZE;
        
          // undefined를 반환하면 hasNextPage가 false가 돼요
          // 숫자를 반환하면 그 숫자가 다음 pageParam이 돼요
          return isLast ? undefined : allPages.length + 1;
        }
        
        ```
        
        ---
        
        ## 6. 두 번째 실습: 진짜 무한 스크롤
        
        ### 🎯 목표
        
        스크롤이 하단에 도달하면 자동으로 다음 페이지를 불러오도록 만들어봐요.
        
        ### 🔍 핵심 기술: Intersection Observer
        
        **Intersection Observer**는 특정 요소가 화면에 보이는지 감지하는 브라우저 API예요.
        
        ### 작동 원리
        
        1. 페이지 맨 아래에 보이지 않는 요소(sentinel)를 배치
        2. 사용자가 스크롤해서 그 요소가 화면에 나타나면
        3. 자동으로 다음 페이지를 불러와요
        
        ### 📝 컴포넌트 만들기
        
        `components/InfinitePostsAutoJsonPlaceholder.tsx` 파일을 생성하세요:
        
        ```tsx
        import { useInfiniteQuery } from '@tanstack/react-query';
        import { useEffect, useRef } from 'react';
        
        // 1. 타입과 상수는 동일
        interface Post {
          id: number;
          title: string;
          body: string;
        }
        
        const PAGE_SIZE = 10;
        
        // 2. fetch 함수도 동일
        async function fetchPosts({ pageParam = 1 }: { pageParam?: number }) {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${PAGE_SIZE}`
          );
          if (!res.ok) throw new Error('네트워크 에러');
          return (await res.json()) as Post[];
        }
        
        export default function InfinitePostsAutoJsonPlaceholder() {
          // 3. useInfiniteQuery 사용 (이전과 동일)
          const {
            data,
            fetchNextPage,
            hasNextPage,
            isFetchingNextPage
          } = useInfiniteQuery({
            queryKey: ['posts', PAGE_SIZE],
            queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) =>
              lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1,
          });
        
          // 4. 센티널 요소를 참조하기 위한 ref
          //    useRef는 특정 DOM 요소를 직접 접근할 때 사용해요
          const sentinelRef = useRef<HTMLDivElement | null>(null);
        
          // 5. Intersection Observer 설정
          useEffect(() => {
            // 센티널 요소가 없으면 아무것도 안 해요
            if (!sentinelRef.current) return;
        
            const el = sentinelRef.current;
        
            // IntersectionObserver 생성
            const observer = new IntersectionObserver((entries) => {
              // entries[0]: 관찰 중인 요소의 상태
              const first = entries[0];
        
              // isIntersecting: 요소가 화면에 보이는가?
              // hasNextPage: 다음 페이지가 있는가?
              // !isFetchingNextPage: 현재 로딩 중이 아닌가?
              if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage(); // 조건 만족하면 다음 페이지 불러오기!
              }
            });
        
            // 센티널 요소 관찰 시작
            observer.observe(el);
        
            // 컴포넌트가 언마운트되면 관찰 중지
            return () => observer.disconnect();
          }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
          // 의존성 배열: 이 값들이 바뀌면 useEffect가 다시 실행돼요
        
          // 6. 렌더링
          return (
            <div>
              {/* 데이터 표시 */}
              {data?.pages.map((page, idx) => (
                <ul key={idx} style={{ marginBottom: 16 }}>
                  {page.map((post) => (
                    <li key={post.id}>
                      <strong>#{post.id}</strong> {post.title}
                    </li>
                  ))}
                </ul>
              ))}
        
              {/* 7. 센티널 요소 (스크롤 감지용) */}
              {/*    높이 1px의 보이지 않는 div */}
              <div ref={sentinelRef} style={{ height: 1 }} />
        
              {/* 8. 상태 메시지 */}
              <div style={{ padding: 8, textAlign: 'center', color: '#666' }}>
                {isFetchingNextPage
                  ? '불러오는 중이에요...'
                  : hasNextPage
                  ? '아래로 스크롤하면 더 가져와요.'
                  : '더 이상 데이터가 없어요.'}
              </div>
            </div>
          );
        }
        
        ```
        
        ### 🔗 App.tsx에서 사용하기
        
        ```tsx
        import InfinitePostsAutoJsonPlaceholder from './components/InfinitePostsAutoJsonPlaceholder';
        
        // ... QueryClient 설정은 동일
        
        const App = () => {
          return (
            <QueryClientProvider client={queryClient}>
              <InfinitePostsAutoJsonPlaceholder />
              {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
            </QueryClientProvider>
          );
        };
        
        ```
        
        ### ✅ 작동 확인
        
        1. 페이지가 로드되면 첫 10개의 게시글이 보여요
        2. 스크롤을 아래로 내리면
        3. 자동으로 다음 10개가 로딩돼요
        4. 계속 스크롤하면 계속 로딩돼요
        5. 모든 데이터를 불러오면 "더 이상 데이터가 없어요" 메시지
        
        [화면 기록 2025-10-12 오후 5.38.07.mov](attachment:80bbde19-3a2b-485d-bb2a-5d1d317938b6:화면_기록_2025-10-12_오후_5.38.07.mov)
        
        ### 🧠 핵심 개념 정리
        
        ### useRef vs useState
        
        | useRef | useState |
        | --- | --- |
        | 값이 바뀌어도 리렌더링 안 됨 | 값이 바뀌면 리렌더링 |
        | DOM 요소 참조에 사용 | 화면에 보이는 데이터 관리 |
        | `.current`로 접근 | 직접 접근 |
        
        ### Intersection Observer 옵션
        
        우리는 기본 옵션을 사용했지만, 더 세밀한 제어도 가능해요:
        
        ```jsx
        new IntersectionObserver(callback, {
          root: null,           // 뷰포트 기준 (기본값)
          rootMargin: '0px',    // 감지 영역 조정
          threshold: 0,         // 0~1, 요소가 얼마나 보여야 감지할지
        });
        ```
        
        예를 들어 `rootMargin: '100px'`로 설정하면 요소가 화면에 나타나기 100px 전에 미리 감지해요.
        
        ---
        
        ### 📚 공식 문서를 꼭 읽어보세요
        
        [Overview | TanStack Query React Docs](https://tanstack.com/query/latest/docs/framework/react/overview)
        
        [Infinite Queries | TanStack Query React Docs](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries)
        
        [Intersection Observer API - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)
        
        ---
        

---

- **Skeleton UI**
    - **Skeleton UI**란 무엇인가요?
        
        ## **Skeleton UI**란 무엇인가요?
        
        **Skeleton UI**는 말 그대로 ‘**뼈대(Skeleton)만 있는 사용자 인터페이스'**를 의미해요.
        
        ![스크린샷 2025-03-28 오후 11.01.33.png](attachment:35a96547-a4bf-451a-bdbe-bc0b7f3d72c2:4c713f07-2c48-4c29-9e25-68b71c971982.png)
        
        웹사이트나 앱이 데이터를 불러오는 동안 (**로딩 중**일 때), 사용자에게 **텅 빈 하얀 화면** 대신 실제 콘텐츠가 들어갈 **자리와 윤곽을 미리 보여주는** 디자인 기법입니다. 보통 회색 박스나 선 형태로 나타나며, 실제 이미지나 텍스트처럼 보이지는 않지만, 최종 화면의 레이아웃(구조)을 짐작하게 해줘요.
        
        ---
        
        ### 🦴 왜 '뼈대'를 보여줄까요?
        
        우리가 어떤 웹페이지에 접속했는데 데이터가 느리게 로딩되어 아무것도 뜨지 않고 하얀 화면만 보고 있다면, '이게 작동하고 있는 건가?', '언제쯤 뜨는 거지?' 하고 **불안감**이나 **지루함**을 느끼고 결국 페이지를 닫아버릴 확률이 높아요.
        
        **Skeleton UI**는 이런 불안감을 줄이고, "지금 데이터가 로딩 중이고, 곧 이런 내용들이 채워질 거예요"라는 긍정적인 신호를 시각적으로 전달하여 사용자 경험(UX)을 개선하는 핵심적인 방법입니다.
        
    - **Skeleton UI**를 활용했을 때 장점과 단점
        
        # **Skeleton UI**를 활용했을 때 장점과 단점
        
        ---
        
        ### ➕ 장점 (좋은 점)
        
        | 장점 | 설명 |
        | --- | --- |
        | **체감 로딩 시간 감소 (가장 중요! 👍)** | 실제 로딩 시간이 똑같더라도, 사용자는 빈 화면을 볼 때보다 **Skeleton UI**를 볼 때 **기다림이 덜 지루**하고 **더 빠르게 느껴요** (심리적 효과). |
        | **사용자 이탈률 감소** | 빈 화면은 '멈춤'이나 '오류'처럼 보일 수 있지만, 스켈레톤은 '작동 중'임을 알려주므로 사용자가 페이지를 닫고 떠나는 것을 막아줍니다. |
        | **시각적 일관성 유지** | 데이터가 로드된 후 UI가 갑자기 튀어나오는(점프하는) 대신, 스켈레톤이 실제 콘텐츠로 자연스럽게 **채워지듯이** 바뀌어 화면 전환이 부드럽습니다. |
        | **피드백 제공** | 사용자에게 시스템이 **제대로 작동하고 있다**는 명확한 시각적 피드백을 주어 신뢰도를 높입니다. |
        
        ---
        
        ### ➖ 단점 (주의할 점)
        
        | 단점 | 설명 |
        | --- | --- |
        | **제작 및 관리 비용** | **Skeleton UI**는 페이지마다 **실제 UI와 유사하게** 뼈대를 디자인하고 구현해야 합니다. 화면이 많거나 자주 바뀐다면 개발 리소스(시간과 노력)가 더 많이 들 수 있어요. |
        | **로딩이 짧을 때 역효과** | API 응답 시간이 **매우 짧을 때** (예: 200ms 미만), **Skeleton UI**가 **잠깐 보였다 사라지면** 오히려 화면이 깜빡이는 것처럼 느껴져 사용자 경험을 해칠 수 있습니다. |
        | **실제 UI와의 유사성** | **Skeleton UI**의 형태가 최종 콘텐츠의 레이아웃과 **너무 다르면** 사용자가 혼란을 느낄 수 있습니다. 최대한 실제 UI의 구조(글자 길이, 이미지 위치 등)를 모방해야 합니다. |

# 🍠 미션 1. **useQuery**로 LP 목록/상세 화면 만들기

---

<aside>
🍠 이번 미션은 **그동안 만든 LP 페이지(목록/상세)**를 그대로 활용하되, **커스텀 훅(Custom Hook)**으로 데이터 패칭, 로딩, 에러 처리를 만든 과정을 **useQuery**로 변경을 해보는 과정입니다. 

아래 체크리스트와 단계별 가이드를 따라 구현해 보세요.

**- 중앙 웹 파트장 매튜 김용민 -**

</aside>

---

### 📗 Swagger 문서 읽는법

<aside>
🍠

현재 **Chapter 4와 Chapter 5 워크북**을 진행하시는 과정에서 **Swagger 문서**를 잘못 해석하거나 이해하는 데 어려움을 겪는 분들이 계신 것을 피드백을 통해 확인할 수 있었습니다.

이에 여러분들의 **정확하고 원활한 학습**을 돕기 위해, 라이브 방송에서 진행했던 **Swagger 문서 읽는 법에 대한 추가 강의 영상**을 긴급히 촬영하여 제공하기로 결정했습니다.

---

### 📹 추가 강의 영상 제공 정보

- **제공일:** 2025년 10월 17일 (금) 부

---

### ⚠️ 중요 요청 사항

**Swagger에 대해 이미 잘 알고 있다고 생각하시더라도, 놓치고 있는 부분이 있을 수 있습니다.** **Chapter 6 미션**을 진행하시기 전에 **반드시 이 추가 강의 영상을 시청해 주시기를 간곡히 부탁드립니다.** 이 영상은 **워크북 진행의 정확도를 높이는 데 결정적인 도움**이 될 것입니다.

---

### 📢 참고 및 구독 안내

주기적으로 **라이브 방송**을 통해 질문을 받으며, 매주 1편 이상의 주신 피드백 관련하여 영상을 촬영해서 업로드 할 예정입니다. [유튜브 구독](https://www.youtube.com/@yongcoding)을 해주시면 놓치지 않고 보실 수 있습니다!

---

감사합니다.

**- 중앙 웹 파트장 매튜 김용민 -** 

</aside>

https://youtu.be/Ad-yRtGlBq8?si=G9_1hFtOou4Cc7H-

---

### 🎥 강의 영상

<aside>
🍠

만약 미션을 진행하다가 막히는 부분이 생긴다면, 아래 방법을 활용해 문제를 해결해보세요.

1. **공식 문서와 검색을 최우선으로 활용해 주세요.**
    - **가장 빠르고 정확한 해답**을 찾을 수 있는 가장 좋은 방법입니다.
    - 에러 메시지나 궁금한 점을 직접 검색하며 스스로 답을 찾는 연습을 해보세요.
2. **그래도 해결되지 않을 때 AI에게 물어보세요.**
    - AI는 방대한 지식을 바탕으로 여러분이 겪는 문제를 해결하는 데 큰 도움을 줄 수 있습니다.
    - 에러 코드, 원하는 기능, 현재까지 작성한 코드 등을 함께 질문하면 더욱 정확한 답변을 얻을 수 있습니다.
3. **마지막 수단으로 영상을 활용해 주세요.**
    - 영상을 처음부터 끝까지 보기보다는, **필요한 부분만 찾아서** 미션을 해결하는 데 힌트를 얻는 용도로 활용해 보세요.

**- 중앙 웹 파트장 매튜 김용민 -**

</aside>

https://www.youtube.com/watch?v=WqaxquglERg&t=3110s

---

### ✅ 미션 체크리스트

### 레이아웃 (헤더 / 사이드바 / 메인)

- [x]  기본 레이아웃이 헤더/사이드바/메인이 동시에 노출되도록 구성하셨나요? 레이아웃이 깨지는 뷰포트를 점검하고 CSS를 조정해주세요.
- [x]  우측 하단 플로팅 버튼(+)이 보이도록 배치하셨나요? 클릭 시 의도한 경로로 라우팅해주세요.
    
    ![Screenshot 2025-03-06 at 9.38.15 AM.png](attachment:247beec3-b66d-48c6-a620-fdb6157f4e44:Screenshot_2025-03-06_at_9.38.15_AM.png)
    
- [x]  비로그인 상태에서 헤더에 “로그인/회원가입” 버튼이 노출되나요? 각각 `/login`, `/signup`으로 라우팅해주세요.
    
    ![스크린샷 2025-03-28 오후 10.16.32.png](attachment:4fc5edb9-a2b7-4cd3-9216-26481333e654:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-03-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_10.16.32.png)
    
- [x]  로그인 상태에서 “(닉네임)님 반갑습니다.” 문구가 실제 상태 값으로 보이도록 구현하셨나요? 상태값을 연동하고, 필요한 경우 환영 문구 영역을 조건부 렌더링으로 라우팅해주세요.
    
    ![스크린샷 2025-03-28 오후 10.18.56.png](attachment:1c96bc77-72b0-4ca8-8624-1269409917eb:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-03-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_10.18.56.png)
    
    ![스크린샷 2025-03-28 오후 10.18.56.png](attachment:1c96bc77-72b0-4ca8-8624-1269409917eb:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-03-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_10.18.56.png)
    

### 반응형 사이드바

- [x]  모바일/협소 화면에서 사이드바가 기본 숨김 처리되나요? 버거 버튼 클릭 시 열리도록 구성해주세요.
    - [x]  아래 버거 아이콘을 활용해주세요.
        - **`SVG`** 버거 코드
            
            ```tsx
             <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/></svg>
            ```
            
        - **`SVG`** 버거 이미지
            
            ![hamburger-button.svg](attachment:d261b61b-676f-4136-b5b4-e9fdd1a32738:hamburger-button.svg)
            
        - 어떤식으로 **`Vite`** 환경에서 **`SVG`**를 활용할 수 있을까요? 검색 후 정리해주세요!
            
            ### 정리
            
    
    [화면 기록 2025-03-28 오후 10.07.51.mov](attachment:9b6c57d6-d83e-4330-93c5-ccca997f1b34:%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2025-03-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_10.07.51.mov)
    
- [x]  사이드바 외부 영역을 클릭하면 닫히도록 처리하셨나요?

### 목록 화면(**useQuery** + 정렬)

- [x]  `/v1/lps` 목록 요청을 `useQuery({ queryKey: ['lps', sort], queryFn })`로 전환하셨나요? 정렬 변경 시 자동 리패치되도록 `sort`를 `queryKey`에 포함해주세요.
- [x]  정렬 버튼으로 최신순/오래된순이 전환되나요? 토글 로직을 연결하고 결과를 즉시 반영해주세요.
- [x]  캐시 정책이 의도대로 동작하나요? `staleTime`/`gcTime`을 설정하고 체감을 확인해주세요.
- [x]  로딩/에러 상태가 사용자에게 명확히 노출되나요? 스켈레톤(또는 스피너)와 재시도 버튼을 제공해주세요.

### 카드 인터랙션/라우팅

- [x]  카드 Hover 시 확대·오버레이·메타 정보(제목/업로드일/좋아요)가 노출되나요? 스타일을 점검하고 통일해주세요.
    
    ![스크린샷 2025-03-28 오후 10.21.30.png](attachment:a10136ef-87f0-4bf9-8acf-602d0765425c:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-03-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_10.21.30.png)
    
- [x]  카드를 클릭하면 해당 `id`로 `/lp/:lpid` 라우팅되나요? 경로 파라미터를 연결해주세요.

### 상세 화면

![Screenshot 2025-03-06 at 11.29.05 AM.png](attachment:bcac7815-71fe-419d-9853-084d1793e96f:Screenshot_2025-03-06_at_11.29.05_AM.png)

- [x]  `/lp/:lpid` 상세를 `useQuery({ queryKey: ['lp', lpid] })`로 패칭하셨나요? 키에 `lpid`를 포함해 주세요.
- [x]  제목/업로드일/좋아요/썸네일/본문이 구분되어 보기 좋게 렌더되나요? 섹션 레이아웃을 정리해주세요.
- [x]  수정/삭제/좋아요 버튼이 UI로 배치되어 있나요?
- [x]  로딩/에러 상태가 목록과 동일 패턴으로 표현되나요? 동일 컴포넌트로 통일해주세요.

### 보호 라우트

- [x]  비로그인 사용자가 상세 URL 접근 시 경고 모달이 뜨나요? 확인 시 `/login`으로 라우팅해주세요.
    
    ![스크린샷 2025-03-28 오후 10.10.03.png](attachment:0e622e63-35b4-4435-8eae-623c10fab477:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-03-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_10.10.03.png)
    
- [x]  로그인 성공 후 원래 가려던 페이지로 복귀되나요?
    
    ![Screenshot 2025-03-06 at 11.29.05 AM.png](attachment:bcac7815-71fe-419d-9853-084d1793e96f:Screenshot_2025-03-06_at_11.29.05_AM.png)
    

### 🍠  미션 1. 제출

- 깃허브 주소
- 실행 영상

---

# 🍠 미션 2.  무한스크롤 부분 **useInfiniteQuery**로 무한스크롤 구현해보기 + 스켈레톤 UI

---

<aside>
🍠 이번 미션은 미션 1에서 만든 부분 중 무한스크롤이 적용 가능 한 부분은 **useInfiniteQuery**를 활용하여 무한스크롤을 적용하고, 로딩 처리 부분 또한 **`SkeletonUI`**를 적용해보는 미션입니다.

아래 체크리스트와 단계별 가이드를 따라 구현해 보세요.

**- 중앙 웹 파트장 매튜 김용민 -**

</aside>

---

### 🎥 강의 영상

<aside>
🍠

만약 미션을 진행하다가 막히는 부분이 생긴다면, 아래 방법을 활용해 문제를 해결해보세요.

1. **공식 문서와 검색을 최우선으로 활용해 주세요.**
    - **가장 빠르고 정확한 해답**을 찾을 수 있는 가장 좋은 방법입니다.
    - 에러 메시지나 궁금한 점을 직접 검색하며 스스로 답을 찾는 연습을 해보세요.
2. **그래도 해결되지 않을 때 AI에게 물어보세요.**
    - AI는 방대한 지식을 바탕으로 여러분이 겪는 문제를 해결하는 데 큰 도움을 줄 수 있습니다.
    - 에러 코드, 원하는 기능, 현재까지 작성한 코드 등을 함께 질문하면 더욱 정확한 답변을 얻을 수 있습니다.
3. **마지막 수단으로 영상을 활용해 주세요.**
    - 영상을 처음부터 끝까지 보기보다는, **필요한 부분만 찾아서** 미션을 해결하는 데 힌트를 얻는 용도로 활용해 보세요.

**- 중앙 웹 파트장 매튜 김용민 -**

</aside>

https://www.youtube.com/watch?v=pkdlLHZWs80&t=2516s

### 메인 페이지

- [x]  목록 화면을 **useInfiniteQuery**로 전환하셨나요? `queryKey: ['lps', sort]`, `getNextPageParam`을 구현하고, 트리거에서 `fetchNextPage()`를 호출해주세요.
    
    [화면 기록 2025-03-29 오전 12.08.52.mov](attachment:0b0aef96-9ffb-4d00-a539-ced5348884eb:%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2025-03-29_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_12.08.52.mov)
    
- [x]  **Skeleton UI**로 로딩을 표현하셨나요? 카드와 동일 크기의 스켈레톤을 렌더하고, `isLoading`/`isFetchingNextPage`에 따라 상단/하단에 각각 표시해주세요. 깜빡이는(쉼머/펄스) 애니메이션을 적용해주세요.
    
    ![스크린샷 2025-03-28 오후 11.49.22.png](attachment:b9ecb52f-b29d-4915-b6fc-ad512bb23a67:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-03-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_11.49.22.png)
    

---

### Lp 상세 페이지

- [x]  `/lp/:LPId` 댓글 목록을 **useInfiniteQuery**로 가져오셨나요? `queryKey: ['lpComments', lpId, order]`로 선언하고, 트리거에서 `fetchNextPage()`로 추가 데이터를 불러와주세요.
- [x]  오래된순/최신순 정렬이 즉시 반영되나요? `order`를 `queryKey`에 포함하고, 변경 시 첫 페이지부터 다시 로딩하도록 라우팅해주세요.
- [x]  댓글 작성란은 디자인만 구현하셨나요? 입력 필드·버튼·유효성 안내를 UI로 배치해주세요.
    
    ![스크린샷 2025-03-28 오후 10.33.18.png](attachment:1a39eac8-9f38-4bbb-ada8-2bc4d997f3cf:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-03-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_10.33.18.png)
    
- [x]  댓글 로딩에 **Skeleton UI**를 적용하셨나요? 메인 화면과 동일한 애니메이션을 재사용하고, 초기 로딩은 상단, 추가 로딩은 하단에만 **Skeleton UI**을 표시해주세요.
    
    ![스크린샷 2025-03-28 오후 11.01.33.png](attachment:35a96547-a4bf-451a-bdbe-bc0b7f3d72c2:4c713f07-2c48-4c29-9e25-68b71c971982.png)
    

### 🔥 미션 2. 제출

- 깃허브 주소
- 실행 영상

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
    

# 🥕 **TanStack Query vs SWR, 누가 왕좌를 차지할까?**

---

<aside>
🥕

서버 상태 관리 라이브러리인 SWR과 TanStack Query를 React TypeScript 환경에서 비교하며, 왜 기존에 Redux, MobX 같은 전통적인 상태관리 라이브러리 대신 서버 상태 관리 라이브러리를 도입하는지, 그리고 최신 사용자 비율과 각각의 장단점, 기능 차이를 재밌게 정리해보았어요.

참고로, 이 글의 내용은 전부 **Perplexity**를 기반으로 정리했습니다.

</aside>

[**TanStack Query vs SWR, 누가 왕좌를 차지할까?**](https://www.notion.so/TanStack-Query-vs-SWR-291b57f4596b81b2b8a8c4161d206c18?pvs=21)

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

[Overview | TanStack Query React Docs](https://tanstack.com/query/latest/docs/framework/react/overview)

[Infinite Queries | TanStack Query React Docs](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries)

[Intersection Observer API - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)

[개발자 매튜 | React Query 알고 쓰기](https://www.yolog.co.kr/post/react-query/)

[React Query 알고 쓰기](https://youtu.be/kMaiDlYvua0?si=LwQ6pJU-AlRWlDpS)

[OpenAPI/Swagger 문서 읽는 법: 파라미터·응답·에러까지](https://youtu.be/Ad-yRtGlBq8?si=91h5sJBpLyXDaGFG)

# 🛡️ 저작권

---

**© 2025 [Kim Yongmin (Matthew)](https://www.youtube.com/@yongcoding). All rights reserved.**