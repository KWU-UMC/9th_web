# 📝 학습 목표

---

이번 학습 목표는 **React**의 핵심 기술 스택을 활용하여 동적이고 기능적인 웹 애플리케이션을 만드는 것입니다.

**1. 핵심 기술 스택 학습**

- **Tailwind CSS:** 컴포넌트 기반 UI를 빠르고 효율적으로 디자인하는 방법을 익힙니다.
- **React Router:** 다중 페이지 라우팅을 구현하여 사용자 경험을 향상시킵니다.
- **useEffect & API 통신:** 외부 API에서 데이터를 비동기적으로 가져오는 방법을 마스터합니다.

---

**2. 프로젝트 구현**

- **영화 데이터 시각화:** 영화 API를 활용해 인기, 평점, 개봉 예정 등 다양한 영화 목록을 표시하는 UI를 구현합니다.
- **사용자 인터랙션 강화:** 로딩 상태와 에러를 처리하여 안정적인 애플리케이션을 만들고, 페이지네이션을 통해 많은 데이터를 효율적으로 관리합니다.
- **동적 라우팅:** useParams를 사용해 영화 상세 페이지를 구현함으로써, 개별 콘텐츠에 대한 접근성을 높입니다.

---

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

---

# 📸 잠깐 ! 스터디 인증샷은 찍으셨나요?📸

---

* 스터디리더께서 대표로 매 주차마다 한 장 남겨주시면 좋겠습니다!🙆💗
 (사진을 저장해서 이미지 임베드를 하셔도 좋고, 복사+붙여넣기해서 넣어주셔도 좋습니다!)

[]()

---

# 🍠 Tailwind CSS

---

<aside>
🍠

아래 핵심 키워드를 진행하시기 전에, 꼭 TailwindCSS 세팅을 진행하고 해주세요!

</aside>

[**TailwindCSS v4 설치 방법 (Using Vite)** ](https://www.notion.so/TailwindCSS-v4-Using-Vite-274b57f4596b81f79c14e482d40cc29b?pvs=21)

- **Tailwind CSS**
    
    # Tailwind CSS
    
    ## Tailwind CSS **란?**
    
    Tailwind CSS 는 **유틸리티 퍼스트(Utility-First)** 접근 방식을 기반으로 하는 최신 CSS 프레임워크예요.
    
    스타일을 CSS 파일에 따로 작성하는 대신, **미리 정의된 유틸리티 클래스들을 HTML/JSX 코드에서 직접 사용**해서 빠르게 UI를 구현할 수 있어요.
    
    ---
    
    ## Tailwind CSS **v4의 주요 특징**
    
    ### 1. Utility-First
    
    - `p-4`, `bg-blue-500`, `text-center` 와 같은 **짧고 직관적인 유틸리티 클래스**를 조합해서 UI를 구성해요.
        
        Tailwind CSS는 **짧고 직관적인 유틸리티 클래스**들을 조합해서 UI를 구성하는 방식이에요.
        
        CSS 속성을 직접 작성하지 않고, 클래스 이름만으로 스타일을 적용할 수 있어요.
        
        예를 들어,
        
        ```html
        <div className="p-4 bg-blue-500 text-center">
          매튜의 고구마 코딩
        </div>
        ```
        
        위의 코드에서 적용되는 스타일은 아래와 같아요.
        
        1. **`p-4` → padding: 1rem; (16px)**
            - `p`는 padding을 의미하고, `4`는 Tailwind의 spacing scale에서 1rem을 뜻해요.
            - `p-2`는 0.5rem, `p-8`은 2rem 이런 식으로 확장돼요.
        2. **`bg-blue-500` → background-color: #3B82F6;**
            - `bg`는 background를 의미하고, `blue-500`은 Tailwind가 제공하는 컬러 팔레트 중 하나예요.
            - 숫자가 높아질수록 색이 진해져요 (`blue-100`은 밝은 파랑, `blue-900`은 어두운 파랑).
        3. **`text-center` → text-align: center;**
            - `text-`는 글자 관련 속성을 의미하고, `center`는 중앙 정렬을 뜻해요.
        
        즉, 세 줄짜리 CSS를 따로 작성하지 않고, **한 줄 클래스 조합**으로 완성할 수 있어요.
        
    - 재사용성과 생산성이 높아지고, 별도의 CSS 파일 작성이 크게 줄어들어요.
    
    ---
    
    ### 2. Built-in JIT (Just-In-Time) 엔진
    
    - Tailwind v3부터 도입된 JIT은 v4에서 **더 강력해지고 기본 엔진으로 통합**되었어요.
    - 실제 코드에서 사용한 클래스만 빌드에 포함되므로 **최종 CSS 파일 크기를 크게 줄일 수 있어요.**
    - 예를 들어, JSX에서 `bg-[#123456]` 같은 임의 색상을 쓰면, JIT이 자동으로 해당 스타일을 생성해줘요.
    
    ---
    
    ### 3. 모바일 우선 (Mobile-First) 접근
    
    - 기본 스타일은 **모바일 기준**이에요.
    - 화면 크기에 따라 점진적으로 스타일을 확장하는 방식이라 반응형 디자인이 간단해요.
    - 예시:
        
        ```html
        <div class="text-sm md:text-base lg:text-lg">반응형 텍스트</div>
        ```
        
        - 기본: 작은 화면 → `text-sm`
        - `md:` (768px 이상) → `text-base`
        - `lg:` (1024px 이상) → `text-lg`
    
    ---
    
    ### 4. 구성 파일 (Configuration)
    
    - **v4에서는 더 간소화된 설정 방식**을 도입했어요.
    - `tailwind.config.js` 대신 `tailwind.config.ts` (TypeScript 지원) 사용이 권장돼요.
    - 주요 설정:
        - 색상, 폰트, 브레이크포인트 커스터마이징
        - 다크 모드 전략 설정
        - 플러그인 추가
    
    ---
    
    ### 5. Content Scanning (Purge)
    
    - v3까지는 `purge` 필드였지만, **v4부터는 content 필드를 더 단순화**했어요.
        - purge란?
            
            ### **purge란?**
            
            - Tailwind는 수천 개의 유틸리티 클래스를 기본적으로 포함해요.
            - 하지만 우리가 실제 사용하는 클래스는 그중 일부예요.
            - `purge` 옵션은 **실제 HTML, JS, TSX 등에서 사용한 클래스만 최종 빌드에 포함시키고, 나머지는 제거**하는 기능이에요.
            - 예전에는 `tailwind.config.ts`에서 이렇게 작성했어요:
            
            ```tsx
            module.exports = {
              purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
            }
            ```
            
        - content란?
            
            ### content란?
            
            - v3부터는 `purge` 대신 **`content` 필드**로 이름이 바뀌었어요.
            - 의미는 같지만, 더 직관적으로 바뀐 거예요.
            - "Tailwind가 클래스를 검색할 **콘텐츠 파일 경로**"를 지정하는 거예요.
            
            ```tsx
            // tailwind.config.ts (v4)
            export default {
              content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
            }
            ```
            
    - 예시 (`tailwind.config.ts`):
        
        ```tsx
        export default {
          content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
          theme: {
            extend: {},
          },
          plugins: [],
        }
        ```
        
    
    ---
    
    ### 6. 플러그인 시스템
    
    - v4에서도 여전히 **공식/커뮤니티 플러그인**을 통해 Tailwind를 확장할 수 있어요.
    - 예: forms, typography, aspect-ratio 같은 플러그인 활용 가능
    
    ---
    
    ### 7. 반응형 & 상태 기반 클래스
    
    - 반응형: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
    - 상태별: `hover:`, `focus:`, `active:`, `disabled:` 등
    - 조합도 가능:
        
        ```html
        <button class="bg-blue-500 hover:bg-blue-600 md:bg-green-500">
          버튼
        </button>
        ```
        
    
    ---
    
    ### 8. 다크 모드 지원
    
    - `dark:` 접두어를 사용해서 손쉽게 다크 모드를 구현할 수 있어요.
    - 예시:
        
        ```html
        <div class="bg-white dark:bg-black text-black dark:text-white">
          다크 모드 지원
        </div>
        ```
        
    - `tailwind.config.ts`에서 `darkMode: 'class'` 혹은 `'media'` 로 설정 가능해요.
    
    ---
    
    ## 공식문서 활용하기
    
    Tailwind CSS 공식 문서에서는 **유틸리티 클래스들을 주제별로 아주 친절하게** 정리해두었어요.
    
    예를 들어 `height` 관련 속성이 궁금하다면, 검색창에 `height`를 입력하면 바로 사용할 수 있는 클래스들을 볼 수 있어요.
    
    👉 [Tailwind CSS Docs - Width](https://tailwindcss.com/docs/width)
    
    ---
    

---

# 🎯 핵심 키워드

---

<aside>
🍠 주요 내용들에 대해 조사해보고, 자신만의 생각을 통해 정리해보세요!
레퍼런스를 참고하여 정의, 속성, 장단점 등을 적어주셔도 됩니다.
조사는 공식 홈페이지 **Best**, 블로그(최신 날짜) **Not Bad**

🍠 이모지가 달린 부분은, 여러분들이 직접 조사하여, 추가 작성하거나, 실습해보실 부분이니, 꼭 진행해주셔야 합니다!

</aside>

### **React Router**  🍠

아래, **React Router** 공식문서를 먼저 읽어보시고 공식문서에 익숙해져보세요!

[Installation](https://reactrouter.com/start/data/installation)

- **React Router**란?
    
    <aside>
    🍠
    
    **React Router 설명 이전에 아래의 내용을 먼저 학습하면 이해가 빨라져요!**
    
    </aside>
    
    - Routing (라우팅)
        
        # Routing (라우팅)
        
        `Routing`(라우팅)은 사용자가 웹 브라우저의 주소창에 **URL을 입력**했을 때,
        
        그 URL에 맞는 **페이지나 데이터를 찾아 사용자에게 보여주는 과정**이에요.
        
        ---
        
        ## Routing의 동작 원리
        
        1. 사용자가 특정 **URL**을 입력하거나, 링크를 클릭해 새로운 페이지를 요청해요.
        2. 요청된 **URL**에 해당하는 데이터를 서버가 찾아 응답해요.
        3. 서버는 해당 URL과 매핑된 **HTML, CSS, JavaScript 파일**을 클라이언트(사용자 브라우저)로 전달해요.
        4. 브라우저는 받은 데이터를 **렌더링**하여 화면에 페이지를 표시해요.
        5. 이 과정에서 **전체 페이지가 새로고침**되며, 새로운 HTML이 다시 로드돼요.
        
        ---
        
        ## Routing의 예시
        
        - 사용자가 `https://matthew.com/home`을 입력하면,
            
            서버는 `home.html` 파일을 찾아서 반환하고 브라우저가 화면에 띄워줘요.
            
        - 사용자가 `https://matthew.com/about`을 입력하면,
            
            서버는 `about.html` 파일을 반환하고 새로운 페이지가 로드돼요.
            
        
        즉, **URL마다 다른 페이지**가 로드되는 게 바로 "라우팅"이에요.
        
    - CSR (Client Side Rendering)
        
        ## CSR (Client-Side Routing)
        
        **Client-Side Rendering, 클라이언트 사이드 라우팅**은 React, Vue, Angular 같은 SPA(Single Page Application)에서 사용하는 방식이에요.
        
        ---
        
        ### 동작 방식
        
        1. 사용자가 처음 웹사이트에 접속하면, 서버는 **index.html (하나의 파일)**과 관련된 JS/CSS만 내려줘요.
        2. 이후 사용자가 `https://matthew.com/about` 같은 새로운 경로로 이동하면,
            
            서버에 새로운 HTML을 요청하는 것이 아니라,
            
            **앱 내부에서 필요한 데이터만 불러와 기존 화면 일부만 업데이트**해요.
            
        3. Navbar, Sidebar 같은 공통 UI는 유지되고,
            
            메인 콘텐츠(main body)만 바뀌어요.
            
        
        즉, **페이지 전체 새로고침이 일어나지 않아요.**
        
        ---
        
        ### 특징
        
        - 장점
            - 페이지 이동이 훨씬 빠르고, 앱처럼 부드럽게 동작해요.
            - 서버 요청이 줄어들어 네트워크 비용이 줄어들 수 있어요.
            - 공통 UI(헤더, 푸터, 사이드바 등)를 유지하면서 필요한 부분만 바꿀 수 있어요.
        - 단점
            - 초기 로딩 속도가 SSR보다 느릴 수 있어요 (처음에 JS를 많이 받아야 하기 때문).
            - SEO에 불리할 수 있어요 (검색 엔진이 JS 실행 전에는 내용을 못 읽음 → Next.js 같은 프레임워크가 이를 보완).
        
        ---
        
        ### 예시
        
        - React로 만든 SPA 앱.
        - Vue로 만든 SPA 앱.
        - Angular로 만든 SPA 앱.
    - SSR (Server Side Rendering)
        
        ## SSR (Server-Side Routing)
        
        **Server-Side Rendering, 서버 사이드 라우팅**은 전통적인 웹사이트에서 사용되는 방식이에요.
        
        ---
        
        ### 동작 방식
        
        1. 사용자가 주소창에 `https://matthew.com/about`을 입력해요.
        2. 브라우저는 **서버에 새로운 페이지를 요청**해요.
        3. 서버는 해당 요청에 맞는 **HTML, CSS, JS** 파일을 찾아서 다시 보내줘요.
        4. 브라우저는 받은 파일을 새로 그려요.
        
        즉, **페이지를 이동할 때마다 전체 새로고침**이 발생해요.
        
        ---
        
        ### 특징
        
        - 장점
            - 초기 로딩 속도가 빠른 편이에요 (바로 HTML을 받아오기 때문).
            - 검색 엔진(SEO)에 유리해요. (Google, Naver 같은 검색 엔진이 HTML 내용을 쉽게 읽을 수 있어요).
        - 단점
            - 페이지 이동 시마다 새로고침이 발생해서 UX가 부드럽지 않아요.
            - 서버 부하가 커질 수 있어요 (페이지마다 매번 서버에서 새 HTML을 만들어줘야 해요).
        
        ---
        
        ### 예시
        
        - 전통적인 PHP, JSP, ASP 기반 웹사이트.
        - 최신 프레임워크 기반 SSR:
            - **Next.js** (React 기반 SSR & SSG 지원)
            - **Nuxt.js** (Vue 기반 SSR & SSG 지원)
            - **Astro** (멀티 프레임워크 지원, 기본적으로 SSR/SSG 가능)
        
        <aside>
        🍠
        
        **TMI**
        
        여러분들이 보시는 저의 블로그인 [YOLOG](https://www.yolog.co.kr/)도 Astro라는 프레임워크로 제작되었어요!
        
        </aside>
        
    
    ### React Router란?
    
    React Router는 **CSR(Client-Side Routing)**을 가능하게 해주는 대표적인 라이브러리에요.
    
    한마디로, **페이지 전체를 새로 불러오지 않고 URL 경로에 맞는 컴포넌트만 보여주거나 숨기는 방식**이에요.
    
    이렇게 하면 **SPA(Single Page Application)**의 장점을 유지하면서, 마치 여러 페이지가 있는 것처럼 사용할 수 있어요.
    
    ---
    
    ### React Router의 장점
    
    1. **URL 경로 활용 가능**
        - `https://matthew.com/about`처럼 경로가 달라지면, 브라우저의 `Web History API`를 활용할 수 있어요.
        - 앞으로/뒤로 가기 버튼도 자연스럽게 동작해요.
    2. **주소 복사 및 공유 가능**
        - 사용자가 특정 페이지(예: `/about`)에 머무를 때, 해당 URL을 복사해서 다른 사람에게 공유하면, 그 사람도 바로 `/about` 페이지를 볼 수 있어요.
        - 만약 라우팅 처리를 하지 않으면, 보통 SPA에서는 무조건 초기 화면(Home)으로만 리디렉트되는 문제가 생겨요.
    3. **성능 최적화**
        - 전체 페이지를 다시 불러오지 않고, 필요한 부분만 업데이트하기 때문에 불필요한 네트워크 요청을 줄일 수 있어요.
        - 사용자 입장에서는 **더 빠른 화면 전환**을 경험할 수 있어요.
    4. **부드러운 네비게이션**
        - 서버 렌더링 방식처럼 페이지가 깜빡이거나 새로고침되는 현상이 없어요.
        - 마치 앱(App)처럼 부드럽게 화면이 바뀌기 때문에, UX가 좋아져요.
    
    ---
    
    **React Router**는 SPA를 유지하면서도, **멀티 페이지 앱처럼 보이도록 만들어주는 핵심 도구**에요.
    
    덕분에 주소 공유, 성능, 부드러운 화면 전환까지 챙길 수 있죠.
    
- **React Router**를 사용하지 않고, **Single Page Application** 만들어보기 🍠🍠🍠
    
    <aside>
    💡
    
    **React Router**를 사용하지 않고, **History API만으로 Single Page Application(SPA)을 직접 구현**해보는 시간을 가져보세요.
    
    이 과정에서 중요한 것은 단순히 SPA를 완벽하게 구축하는 것이 아니라, **SPA가 무엇이고 왜 필요한지, 그리고 React Router 같은 라이브러리가 어떤 배경에서 등장했는지 이해하는 것**입니다.
    
    라이브러리를 무조건 가져다 쓰기보다는,
    
    - **왜 이런 라이브러리가 나왔는지**
    - **직접 구현하면 어떤 불편함이 있는지**
    - **라이브러리가 제공하는 편의성이 무엇인지 등**
    
    이 점들을 스스로 경험해 보는 것이 학습의 핵심입니다.
    
    따라서 이번 목표는 **“SPA의 원리와 필요성을 이해하는 것**”에 중점을 두고 블로그를 읽어보시길 권장합니다.
    
    </aside>
    
    ### 📚 블로그
    
    [개발자 매튜 | React Router — History API를 활용한 SPA 라우팅 구현](https://www.yolog.co.kr/post/react-spa)
    
    ---
    
    - `pushState`, `popstate` 이벤트, 전체 리로드와의 차이 🍠
        
        전체리로드는 링크를 클릭할때마다 새로운 HTML 파일을 통째로 받아와서 페이지 전체를 다시 그리는 방식, pushstate,popstate는 새로고침 하지 않고 URL만 바꾸고 필요한 데이터만 받음
        
    - 전체 리로드 방식과 SPA 라우팅 방식의 가장 큰 차이는 무엇일까? 🍠
        
        전체 리로드 방식과 SPA 라우팅 방식의 가장 큰 차이점은 페이지 렌더링(화면을 그리는) 주체가 누구인가이다.  전체 리로드 방식: 새로운 페이지를 보여주는 책임이 서버(Server)에 있다. SPA 라우팅 방식: 새로운 페이지를 보여주는 책임이 클라이언트에 있다.
        
    - `preventDefault()`와 `stopPropagation()`의 차이와 역할은 무엇인가? 🍠
        
        preventDefault() 는 브라우저의 기본 동작을 막고, stopPropagation()은 이벤트가 부모 요소로 전파(버블링)되는 것을 막습니다
        
    - 선언적 라우팅(`Route`, `Routes`) 구조가 가지는 장점은 무엇일까? 🍠
        
        라우팅을 UI 렌더링의 일부처럼, 컴포넌트를 이용해 직관적으로 관리할 수 있다는것
        
    
    ---
    
    ### 🍠 직접 만든 Single Page Application 제출
    
    - 깃허브 주소
    - 실행 영상
    
- **React Router**의 기본 사용법 (**createBrowserRouter**, **RouterProvider**)
    
    ## React Router 실습
    
    리액트에서 **라우팅**을 위해 가장 많이 쓰이는 라이브러리는 `react-router-dom`이에요.
    
    먼저 라이브러리를 설치해줍니다.
    
    ```bash
    pnpm i react-router-dom
    ```
    
    ---
    
    ### 1. 기본 라우터 설정하기
    
    `App.tsx` 파일에 아래와 같이 작성해보세요.
    
    ```tsx
    import './App.css'
    
    // 1. React Router에서 필요한 함수/컴포넌트를 import
    import { createBrowserRouter, RouterProvider } from "react-router-dom";
    
    // 2. 경로(path)와 보여줄 화면(element)를 정의
    const router = createBrowserRouter([
      {
        path: '/',
        element: <h1>홈 페이지입니다.</h1>
      },
      {
        path: '/movies',
        element: <h1>영화 페이지 입니다.</h1>
      }
    ]);
    
    // 3. RouterProvider로 router 전달
    function App() {
      return <RouterProvider router={router} />
    }
    
    export default App;
    ```
    
    ---
    
    ### 2. 코드 설명
    
    1. **`createBrowserRouter`**
        - 우리가 원하는 경로(path)와, 해당 경로일 때 보여줄 컴포넌트(element)를 정의해요.
        - 예를 들어 `path: '/'` → 홈 화면, `path: '/movies'` → 영화 화면.
    2. **`RouterProvider`**
        - 우리가 만든 router를 실제 앱에 적용해주는 역할이에요.
        - `RouterProvider` 안에서만 라우팅이 동작합니다.
    3. **경로 확인**
        - `path: '/'` → 프로젝트 실행 시 처음 열리는 페이지 (`localhost:5173/`)
            
            ![1.png](attachment:f4fed9c6-a12d-43de-b45f-9e100ddab8fd:1.png)
            
        - `path: '/movies'` → `localhost:5173/movies` 경로로 접근했을 때 영화 페이지가 보여요.
            
            ![2.png](attachment:522b191e-37f4-46b9-957a-d008cd8b9448:2.png)
            
        
    
    ---
    
    ### 3. 실행 결과
    
    - `/` → **홈 페이지입니다.**
    - `/movies` → **영화 페이지 입니다.**
    
- **React Router** 지정하지 않은 경로 접근 처리 (**errorElement**)
    
    ### React Router: 지정하지 않은 경로 접근 처리
    
    위 실습에서는 `/`와 `/movies` 두 경로만 설정했어요.
    
    ```tsx
    import './App.css'
    import { createBrowserRouter, RouterProvider } from 'react-router-dom';
    
    const router = createBrowserRouter([
      { path: '/', element: <h1>홈 페이지입니다.</h1> },
      { path: '/movies', element: <h1>영화 페이지 입니다.</h1> },
    ]);
    
    function App() {
      return <RouterProvider router={router} />;
    }
    
    export default App;
    ```
    
    그럼 사용자가 `http://localhost:5173/yaho` 처럼 **정의하지 않은 경로**로 들어오면 어떻게 될까요?
    
    ![1.png](attachment:3b44b91c-55f5-4c2f-a0e9-42bfaba02869:1.png)
    
    라우터가 해당 경로를 찾지 못해 **404 NOT FOUND**가 발생해요.
    
    이 상태는 기능적으로는 맞지만, **UX 관점**에선 친절하지 않죠. React Router는 이를 개선하도록 `errorElement`를 제공해요.
    
    ---
    
    ### 방법 1: `errorElement`로 루트 에러 화면 지정
    
    루트 라우트에 `errorElement`를 지정하면, **정의되지 않은 경로**로 접근했을 때 이 컴포넌트를 보여줄 수 있어요.
    
    ```tsx
    import './App.css'
    import { createBrowserRouter, RouterProvider } from 'react-router-dom';
    
    const router = createBrowserRouter([
      {
        path: '/',
        element: <h1>홈 페이지입니다.</h1>,
        // 매칭 실패/라우트 에러 시 보여줄 UI
        errorElement: <h1>너는 없는 경로에 들어왔다 ^ㅁ^ 야호~!</h1>,
      },
      {
        path: '/movies',
        element: <h1>영화 페이지 입니다.</h1>,
      },
    ]);
    
    function App() {
      return <RouterProvider router={router} />;
    }
    
    export default App;
    ```
    
    ![2.png](attachment:b055d38c-2006-4824-ab94-f81bd2a0c267:2.png)
    
    > 참고: 데이터 라우터(`createBrowserRouter`)에서는 매칭 실패 시 **가장 가까운 상위 라우트의 `errorElement`가 렌더링**돼요. 루트에 넣어두면 대부분의 “없는 경로”를 커버할 수 있어요.
    > 
    
    ---
    
    ### 방법 2: 와일드카드(`*`) 경로로 NotFound 라우트 만들기
    
    UX를 더 세밀하게 다루고 싶다면, **전용 404 페이지**를 컴포넌트로 만들어 `path: '*'`에 매핑하는 방법도 좋아요.
    
    ```tsx
    const NotFound = () => (
      <main style={{ padding: 24 }}>
        <h1>페이지를 찾을 수 없어요 (404)</h1>
        <p>주소를 다시 확인하거나 홈으로 이동해 주세요.</p>
        <a href="/">홈으로</a>
      </main>
    );
    
    const router = createBrowserRouter([
      { path: '/', element: <h1>홈 페이지입니다.</h1> },
      { path: '/movies', element: <h1>영화 페이지 입니다.</h1> },
      { path: '*', element: <NotFound /> }, // 가장 마지막에 배치
    ]);
    ```
    
    두 방법은 함께 써도 돼요.
    
    - **일반적인 404**는 `'*'` 라우트에서 처리하고,
    - **라우트 로딩/액션 중 발생한 에러**는 `errorElement`로 처리하는 식으로 역할을 나누면 깔끔해요.
    
    ---
    
    ### 다음에 시도해보면 좋은 것들
    
    1. **홈으로 이동 버튼 제공**: 404 화면에 “홈으로” 버튼을 넣어 빠르게 복구할 수 있게 해요.
    2. **페이지별 다른 에러 처리**: 각 라우트에 개별 `errorElement`를 지정해 문맥에 맞는 에러 메시지를 보여줘요.
    3. **Error Boundary 구성**: 컴포넌트 렌더링 중 발생하는 예외를 잡아 사용자에게 안정적인 화면을 제공해요.
    
    ---
    
    프론트엔드 개발은 화면만 만드는 게 아니에요. **로딩/에러/복구 흐름**까지 설계해 주면 사용자 경험이 훨씬 좋아져요.
    
- **React Router**의 **Outlet** 사용법 **Link** 태그를 활용한 페이지 이동.
    
    ### **React Router**의 **Outlet** 사용법 **Link** 태그를 활용한 페이지 이동.
    
    우리는 지금까지 `src/components` 폴더에 컴포넌트를 두고 관리했어요. 이번에는 **페이지 단위 파일을 `src/pages` 폴더에서 관리**해볼게요.
    
    ![1.png](attachment:14bfbb98-23ed-4ebb-932a-2b0a0dae99b4:1.png)
    
    총 3개의 페이지를 만듭니다.
    
    ---
    
    ### 1. **홈 페이지**
    
    ```tsx
    // src/pages/home.tsx
    const HomePage = () => {
      return <h1>Home Page 야호~!</h1>;
    };
    
    export default HomePage;
    ```
    
    ### **2. 영화 페이지**
    
    ```tsx
    // src/pages/movies.tsx
    const MoviesPage = () => {
      return <h1>Movies Page 야호~!</h1>;
    };
    
    export default MoviesPage;
    ```
    
    ### **3. 에러 페이지**
    
    ```tsx
    // src/pages/not-found.tsx
    const NotFound = () => {
      return <h1>너는 찾을 수 없는 페이지 야호~!</h1>;
    };
    
    export default NotFound;
    ```
    
    이제 라우터에서 **문자 리터럴로 직접 JSX를 넣던 방식**을 버리고, **만든 페이지 컴포넌트를 import**해서 연결해요.
    
    ```tsx
    import './App.css';
    import { createBrowserRouter, RouterProvider } from 'react-router-dom';
    
    // 1) 만든 페이지 import
    import HomePage from './pages/home';
    import NotFound from './pages/not-found';
    import Movies from './pages/movies';
    
    // 2) 라우터에 연결
    const router = createBrowserRouter([
      {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFound />,
      },
      {
        path: '/movies',
        element: <Movies />,
      },
    ]);
    
    function App() {
      return <RouterProvider router={router} />;
    }
    
    export default App;
    ```
    
    아래와 같이 페이지가 바르게 보이면 정상이에요.
    
    ![1.png](attachment:aadd80dc-0e9f-44e1-88c1-c6dc32f71ed4:1.png)
    
    ![2.png](attachment:8efc7c83-ef2c-4fc0-9974-90f7db3d4bdb:2.png)
    
    ![3.png](attachment:4ca0a602-470a-4344-be53-a33e426f8b49:3.png)
    
    ---
    
    ### 2. Outlet 적용 방법
    
    이번엔 **`'/'로 시작하는 모든 경로에서 공유되는 레이아웃`**을 만들어 볼게요. 즉, `navbar`는 고정으로 유지하고, **아래 컨텐츠 영역만 라우트에 따라 바뀌도록** 하려는 거예요.
    
    `src/layout/root-layout.tsx` 파일을 만들고, `Outlet`을 준비합니다.
    
    ![1.png](attachment:39a16249-7118-4356-b269-d7f4d4a8a112:1.png)
    
    ```tsx
    // src/layout/root-layout.tsx
    import { Outlet } from 'react-router-dom';
    
    const RootLayout = () => {
      return (
        <>
          <Outlet />
        </>
      );
    };
    
    export default RootLayout;
    ```
    
    실제로 아래 영상을 보면, `navbar`는 고정으로 유지하고, **아래 컨텐츠 영역만 라우트에 따라 바뀌고 있어요!**
    
    [화면 기록 2025-09-17 오전 11.01.30.mov](attachment:9e0c2b21-e505-410f-b288-4448c421a832:화면_기록_2025-09-17_오전_11.01.30.mov)
    
    [개발자 매튜](https://www.yolog.co.kr/)
    
    그리고 **`navbar`** 컴포넌트를 만들어 링크로 이동해 볼게요.
    
    ```tsx
    // src/components/navbar.tsx
    import { Link } from 'react-router-dom';
    
    const Navbar = () => {
      return (
        <nav>
          <Link to="/">홈 페이지로 이동</Link>
          <Link to="/movies">영화 목록 페이지로 이동</Link>
        </nav>
      );
    };
    
    export default Navbar;
    ```
    
    `RootLayout`에 `Navbar`를 포함시킵니다.
    
    ```tsx
    // src/layout/root-layout.tsx
    import { Outlet } from 'react-router-dom';
    import Navbar from '../components/navbar';
    
    const RootLayout = () => {
      return (
        <>
          <Navbar />
          <Outlet />
        </>
      );
    };
    
    export default RootLayout;
    ```
    
    이제 라우터와 연결해요. 처음엔 이렇게만 바꾸면 **navbar만 나오고 페이지가 바뀌지 않는 것처럼 보일 수 있어요.** (정상이에요)
    
    ```tsx
    import './App.css';
    import { createBrowserRouter, RouterProvider } from 'react-router-dom';
    
    import HomePage from './pages/home';
    import NotFound from './pages/not-found';
    import Movies from './pages/movies';
    import RootLayout from './layout/root-layout';
    
    const router = createBrowserRouter([
      {
        path: '/',
        // element: <HomePage />,
        element: <RootLayout />,
        errorElement: <NotFound />,
      },
      {
        path: '/movies',
        element: <Movies />,
      },
    ]);
    
    function App() {
      return <RouterProvider router={router} />;
    }
    
    export default App;
    ```
    
    [1.mov](attachment:84e830a2-e6b9-4a70-b8b4-b667797a4ec0:1.mov)
    
    원하는 동작(위에 `navbar` 고정, 아래 컨텐츠만 변경)을 만들려면, 자**식 라우트(`children`)로 페이지**들을 넣어 **`Outlet`에 렌더링**되도록 해야 해요.
    
    ```tsx
    import './App.css';
    import { createBrowserRouter, RouterProvider } from 'react-router-dom';
    
    import HomePage from './pages/home';
    import NotFound from './pages/not-found';
    import Movies from './pages/movies';
    import RootLayout from './layout/root-layout';
    
    const router = createBrowserRouter([
      {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,
        // 1) Navbar 아래에 표시할 자식 라우트
        children: [
          {
            // 2) index: true → 부모의 기본 경로('/')일 때 렌더
            index: true,
            element: <HomePage />,
          },
          {
            // 3) 부모가 '/'이므로, 'movies'만 써도 '/movies'로 매칭
            path: 'movies',
            element: <Movies />,
          },
        ],
      },
    ]);
    
    function App() {
      return <RouterProvider router={router} />;
    }
    
    export default App;
    ```
    
    [2.mov](attachment:86c71617-22fa-4508-9a2b-910e38d3d7c0:2.mov)
    
    위와 같이 **Navbar는 유지**되고, **컨텐츠만 경로에 맞게 바뀌면 성공**이에요!
    
- **React Router**를 활용하여 **Dynamic Routing**을 구현해보자. (**useParams**)
    
    ### Dynamic Routing (동적 라우팅)
    
    동적 라우팅은 **URL의 일부를 변수처럼 받아** 같은 페이지 구조로 **서로 다른 콘텐츠**를 보여주는 방식이에요.
    
    쿠팡 상품 상세처럼 “UI는 같지만 내용만 다른” 화면을 만들 때 아주 잘 맞아요.
    
    예를 들어, 이런 형태의 URL을 보면:
    
    ![1.png](attachment:fba70fe6-3eb3-4da1-8c2a-6e60db122c67:1.png)
    
    ![2.png](attachment:66307fa9-be2c-4ad9-85b1-00277074c99e:2.png)
    
    ```
    coupang.com/vp/products/여기부분이-매번-다른-숫자
    ```
    
    앞부분은 같고 **`products/` 뒤의 값만 달라요**. 이 숫자(또는 문자열)를 **동적 파라미터**로 받아서 적절한 데이터를 불러오면 됩니다.
    
    ---
    
    ### 1) 라우트 정의하기
    
    `react-router-dom`에서는 `/:파라미터이름` 형태로 경로를 정의해요.
    
    ```tsx
    import './App.css';
    import { createBrowserRouter, RouterProvider } from 'react-router-dom';
    
    import HomePage from './pages/home';
    import NotFound from './pages/not-found';
    import Movies from './pages/movies';
    import RootLayout from './layout/root-layout';
    
    const router = createBrowserRouter([
      {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            // /movies/뒤에 오는 값을 movieId라는 이름으로 받겠다는 뜻
            path: 'movies/:movieId',
            element: <Movies />,
          },
        ],
      },
    ]);
    
    function App() {
      return <RouterProvider router={router} />;
    }
    
    export default App;
    ```
    
    [1.mov](attachment:6a230914-214d-4653-b1a7-5911b0805217:1.mov)
    
    - `/movies/1`
    - `/movies/123`
    - `/movies/matthew`
    
    위 세 URL은 모두 같은 컴포넌트(`Movies`)를 렌더링하지만, 내부에서 받는 **`movieId` 값만 달라요**. 이 값을 이용해 서버에서 해당 리소스를 가져오면 돼요.
    
    **ex) 조금 이해가 어렵다면, 쿠팡 상품 상세페이지를 생각해보시면 됩니다!**
    
    ---
    
    ### 2) `useParams`로 파라미터 읽기
    
    동적 경로에서 넘겨받은 값을 읽으려면 `useParams`를 사용해요.
    
    ```tsx
    // src/pages/movies.tsx
    import { useParams } from 'react-router-dom';
    
    const MoviesPage = () => {
      const params = useParams(); // { movieId?: string }
    
      console.log(params); // 예: { movieId: "123" }
    
      return <h1>{params.movieId}번의 Movies Page 야호~!</h1>;
    };
    
    export default MoviesPage;
    ```
    
    ### 왜 객체로 반환될까요?
    
    - 이유는 **여러 개의 파라미터**를 동시에 받을 수 있기 때문이에요.
        
        예: `path: 'users/:userId/posts/:postId'` → `useParams()`는 `{ userId, postId }` 형태로 돌려줘요.
        
    
    ### 파라미터 이름은 어디서 오나요?
    
    - **라우트 정의에서 쓴 이름 그대로** 와요.
        
        `path: 'movies/:movieId'` → `params.movieId`
        만약 `path: 'movies/:matthew'`라고 썼다면 → `params.matthew`
        
    
    ```tsx
    const router = createBrowserRouter([
      {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'movies/:movieId', element: <Movies /> },
        ],
      },
    ]);
    ```
    
    ![1.png](attachment:a7e47f4b-eeca-4b1e-a10b-55d43da5d32c:1.png)
    

---

### **useEffect** 🍠

<aside>
🍠

React의 **useEffect** 훅은 컴포넌트의 생명주기와 관련된 **부수 효과(side effect)** 를 처리할 때 사용되요.

예를 들어, **API 호출, 구독(subscription) 설정, 수동 DOM 조작, 타이머 설정** 등이 필요할 때 **useEffect**를 활용할 수 있어요.

만약 **컴포넌트가 마운트될 때 특정 작업을 실행하고 싶다면**, **useEffect** 내부에서 원하는 코드를 작성하면 되요.

</aside>

- **useEffect** **기초 설명**
    
    ### **useEffect** 기초
    
    React 컴포넌트는 기본적으로 **JSX를 사용해서 UI(화면)** 를 그려주는 역할을 해요.
    그런데, 단순히 화면만 보여주는 게 아니라 **추가로 실행해야 하는 동작(효과)** 도 필요한 경우가 있어요.
    
    ---
    
    예를 들어:
    
    - 백엔드 REST API를 호출해서 데이터를 가져오기 (Read)
    - 데이터 생성(Create), 수정(Update), 삭제(Delete) 요청 보내기
    - 이벤트 리스너 등록 / 해제하기
    - 타이머(`setInterval`, `setTimeout`) 설정하기
    
    이런 것들은 화면을 그리는 것 자체와는 직접적으로 관련이 없지만, 컴포넌트가 동작하면서 **부수적으로 필요한 작업**이에요.
    
    그래서 이런 걸 **부수 효과(Side Effect)** 라고 부릅니다. React에서는 이런 **Side Effect** 를 안전하게 다루기 위해 **useEffect** 훅을 제공해요.
    
    ---
    
    ### 언제 실행되나요?
    
    **useEffect**를 사용하면 **특정한 조건에서만 Side Effect가 실행되도록 제어**할 수 있어요.
    
    대표적으로 3가지 경우가 있어요:
    
    1. **처음 마운트될 때만 실행** → API를 딱 한 번만 호출하고 싶을 때
    2. **특정 값이 변경될 때 실행** → 예를 들어 `searchKeyword` 값이 바뀔 때마다 API를 호출
    3. **컴포넌트가 리렌더링될 때마다 실행** → 별도의 제약 없이 실행
    
    ---
    
    ### 문법 정리
    
    ```tsx
    import { useEffect } from 'react';
    
    useEffect(() => {
      // 실행할 부수 효과 코드 (예: API 호출, 이벤트 등록 등)
    }, []);
    ```
    
    - **첫 번째 인자 (Callback Function)**
        
        → 실행할 동작을 함수로 작성해요.
        → 예: `fetch`로 데이터 불러오기, 이벤트 리스너 등록 등
        
    - **두 번째 인자 (Dependency Array, 의존성 배열)**
        
        → 이 배열에 들어간 값이 변할 때만 실행돼요.
        
        - `[]` (빈 배열) → 컴포넌트가 **처음 마운트될 때 한 번만 실행**
        - `[state]` → `state` 값이 바뀔 때마다 실행
        - (생략) → 컴포넌트가 **리렌더링될 때마다 실행**
    
    ---
    
    ### 간단한 예시
    
    ```tsx
    import { useEffect, useState } from 'react';
    
    function App() {
      const [count, setCount] = useState(0);
    
      useEffect(() => {
        console.log('컴포넌트가 처음 마운트될 때 실행됩니다!');
      }, []);
    
      useEffect(() => {
        console.log(`count 값이 ${count}로 변경될 때마다 실행됩니다!`);
      }, [count]);
    
      return (
        <>
          <h1>{count}</h1>
          <button onClick={() => setCount(count + 1)}>+1 증가</button>
        </>
      );
    }
    
    export default App;
    ```
    
    ---
    
    정리하면, **useEffect**는 **렌더링 외적인 작업**(데이터 요청, 이벤트 처리, 타이머 설정 등)을 관리할 때 사용하는 훅이에요.
    그리고 **언제 실행할지를 제어**할 수 있다는 점이 핵심이에요!
    
- **useEffect**로 데이터 호출하는 방법 알아보기
    
    ### **useEffect**로 데이터 호출하기
    
    <aside>
    🍠
    
    React의 **useEffect**는 컴포넌트가 렌더링될 때마다 실행할 **부수 효과(side effect)** 를 처리할 수 있어요. 이번에는 실제로 외부 API를 호출해서 데이터를 불러오는 방법을 연습해봅시다!
    
    </aside>
    
    ---
    
    ### 1. API 준비하기
    
    우리는 영화 데이터를 제공하는 **TMDB API**를 사용할 거예요.
    
    1. 먼저 [TMDB 사이트](https://developer.themoviedb.org/reference/intro/getting-started)에서 회원가입 후 로그인해주세요.
        
        [Getting Started](https://developer.themoviedb.org/reference/intro/getting-started)
        
    2. 로그인하면 **API Token**을 받을 수 있는데, 이 토큰을 이용해 서버에서 데이터를 요청할 수 있어요.
        
        ![1.png](attachment:29c5a20a-ee30-4bea-952d-be7e4ce34596:1.png)
        
        📌 **Token이란?**
        
        > 간단히 말하면 “누가 요청했는지” 서버가 알 수 있도록 해주는 인증 수단이에요.
        > 
    
    ---
    
    ### 2. Popular Movies API 살펴보기
    
    TMDB 문서에서 **인기 영화 목록 (Popular Movies)** API를 확인해봅시다.
    
    ![2.png](attachment:a16d8c8b-114a-49f0-a22d-156e0b012a5b:2.png)
    
    ```bash
    	curl --request GET \
         --url 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1' \
         --header 'Authorization: Bearer 토큰' \
         --header 'accept: application/json'
    ```
    
    여기서 중요한 건 아래 개념이에요
    
    1. **URL** → 어떤 데이터를 요청할지 정함
    2. **Header** → 인증 정보 (`Authorization: Bearer 토큰`) 와 데이터 형식 (`application/json`)
    
    ---
    
    ### 3. Query Parameter란?
    
    API 요청을 보면, URL에 **?와 &를 활용하여 추가적인 정보를 전달**하는 부분이 있습니다. 이를 **Query Parameter**라고 합니다.
    
    ![1.png](attachment:291cd890-6058-4b0f-80c1-ea2e1cfaa949:1.png)
    
    ```bash
    https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
    ```
    
    - `?language=en-US` → 응답을 영어로 받겠다는 의미
    - `&page=1` → 1페이지 데이터를 요청한다는 의미
    
    이런 방식으로 **추가 정보를 넘겨주는 것**을 **쿼리 파라미터(Query Parameter)** 라고 해요.
    
    > ✅ **즉, 위 API 요청을 수행하면 "영어로 된 인기 영화 목록(1페이지)" 데이터를 받아올 수 있습니다.**
    > 
    
    ---
    
    ### 4. 프로젝트에 적용하기
    
    **(1) axios 설치하기**
    
    데이터 요청을 쉽게 하기 위해 `axios` 라이브러리를 설치해줍니다.
    
    ```bash
    pnpm install axios
    ```
    
    **(2) 타입 정의하기**
    
    TMDB 문서에서 응답 구조를 확인하고, 타입을 만들어줍니다.
    
    [Popular](https://developer.themoviedb.org/reference/movie-popular-list)
    
    ![1.png](attachment:92ab5574-9849-487f-b743-6b3b6bc9d6e0:1.png)
    
    `src/types/movie.ts` 파일 생성:
    
    ```tsx
    export type Movie = {
      id: number;
      title: string;
      overview: string;
      poster_path: string;
      release_date: string;
      vote_average: number;
      // 필요하다면 추가 필드도 정의 가능
    };
    
    export type MovieResponse = {
      page: number;
      results: Movie[];
      total_pages: number;
      total_results: number;
    };
    ```
    
    **(3) useState로 상태 관리**
    
    **`useState`**를 통해 영화 데이터를 받아 올 상태를 선언해요.
    
    ```tsx
    import { useState } from 'react';
    import type { Movie } from '../types/movie';
    
    const MoviesPage = () => {
      const [movies, setMovies] = useState<Movie[]>([]);
    
      return <h1>영화 데이터 불러오기</h1>;
    };
    
    export default MoviesPage;
    ```
    
    당연히, 초기에는 아무런 데이터를 받아올 수 없으니 빈 배열이겠죠?
    
    **(4) useEffect로 데이터 호출**
    
    ```tsx
    import { useEffect, useState } from 'react';
    import type { Movie, MovieResponse } from '../types/movie';
    import axios from 'axios';
    
    const MoviesPage = () => {
      const [movies, setMovies] = useState<Movie[]>([]);
    
      useEffect(() => {
        const fetchMovies = async () => {
          const { data } = await axios.get<MovieResponse>(
            'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
            {
              headers: {
                Authorization: `Bearer 토큰값`, // 본인 TMDB 토큰으로 교체
              },
            }
          );
          setMovies(data.results);
        };
    
        fetchMovies();
      }, []);
    
      return (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <p>{movie.release_date}</p>
            </li>
          ))}
        </ul>
      );
    };
    
    export default MoviesPage;
    ```
    
    **5. useEffect에서 async/await 주의점**
    
    💡 **useEffect** 콜백 함수는 **동기 함수**여야 합니다.
    
    비동기(`async`) 함수는 `Promise`를 반환하므로, **useEffect**의 규칙에 맞지 않아요.
    
    그래서 보통은 **useEffect 내부에서 async 함수를 따로 정의**하고, 바로 호출하는 방식으로 사용해요.
    
    실제로 영화 데이터가 잘 불려왔는지 체크해볼게요.
    
    ```tsx
    const MoviesPage = () => {
      const [movies, setMovies] = useState<Movie[]>([]);
      
      console.log(movies); // 영화 데이터 체크
      
      return (
    	  /** 중략 */
      )
    }
    ```
    
    ![1.png](attachment:f7a7b0df-9943-4ee6-b7f7-37555510569a:1.png)
    
    실제로, **`console.log(movies)`**를 통해, 안의 데이터를 보면 성공적으로 통신이 되었다는 200 코드와 함께 정보들을 확인할 수 있어요.
    
    ---
    
    ### 6. Optional Chaining으로 에러 방지
    
    혹시라도, 아래 이미지와 같은 에러가 발생한다면, 당연한 것이에요.
    
    ![1.png](attachment:33ef1471-ca97-45f5-9a6a-72930b580a02:1.png)
    
    처음 렌더링될 때는 `movies`가 빈 배열이기 때문에 데이터가 없을 수 있어요.
    
    여기서 알아야 할 사실은 `state`는 `비동기`라는 것이에요. 처음 화면이 켜지기 전에 동작하는데, 이때의 `state` 값은 정의되지 않았기 때문에 `undefined` 이므로, 정의되지 않은 `state`에 접근하기 때문에 에러가 발생하는 것이에요.
    
    그런 경우 안전하게 접근하기 위해 `movies?.map(...)` 과 같이 **Optional Chaining**을 사용하면 좋습니다.
    
    [Optional chaining (?.) - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
    
    ```tsx
    const MoviesPage = () => {
    	/** 중략 */ 
      return (
        <ul>
          **{/* 옵셔널 체인 활용 */}**
          {movies?.map((movie) => (
            <li key={movie.id}>
              <h1>{movie.title}</h1>
            </li>
          ))}
        </ul>
      );
    };
    
    export default MoviesPage;
    ```
    
    ---
    
    여기까지 하면,
    
    - **컴포넌트 마운트 시 한 번 API 호출**
    - **받아온 데이터를 상태에 저장**
    - **UI에 렌더링**
    
    이 흐름을 완성할 수 있어요
    
- **useEffect** 심화
    
    ### **useEffect**의 Clean Up Function을 사용하는 이유
    
    React의 **useEffect**에는 **클린업 함수**라는 개념이 있어요.
    
    이 함수는 말 그대로 “정리(clean up)” 역할을 해요.
    
    ---
    
    ### 1. 클린업 함수 기본 예제
    
    ```tsx
    import { useEffect, useState } from "react";
    
    const SearchPage = () => {
      const [counter, setCounter] = useState(0);
    
      const handleClick = () => {
        setCounter((prev) => prev + 1);
      };
    
      useEffect(() => {
        const mouseClickEffectEvent = () => {
          console.log(counter);
        };
    
        window.addEventListener("click", mouseClickEffectEvent);
    
        // 클린업 함수
        return () => {
          console.log("클린업 함수 실행!", counter);
          window.removeEventListener("click", mouseClickEffectEvent);
        };
      }, [counter]);
    
      return (
        <>
          <h1 style={{ color: "white" }}>{counter}</h1>
          <button onClick={handleClick}>+</button>
        </>
      );
    };
    
    export default SearchPage;
    ```
    
    ---
    
    ### 2. 실행 흐름 이해하기
    
    위 코드를 실행하면 콘솔에는 이런 흐름이 찍혀요:
    
    1. 컴포넌트 **처음 마운트** → **useEffect** 실행 → 이벤트 등록됨.
    2. 버튼 클릭으로 `counter` 값이 변경 → **리렌더링 발생**.
    3. 리렌더링 직전에 → **이전 클린업 함수 실행** (이전 `counter` 값 기준).
    4. 그 후 → 새로운 **useEffect** 실행 → 이벤트 다시 등록.
    
    즉, **클린업 함수는 새 값 기반이 아니라 “이전 값”을 기준으로 동작**해요.
    
    그래서 콘솔에 항상 “이전 counter 값”이 찍히는 걸 확인할 수 있죠.
    
    ![1.png](attachment:b78f974f-15df-4d92-9ffe-8afaa62e4197:1.png)
    
    ---
    
    ### 3. 왜 클린업 함수가 필요할까?
    
    만약 클린업 함수가 없다면?
    
    - 클릭할 때마다 이벤트 핸들러가 새로 등록됨.
    - 결국 같은 이벤트가 중복 실행되거나, 메모리 누수가 발생할 수 있음.
    
    👉 클린업 함수는 **이전 이벤트를 제거하고, 새로운 이벤트만 유지**하는 역할을 해요.
    
    이 덕분에 이벤트가 중복 실행되는 문제를 막을 수 있어요.
    
    ---
    
    ### 4. 언마운트 vs 클린업 함수
    
    여기서 헷갈리기 쉬운 부분이 있어요.
    
    - 클래스 컴포넌트의 `componentWillUnmount`
    → 컴포넌트가 **DOM에서 완전히 사라질 때** 한 번만 실행.
    - 함수 컴포넌트의 클린업 함수
    → 컴포넌트가 언마운트될 때도 실행되지만, **리렌더링될 때마다 실행**됨.
        
        → 즉, 매번 이전 상태를 정리해주고 새로운 사이드 이펙트를 실행하는 구조예요.
        
    
    ---
    
    ### 5. 핵심 정리
    
    1. **처음 마운트** → `useEffect` 실행, 이벤트 등록.
    2. **리렌더링 발생** → 이전 클린업 함수 실행 → 새로운 사이드 이펙트 실행.
    3. **언마운트 시점** → 마지막 클린업 함수 실행.
    
    👉 덕분에 메모리 누수, 중복 이벤트 등록 같은 문제를 예방할 수 있어요.
    

### 🎥 강의 영상

조금 더 **useEffect**에 대해서 깊게 알고 싶다면 아래 영상을 참고해주세요!

https://youtu.be/v4l-m7CaC1A?si=2x4d4ljpLJJjdM-w

- 위의 영상을 보고 학습한 내용을 정리해주세요!

---

# 🍠 미션 1 - **useEffect**를 활용한 영화 목록 페이지 구현

---

<aside>
🍠

이번 미션은 React의 **useEffect** 훅을 활용하여 영화 데이터를 불러오고, Tailwind CSS로 직관적인 UI를 구현하는 과정입니다. 
아래의 체크리스트를 따라가며 미션을 수행해 보세요. 

</aside>

**🚨 미션 1~미션 3에서 사용하는 영화 API는 아래 사이트에서 자세한 설명을 함께 보실 수 있습니다!**

[Getting Started](https://developer.themoviedb.org/docs/getting-started)

**🍠 미션 1에서 만들어볼 화면은 아래와 같아요 🍠**

![1.png](attachment:0c9542be-42f1-4f8f-b8d4-0cf1c3108045:1.png)

---

**1. 영화 데이터 불러오기: useEffect 활용**

- **API 호출 준비:**
    - [ ]  `The Movie Database API`에서 인기 영화(`popular`) 데이터를 불러올 API 키를 준비했나요?
    - [ ]  **React** 프로젝트에서 `useState`를 사용하여 영화 데이터를 저장할 상태를 만들었나요?
- **useEffect 구현:**
    - [ ]  **useEffect** 훅을 사용하여 컴포넌트가 처음 렌더링될 때 한 번만 API를 호출하도록 의존성 배열을 비워두었나요?
    - [ ]  `fetch` 또는 `axios`를 사용하여 API를 호출하고 데이터를 성공적으로 가져왔나요?
    - [ ]  데이터가 올바르게 불러와졌는지 콘솔에 `log`를 찍어 확인했나요?

---

**2. UI 디자인: Tailwind CSS & Hover 효과**

- **기본 UI 레이아웃:**
    - [ ]  **Tailwind CSS**를 사용하여 영화 목록을 보여줄 그리드 레이아웃을 만들었나요? (`grid`, `gap`, `cols` 등)
    - [ ]  각 영화의 포스터 이미지를 화면에 표시했나요?
- **Hover 효과 구현:**
    - [ ]  마우스 커서를 올렸을 때 포스터가 흐릿하게(`blur`) 처리되도록 구현했나요?
    - [ ]  호버 시 영화의 제목과 간단한 줄거리가 보이도록 UI를 구성했나요?

---

**3. 추가 학습: Fetch vs Axios**

- [ ]  두 기술의 장단점을 스스로 설명할 수 있을 정도로 정리했나요?
    - **`fetch`** 정리
    - **`axios`** 정리
    - **`fetch`**와 **`axios`**의 차이
- [ ]  `fetch`와 `axios`의 가장 큰 차이점인 **설치 여부**, **JSON 데이터 처리 방식**, **에러 처리 방식**을 명확하게 이해했나요?

---

### 🎥 강의 영상

https://www.youtube.com/watch?v=viknoWQWHms&t=2066s

---

### 🍠 미션 1. 제출

- 깃허브 주소
- 실행 영상
    
    [9th-web_강민규_3주차 미션1실행영상.mp4](attachment:b7a54c4c-453f-4a85-9a3c-9e7c17f19574:9th-web_강민규_3주차_미션1실행영상.mp4)
    

---

# 🍠 미션 2 - `React Router`와 페이지네이션을 통한 동적 영화 목록 구현

---

<aside>
🍠

이번 미션에서는 미션 1에서 진행한 미션을 확장하여 미션 2를 진행합니다.
미션2에서는 사용자에게 더 나은 경험을 제공하기 위해 **라우팅**, **상태 관리(로딩/에러)**, 그리고 **페이지네이션**을 구현하는 것을 목표로 합니다. 
아래의 체크리스트를 따라가며 미션을 단계별로 해결해 보세요.

</aside>

![1.png](attachment:77e3af55-c92b-4662-b4e6-58de484ded32:1.png)

**1.** `react-router-dom` 라우팅 설정

이 단계는 앱의 여러 페이지를 매끄럽게 연결하고, URL에 따라 다른 콘텐츠를 보여주는 기본 구조를 만드는 과정입니다.

- **라우터 설치 및 설정:**
    - [ ]  `pnpm install react-router-dom` 명령어를 사용하여 라우터 라이브러리를 설치했나요?
    - [ ]  애플리케이션의 기본 라우팅 구조를 설정했나요?
- **레이아웃 및 네비게이션:**
    - [ ]  `Layout` 컴포넌트를 만들어 모든 페이지에 공통적으로 적용될 `Navbar`를 배치했나요?
    - [ ]  `Outlet` 컴포넌트를 사용하여 라우팅된 페이지 콘텐츠가 표시될 위치를 지정했나요?
    - [ ]  `Navbar`에 **홈, 인기 영화, 개봉 예정, 평점 높은, 상영 중** 등의 버튼을 만들고, `Link` 또는 `NavLink`를 사용하여 올바른 경로로 연결했나요?
    - [ ]  `NavLink`의 `active` **스타일링** 기능을 활용하여 현재 페이지의 버튼 색상이 다르게 표시되도록 구현했나요? (NavLink를 활용하셔도 좋고, 다른 방법을 활용하셔도 상관없습니다!)

---

**2. 로딩 및 에러 처리**

사용자에게 데이터가 준비되는 동안 기다리라는 신호를 보내고, 문제가 발생했을 때 친절하게 알려주는 것은 좋은 사용자 경험의 필수 요소입니다.

- **로딩 상태:**
    - [ ]  영화 데이터를 불러오기 전과 후를 구분하기 위한 **로딩 상태**(`isLoading`)를 만들었나요?
    - [ ]  로딩 상태가 `true`일 때 화면에 **로딩 스피너**를 표시하는 UI를 구현했나요?
    - [ ]  영화 데이터를 모두 불러온 후 로딩 상태를 `false`로 변경했나요?
        
        ![2.png](attachment:a34cd098-3b72-4310-b49a-c67da4691aa0:2.png)
        
- 에러 처리:
    - [ ]  `try...catch` 구문을 사용하여 API 호출 중 발생할 수 있는 **네트워크 에러**나 기타 오류를 잡아냈나요?
    - [ ]  에러가 발생했을 때 사용자에게 에러 메시지를 보여주는 **에러 상태**와 UI를 구현했나요?
    - [ ]  데이터가 성공적으로 불러와지면 에러 상태를 초기화하도록 설정했나요?
        
        ![3.png](attachment:c9637a6e-d89c-47f3-9002-4ce9756e2683:3.png)
        

---

**3. 페이지네이션 기능 구현**

많은 양의 데이터를 효율적으로 보여주기 위한 페이지네이션은 사용자 인터페이스의 핵심 기능입니다.

[4.mov](attachment:563394d7-7228-4e40-81d2-f4057d44785a:4.mov)

- **페이지 상태 관리:**
    - [ ]  현재 페이지 번호를 저장할 **상태**를 만들었나요?
    - [ ]  **이전 페이지**와 **다음 페이지**로 이동하는 버튼을 구현했나요?
- **버튼 활성화/비활성화:**
    - [ ]  현재 페이지가 **1페이지**일 경우, **이전 페이지** 버튼이 비활성화되거나 숨겨지도록 처리했나요?
- **데이터 호출과 페이지:**
    - [ ]  API 요청 시 **페이지 번호**를 파라미터로 함께 보내서 해당 페이지의 영화 데이터를 불러오도록 구현했나요?
    - [ ]  페이지 번호가 바뀔 때마다 **useEffect**를 다시 호출하여 새로운 데이터를 가져오도록 의존성 배열을 올바르게 설정했나요?

---

### 🎥 강의 영상

https://youtu.be/YQWGJkQo1WU?si=ytF49SZDyZhQFkth

---

### 🍠 미션 2. 제출

- 깃허브 주소
- 실행 영상

---

# 🍠 미션 3 - `useParams`를 활용한 영화 상세 페이지 개발

---

<aside>
🔥 미션 1과, 미션 2를 확장하여 미션 3에서는 **`react-router-dom`의 `useParams` 훅**을 활용해 특정 영화의 상세 정보를 불러오고, 이를 멋지게 시각화하는 것을 목표로 합니다. 

데이터 로딩과 에러 처리, 그리고 타입 정의까지 신경 써서 안정적인 애플리케이션을 만들어 봅시다.

</aside>

![예시 화면.png](attachment:60cfe208-3c5f-4ea0-ade8-b75c0ea507ee:예시_화면.png)

---

**1. `useParams`를 활용한 데이터 호출**

이 단계는 라우팅된 URL에서 동적인 값을 추출하여 API 요청에 사용하는 방법을 익히는 과정입니다.

- **라우트 설정:**
    - [ ]  **`react-router-dom`**을 사용하여 **`path="/movies/:movieId"`**와 같이 동적 라우팅을 설정했나요? (**`:movieId`** 부분에 어떤 값이든 들어올 수 있습니다.)
- **데이터 가져오기:**
    - [ ]  `useParams` 훅을 사용하여 URL에서 **`movieId`** 값을 성공적으로 가져왔나요?
    - [ ]  가져온 `movieId`를 사용하여 영화의 상세 정보와 출연진/제작진(**Credits**) 데이터를 각각의 API 엔드포인트로 요청했나요?

---

**2. UI 디자인 및 데이터 시각화**

이 단계는 불러온 데이터를 사용자에게 매력적으로 보여주는 UI/UX를 설계하고 구현하는 과정입니다.

- **상세 페이지 레이아웃:**
    - [ ]  영화 포스터, 제목, 평점, 줄거리 등 **상세 정보**를 보기 좋게 배치했나요?
    - [ ]  출연진과 제작진(감독, 배우 등) 목록을 추가하여 페이지를 풍부하게 구성했나요?
    - [ ]  **Tailwind CSS**를 활용해 미적인 감각을 살려 상세 페이지를 디자인했나요? 자유롭게 스타일을 꾸며보세요!

---

**3. 안정적인 애플리케이션 구축**

실제 서비스에서는 데이터 로딩 상태나 에러를 효과적으로 처리하는 것이 필수적입니다. 또한, TypeScript를 사용한다면 데이터의 타입을 명확히 정의하여 버그를 줄일 수 있습니다.

- **로딩 및 에러 처리:**
    - [ ]  영화 상세 정보와 크레딧 데이터를 불러오는 동안 **로딩 상태**를 사용자에게 표시했나요? (예: 스피너, 로딩 메시지)
    - [ ]  API 호출 중 에러가 발생했을 때, 사용자에게 **친절한 에러 메시지**를 보여주도록 처리했나요?
- **타입 정의:**
    - [ ]  불러온 영화 상세 정보, 크레딧 데이터의 타입(type) 또는 인터페이스(interface)를 안정적으로 정의했나요? (예: `interface MovieDetails`, `interface Credits`)
    - [ ]  정의된 타입을 활용하여 데이터를 안전하게 다루고 있는지 확인했나요?

---

### 🍠 미션 3. 제출

- 깃허브 주소
- 실행 영상

---

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

---

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
    

---

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
    

---

# 🍠 학습 회고

---

<aside>
🍠 이번 주차 워크북을 해결해보면서 어땠는지 **회고**해봅시다.

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
        

---

# 🥕 **"CSS가 이렇게 복잡해졌나?"**

---

<aside>
🥕

전 세계 개발자들이 선택한 스타일링 방법론의 대전쟁

현대 웹 개발에서 CSS를 작성하는 방법이 이렇게 많아진 이유는 무엇일까요? 

단순히 스타일을 꾸미는 것에서 시작된 CSS가 이제는 **성능**, **개발 경험**, **유지보수성**이라는 세 가지 축을 중심으로 치열한 경쟁을 벌이고 있습니다. 

실제 사용 통계와 구체적인 사례를 바탕으로 각 CSS 방법론이 어떤 문제를 해결하려 했는지, 그리고 지금 전 세계 개발자들이 어떤 선택을 하고 있는지 살펴보겠습니다.

참고로, 이 글은 100% **Perplexity**를 활용해 정리했습니다.

</aside>

[**"CSS가 이렇게 복잡해졌나?"**](https://www.notion.so/CSS-274b57f4596b81afb86ce93082498388?pvs=21)

---

# 🤔 참고 자료

---

[개발자 매튜 | React Router — History API를 활용한 SPA 라우팅 구현](https://www.yolog.co.kr/post/react-spa)

[Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.](https://tailwindcss.com/)

[Fetch API 사용하기 - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)

[시작하기 | Axios Docs](https://axios-http.com/kr/docs/intro)

[React Router Home](https://reactrouter.com/home)

---

# 🛡️ 저작권

---

**© 2025 [Kim Yongmin (Matthew)](https://www.youtube.com/@yongcoding). All rights reserved.**