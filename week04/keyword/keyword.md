### 키워드 정리 🍠

- **인증(Authentication)** vs **인가(Authorization)**
    <aside>
    🍠
    
    두 용어는 비슷해 보여도 하는 일이 완전히 달라요. 
    **인증(Authentication) “누구인지 확인”**하는 과정이고, 
    **인가는 “무엇을 할 수 있는지 결정”** 하는 과정이에요. 
    
    보통 **인증(Authentication) → 인가(Authorization)** 순서로 흐름이 이어져요.
    
    </aside>
    
    - **인증(Authentication)**
        - **인증(Authentication)**이란 무엇일까요?
            
            # **인증(Authentication)**이란 무엇일까요?
            
            ---
            
            **인증(Authentication)**은 쉽게 말해서 **“너는 누구니?”**를 확인하는 과정이에요.
            
            웹 서비스에 접속하는 사용자가 정말로 자신이 주장하는 사람인지 확인하는 절차죠.
            
            예를 들어, 누군가가 “저는 매튜입니다”라고 말했을 때, 시스템은 “정말 매튜가 맞는지”를 확인해야 해요. 
            
            이 과정을 거치지 않으면, 아무나 관리자 행세를 하거나 다른 사람의 계정을 도용해서 로그인할 수 있겠죠.
            
        - **인증(Authentication)** 방법의 예시
            
            # **인증(Authentication)** 방법의 예시
            
            ---
            
            1. **아이디와 비밀번호**
                - 가장 흔한 방법이에요. 사용자가 입력한 아이디/비밀번호가 DB에 저장된 값과 일치하는지 확인해요.
            2. **소셜 로그인 (OAuth)**
                - “구글로 로그인”, “깃허브로 로그인” 같은 방식이에요. 외부 서비스가 대신 신원을 보증해줘요.
            3. **2단계 인증(2FA, MFA)**
                - 아이디/비밀번호만으로 부족할 때, OTP(인증번호)나 휴대폰 문자, 이메일 인증을 추가로 요구해요.
            4. **생체인증**
                - 지문, 얼굴인식 같은 방식이에요. 요즘 모바일 앱에서 많이 쓰는 기술이에요.
        - **인증(Authentication)**의 위치
            
            # **인증(Authentication)**의 위치
            
            ---
            
            React 같은 프론트엔드에서는 **로그인 화면**을 통해 인증을 시도해요. 
            
            사용자가 아이디/비번을 입력하면 서버가 확인한 후, 인증에 성공하면 **세션(Session)**이나 **JWT 토큰**을 발급해줘요. 
            
            이 발급된 정보가 앞으로 “이 사용자는 **인증(Authentication)**된 사용자입니다”라는 증거가 돼요.
            
    - **인가(Authorization)**
        - **인가(Authorization)**란 무엇일까요?
            
            # **인가(Authorization)**란 무엇일까요?
            
            ---
            
            **인가(Authorization)**는 인증 다음에 나오는 개념이에요.
            
            “너는 무엇을 할 수 있니?”를 결정하는 과정이라고 생각하면 돼요.
            
            즉, **인증(Authentication)**이 “너가 매튜라는 걸 확인했어”라면, 인가는 “그렇다면 매튜는 관리자 페이지에 접근할 수 있어? 
            
            아니면 학생 페이지에만 접근해야 해?”를 판단하는 과정이에요.
            
        - **인가(Authorization)** 방법의 예시
            
            # **인가(Authorization)** 방법의 예시
            
            ---
            
            1. **역할 기반(Role-Based Access Control, RBAC)**
                - 사용자를 역할(role) 단위로 구분해요. 예: `admin`, `teacher`, `student`
                - `admin`은 모든 기능 가능, `student`는 제한된 기능만 가능.
            2. **속성 기반(Attribute-Based Access Control, ABAC)**
                - 나이, 소속, 결제 상태 등 특정 속성에 따라 권한을 줘요.
                - 예: “VIP 등급 사용자만 다운로드 가능”
            3. **정책 기반**
                - 시간, 장소, 기기 같은 조건을 고려해 접근을 제어해요.
                - 예: “회사 내부 네트워크에서만 접근 가능”
        - **인가(Authorization)**의 위치
            
            # **인가(Authorization)**의 위치
            
            ---
            
            React에서 **인가(Authorization)**를 구현할 때는 보통 **라우팅(페이지 접근 제어)** 단계에서 나타나요.
            
            예를 들어 로그인은 했지만, `admin` 권한이 없는 사용자가 관리자 페이지에 접근하려 하면 **403 Forbidden** 화면을 보여주는 거예요.
            
    - **인증(Authentication),** **인가(Authorization)의 차이**
        
        # 인증과 인가의 차이
        
        ---
        
        많은 사람들이 헷갈리는 부분이 바로 이 차이에요.
        
        - **인증(Authentication)**: “너 누구야?”
        - **인가(Authorization)**: “너 뭘 할 수 있어?”
        
        | 구분 | **인증(Authentication)** | **인가(Authorization)** |
        | --- | --- | --- |
        | **질문** | 너는 누구니? | 너는 무엇을 할 수 있니? |
        | **순서** | 항상 먼저 수행됨 | 인증이 끝난 후 수행됨 |
        | **목적** | 사용자의 신원 확인 | 권한을 확인하여 접근 제어 |
        | **실패 시 응답** | `401 Unauthorized` | `403 Forbidden` |
        | **예시** | 로그인 화면에서 ID/PW 확인 | 관리자 페이지 접근 권한 체크 |
    - **인증(Authentication),** **인가(Authorization)의 흐름 도식화**
        
        ```mermaid
        graph TD
            A["사용자 요청<br/>(로그인 시도)"] --> B{"인증<br/>(Authentication)"}
            B -->|로그인 실패| E["401 Unauthorized<br/>로그인 필요"]
            B -->|로그인 성공| C{"인가<br/>(Authorization)"}
            C -->|권한 없음| F["403 Forbidden<br/>접근 거부"]
            C -->|권한 있음| D["정상 처리<br/>리소스 접근"]
        
        ```

- **JWT(JSON Web Token)** vs **세션(Session)** 🍠
    <aside>
    🍠
    
    로그인 기능을 만든다고 하면 가장 먼저 고민하게 되는 게 **'사용자 인증을 어떻게 처리할까?'** 하는 문제예요. 크게 두 가지 방식이 있어요. 
    
    바로 **JWT(JSON Web Token) 방식과 세션(Session) 방식**입니다.
    
    </aside>
    
    - **JWT(JSON Web Token)**
        - **JWT(JSON Web Token)** 핵심 개념
            
            # **JWT(JSON Web Token)** 핵심 개념
            
            ---
            
            - 사용자가 **로그인 성공**하면 서버가 **서명된 토큰(AccessToken)** 을 발급해요.
            - 클라이언트는 이후 **모든 API 요청**에 이 토큰을 **HTTP 헤더**에 실어 보냅니다.
            
            ```tsx
            Authorization: Bearer <AccessToken>
            ```
            
            - 서버는 **토큰 안에 들어있는 정보**(서명, 만료 시간 등)만 확인해요.
            
            → 별도로 “서버 세션”을 저장하지 않아도 되기 때문에 **무상태(stateless)** 인증 방식이라고 부릅니다.
            
        - **JWT(JSON Web Token)** 장점
            
            # **JWT(JSON Web Token)** 장점
            
            ---
            
            1. **확장성**
                
                서버가 세션을 기억할 필요가 없으니, 서버를 여러 대로 확장하기 쉬워요. (스케일 아웃 구조에 적합)
                
            2. **서비스 간 공유 용이**
                
                마이크로서비스 환경에서도 동일한 토큰을 전달해서 인증을 쉽게 공유할 수 있어요.
                
            3. **클라이언트 친화적**
                
                웹, 모바일, 데스크톱 앱 등 **여러 종류의 클라이언트에서 똑같은 방식**으로 사용할 수 있어요.
                
        - **JWT(JSON Web Token)** 단점과 주의사항
            
            # **JWT(JSON Web Token)** 단점과 주의사항
            
            ---
            
            1. **토큰 유출 위험**
                
                토큰이 탈취되면 만료 전까지는 누구나 쓸 수 있어요.
                
                → 그래서 **어디에 저장할지**(cookie, localStorage 등)와 **보안 설정**이 매우 중요합니다.
                
            2. **즉시 무효화 어려움**
                
                이미 발급된 토큰은 **만료 시간(exp)** 전까지 기본적으로 유효합니다.
                
                → 해결책:
                
                - **짧은 수명의 AccessToken** 발급
                - **RefreshToken**을 함께 발급하고 주기적으로 회전(rotate)
                - 서버에서 **블랙리스트**를 관리해 강제 만료 처리
            3. **보안 설계 필요**
                
                저장 위치, 토큰 만료 정책, 재발급 흐름 등을 제대로 설계하지 않으면 보안 구멍이 생깁니다.
                
        - **JWT(JSON Web Token)** 인증 클라이언트 흐름
            
            # **JWT(JSON Web Token)** 인증 클라이언트 흐름
            
            ---
            
            1. **로그인 요청**
                - 서버가 **AccessToken(짧은 수명)** + **RefreshToken(긴 수명)** 을 발급.
            2. **API 요청**
                - 클라이언트는 `Authorization: Bearer <AccessToken>` 헤더를 붙여 요청.
            3. **토큰 만료 대응**
                - API에서 **401 Unauthorized** 응답이 오면,
                - **RefreshToken**으로 AccessToken을 새로 발급받음.
                - React에서는 보통 **axios interceptor**를 사용해 이 로직을 자동화합니다.
            4. **로그아웃 처리**
                - 서버에 RefreshToken 무효화 요청
                - 클라이언트에서 저장된 토큰 제거
    - **세션(Session)**
        - **세션(Session)** 핵심 개념
            
            # **세션(Session)** 핵심 개념
            
            ---
            
            - 사용자가 **로그인 성공**하면, 서버가 **세션(Session) ID**를 생성하고 **세션(Session) 저장소(메모리, Redis 등)**에 저장해요.
            - 클라이언트(브라우저)에는 이 세션 ID가 **쿠키**로 내려갑니다.
            - 이후 클라이언트가 API 요청을 보낼 때마다 **쿠키에 담긴 세션(Session) ID**가 자동으로 전송돼요.
            - 서버는 **세션(Session)** ID를 확인해 “이 사용자가 로그인한 사용자다”라고 판단합니다.
            
            ➡️ 즉, **서버가 상태(state)를 직접 관리**하는 방식이에요.
            
        - **세션(Session)** 장점
            
            # **세션(Session)** 장점
            
            ---
            
            1. **보안 관리가 용이**
                - **세션(Session)** 데이터가 서버에 저장되므로, 서버가 마음대로 만료시키거나 무효화할 수 있어요.
                - 즉시 강제 로그아웃 같은 제어가 쉬워요.
            2. **쿠키 자동 전송**
                - 브라우저가 같은 도메인 요청에는 자동으로 쿠키를 붙여 주기 때문에, 클라이언트 코드에서 헤더를 직접 조작할 필요가 적어요.
            3. **전통적인 방식**
                - PHP, JSP, Django, Spring 등 오래된 웹 프레임워크부터 지금까지 폭넓게 사용되어 온 안정적인 방법이에요.
        - **세션(Session)** 단점과 주의 사항
            
            # **세션(Session)** 단점과 주의 사항
            
            ---
            
            1. **서버 확장 어려움**
                - **세션(Session)**이 서버에 저장되므로, 서버를 여러 대로 늘릴 경우 **세션(Session) 동기화** 문제가 발생해요.
                - 보통 Redis 같은 중앙 **세션(Session)** 저장소를 도입해야 해결할 수 있어요.
            2. **스케일 아웃에 불리**
                - 무상태(stateless)한 JWT에 비해, 서버 확장성이 떨어져요.
            3. **보안 이슈 (CSRF)**
                - 쿠키가 자동 전송되기 때문에, 다른 사이트에서 의도치 않게 요청을 보내는 **CSRF 공격**에 취약해요.
                - 이를 막기 위해 **CSRF 토큰**이나 **SameSite 쿠키 옵션**을 함께 사용해야 합니다.
        - **세션(Session)** 관리 옵션 (쿠키 기반)
            
            # **세션(Session)** 관리 옵션 (쿠키 기반)
            
            ---
            
            쿠키에는 보안 관련 옵션을 잘 설정하는 것이 중요해요:
            
            - **HttpOnly**: 자바스크립트에서 접근 불가 → XSS 방어 강화
            - **Secure**: HTTPS에서만 전송 → 네트워크 도청 방지
            - **SameSite**: 크로스 사이트 요청에서 쿠키 전송 여부 제어
                - `Strict`: 같은 사이트에서만 전송 (보안 ↑, UX ↓)
                - `Lax`: 대부분 안전, 기본 추천
                - `None; Secure`: 크로스 도메인 환경에서 필요 (단 HTTPS 필수)
        - **세션(Session)** 인증 클라이언트 흐름
            
            ## **세션(Session)** 인증 클라이언트 흐름
            
            ---
            
            1. **로그인 요청**
                - 서버가 사용자 검증 후, **세션(Session)** ID를 생성해 **세션(Session)** 저장소에 저장.
                - **세션(Session)** ID를 담은 **쿠키**를 클라이언트에 내려줌.
            2. **API 요청**
                - 브라우저가 자동으로 쿠키를 붙여 보냄.
                - 서버는 **세션(Session)** 저장소에서 해당 **세션(Session)** ID를 찾아 인증 확인.
            3. **세션(Session) 만료/로그아웃**
                - 서버에서 **세션(Session)**을 삭제하면, 사용자는 더 이상 인증되지 않음.
                - 즉시 강제 로그아웃 가능.
            4. **React에서 주의할 점**
                - `fetch`나 `axios` 요청에 **`withCredentials: true`** 옵션을 줘야, 쿠키가 API 요청에 포함돼요.
            
            ```tsx
            import axios from "axios";
            
            axios.get("http://localhost:4000/user", {
              withCredentials: true, // 쿠키 포함
            });
            ```
            
    - **📚 블로그 읽고 세션과 토큰 정리해보기 🍠**
        
        # 📚 블로그 읽고 세션과 토큰 정리해보기
        
        ---
        
        [[🔐인증] 2. 세션 vs 토큰: 사용자의 상태를 어디에 저장할까](https://velog.io/@cucumtomatobean/dtd9x1yh)
        
        - 세션 방식과 토큰 방식의 가장 큰 차이는 무엇인가요? 🍠
            - 세션: 실제 사용자 정보를 서버에 저장하고, 클라에 그 정보를 찾을 키만 전달
            - 토큰: 사용자 정보를 토큰에 포함시켜 클라가 보관하고 전송
        - 세션을 분산 환경에서 관리할 때 사용할 수 있는 세 가지 전략(Sticky Session, Session Replication, Centralized Session Store)의 특징을 정리해주세요. 🍠
            - Sticky sesseion: 로드밸런서가 같은 사용자의 요청을 항상 같은 서버로 전달
            - Session Replication: 모든 서버가 세션 정보를 공유
            - Centralized Session Store*: Redis같은 별도 저장소에서 모든 세션 보관
        - JWT(Json Web Token)의 장점과 단점을 각각 설명해주세요. 🍠
            
            장: 서버 부담이 적음, 토큰자체에 사용자 정보 포함
            단:즉시 무효화 어려움, 네트워크 부담
            
        - JWT의 즉시 무효화 문제가 생기는 이유와 이를 해결하기 위한 방법은 무엇인가요? 🍠
            
            : 한번 발급된 토큰은 토큰에 정해진 만료 시간까진 유효함
            
            - 만료시간을 짧게
        - 세션과 토큰을 결합한 하이브리드 방식(JWT + 저장소 메타데이터)의 동작 원리를 간단히 설명해주세요. 🍠
            1. JWT의 JTI클레임 활용: 각 토큰의 고유 ID부여
            2. 로그아웃 시: 해당 토큰 ID를 블랙리스트에 등록
            3. 요청 검증시: 블랙 리스트 확인? 거부 : 검증 진행

- **토큰**은 무엇인가?
    <aside>
    🍠
    
    **토큰**은 **“인증과 권한을 검증하기 위해 발급되는 문자열”**이에요.
    
    쉽게 말하면, **“나, 인증된 사용자야!”**라는 것을 서버에 증명할 수 있는 
    일종의 **출입증**이라고 보면 됩니다.
    
    </aside>
    
    - **Basic Token**
        
        # **Basic Token**
        
        ---
        
        **방식**:
        
        - `아이디:비밀번호` 문자열을 `Base64`로 인코딩해서 **Authorization 헤더**에 담아 전송.
        - 예:
        
        ```tsx
        Authorization: Basic dXNlcjpwYXNzd29yZA==
        ```
        
        **특징**:
        
        - 단순하지만 보안상 위험해요. (비밀번호가 그대로 노출될 수 있음 → **HTTPS 필수**)
        - 거의 쓰이지 않고, 테스트나 내부 서비스에서만 가볍게 쓰이는 편이에요.
    - **Bearer Token**
        
        # **Bearer Token**
        
        ---
        
        **방식**:
        
        - `Authorization: Bearer <토큰>` 형태로 토큰을 헤더에 담아 전송.
        - 예:
            
            ```tsx
            Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
            ```
            
        
        **특징**:
        
        - 가장 널리 쓰이는 방식이에요.
        - “Bearer”는 “이 **토큰**을 가진 사람은 자격이 있다(권한을 가진다)”라는 의미예요.
        - 주로 **JWT(JSON Web Token)** 같은 **토큰** 형식이 Bearer 방식으로 전달돼요.
    - **Access Token vs Refresh Token**
        
        # **Access Token vs Refresh Token**
        
        토큰 기반 인증에서 자주 등장하는 두 가지 토큰이에요.
        
        ---
        
        ### (1) Access Token
        
        - **역할**:
            - API 요청 시 **사용자 인증/인가 확인** 용도로 사용.
            - 예: `내가 /users/me 요청할 때, 이 토큰을 보고 내가 누구인지 확인해줘!`
        - **수명**:
            - **짧음 (보통 15분~30분)**
            - 이유: 만약 탈취당하면 위험하니까, 빨리 만료되도록 설계해요.
        - **저장 위치**:
            - 보통 **메모리**, 또는 짧게 쓰는 용도로 `localStorage`/`cookie`.
        
        ---
        
        ### (2) Refresh Token
        
        - **역할**:
            - **AccessToken이 만료되었을 때 새로운 AccessToken을 발급받기 위해 사용**해요.
            - 예: `내 AccessToken 만료됐는데, RefreshToken 있으니 새로운 AccessToken 하나 주세요!`
        - **수명**:
            - **김 (보통 7일 ~ 30일)**
            - 서버가 탈취를 감지하면 바로 폐기할 수도 있어요.
        - **저장 위치**:
            - **HttpOnly 쿠키**에 저장하는 게 권장돼요. (JS에서 접근 불가 → 보안 강화)
        
        ---
        
        ## (3) AccessToken + RefreshToken 동작 흐름
        
        1. **로그인** → 서버가 AccessToken(짧음) + RefreshToken(김)을 발급.
        2. **API 요청** → 클라이언트는 AccessToken을 `Authorization: Bearer` 헤더에 담아 요청.
        3. **AccessToken 만료** → 서버가 “401 Unauthorized” 응답.
        4. **RefreshToken 사용** → 클라이언트가 RefreshToken을 서버에 보내 새 AccessToken을 발급받음.
        5. **재로그인 필요** → RefreshToken마저 만료되면, 다시 로그인해야 함.

- **클라이언트 저장소 전략** 🍠
    <aside>
    🍠
    
    로그인 후 서버가 발급해준 **토큰(JWT)** 이나 **세션 ID** 같은 민감한 정보를 어디에 저장할지 고민해야 해요.
    
    대표적인 저장소는 **쿠키(Cookie)**, **로컬 스토리지(localStorage)**, **세션 스토리지(sessionStorage)**예요.
    
    </aside>
    
    ---
    
    - 쿠키 (Cookie)
        
        # 쿠키 (Cookie)
        
        ---
        
        ### ✅ 특징
        
        - **브라우저가 자동으로 서버에 전송**
            - 같은 도메인 요청 시 브라우저가 알아서 쿠키를 붙여줘요.
        - **만료일 설정 가능** (`expires`, `max-age`)
        - **도메인/경로 제한 가능**
        - **보안 속성 제공**:
            - `HttpOnly`: JS에서 접근 불가 → XSS 방어
            - `Secure`: HTTPS 환경에서만 전송
            - `SameSite`: 크로스 도메인 요청에서 전송 여부 제어
        
        ---
        
        ### 📌 장점
        
        - 자동 전송 덕분에 편리해요.
        - `HttpOnly` 옵션으로 자바스크립트 접근을 막을 수 있어 **보안성이 높음**.
        
        ---
        
        ### 📌 단점
        
        - 자동 전송이기 때문에 **CSRF(Cross-Site Request Forgery)** 공격 위험이 있어요.
            
            → `SameSite`, CSRF 토큰 같이 써야 안전해요.
            
    - 📚 블로그 읽고 쿠키 정리해보기! 🍠
        
        # 📚 블로그 읽고 쿠키 정리해보기! 🍠
        
        ---
        
        [개발자 매튜 | HTTP 쿠키 이해하기](https://www.yolog.co.kr/post/http-cookie)
        
        [[🔐인증] 1. HTTP는 무상태인데 로그인 상태는 어떻게 유지할까](https://velog.io/@cucumtomatobean/%EC%9D%B8%EC%A6%9D-1.-HTTP%EB%8A%94-%EB%AC%B4%EC%83%81%ED%83%9C%EC%9D%B8%EB%8D%B0-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%83%81%ED%83%9C%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9C%A0%EC%A7%80%ED%95%A0%EA%B9%8C)
        
        - HTTP는 왜 무상태(Stateless)로 설계되었나요? 🍠
            - 서버가 클라의 요청을 독립적으로 처리하며 그 정보를 보관하지 않음: 확장성과 단순성
        - HTTP의 무상태성이 주는 장점과 단점을 각각 정리해주세요. 🍠
            - 장: 확장,신뢰.단순
            - 단: 연속적인 작업의 어려움, 복잡한 상호작용, 매요청마다 인증
        - 쿠키의 Domain 디렉티브에 대해 정리해주세요. 🍠
            
            : 쿠키가 어느 도메인에서 유효안지 지정
            
            ```jsx
            Set-Cookie: sessionId=abc123; Domain=example.com
            example.com ✅
            api.example.com ✅
            www.example.com ✅
            ```
            
        
        - 쿠키의 Path 디렉티브에 대해 정리해주세요. 🍠
            
            :쿠키가 전송될 URL경로르 제한
            
            ```jsx
            Set-Cookie: token=xyz; Path=/api
            /api/users ✅
            /api/products ✅
            /home ❌
            /about ❌
            ```
            
        - 세션 쿠키와, 영속 쿠키의 차이점을 정리해주세요. 🍠
            - 세션 큐키: 브라우저 종료시 삭제(로그인 후 브라우저 닫으면 로그아웃)
            - 영속 쿠키: 만료 시까지 저장( ‘로그인 상태 유지’ 기능)
            
        - 쿠키의 보안 속성(HttpOnly, Secure, SameSite)은 각각 어떤 공격을 방어하나요? 🍠
            - HttpOnly: Xss공격 방어 / JS에서 쿠키 접근 차단
            - Secure: 중간자 공격 방어 / HTTPS에서만 쿠키 전송(HTTP는 안됨)
            - SamSite:CSRF 공격 방어
        - 쿠키의 한계점(용량, 보안, 네트워크, 도메인 제약)을 정리해주세요. 🍠
            - 용량: 쿠키는 최대 4KB까지만 저장
            - 보안: 클라이언트 측에 쿠키가 저장되므로 사용자가 조작 가능 & 개발자 도구
            - 네트워크: 쿠키는 해당 도메인의 모든 요청에 자동 포함, 이미지나 CSS파일 요청에도
            - 도메인 제약: 설정된 도메인에서만 접근 가능
        - 쿠키만으로 상태 관리를 해결할 수 없는 이유는 무엇인가요? 🍠
            - 저장공간, 보안
    - 로컬 스토리지 (Local Storage)
        
        # 로컬 스토리지 (localStorage)
        
        ---
        
        ### ✅ 특징
        
        - 브라우저에 **반영구적 저장소** (브라우저 껐다 켜도 유지됨).
        - 저장 용량이 크고 문자열 기반.
        - **직접 꺼내 쓰는 방식** → 요청 시 자동 전송 ❌.
        
        ---
        
        ### 📌 장점
        
        - 사용하기 쉽고 API 간단 (`setItem`, `getItem`).
        - 사용자 설정, 토큰 같은 데이터 유지에 유용.
        
        ---
        
        ### 📌 단점
        
        - **XSS 공격에 취약**
            
            (JS에서 접근 가능하니까, 악성 스크립트가 토큰을 훔칠 수 있어요).
            
        - 수동으로 헤더에 토큰을 넣어야 함. (`Authorization: Bearer <token>`)
    - 📚 블로그 읽고 XSS(Cross-SIte Scripting) 정리해보기! 🍠
        
        # 📚 블로그 읽고 XSS(Cross-SIte Scripting) 정리해보기! 🍠
        
        ---
        
        [개발자 매튜 | XSS(Cross-Site Scripting) 크로스 사이트 스크립팅 공격이란?](https://www.yolog.co.kr/post/security-xss)
        
        - XSS 공격은 무엇인가요?
            
            : 공격자가 웹 애플리케이션에 **악성 스크립트를 삽입**해 다른 사용자의 브라우저에서 실행되도록 하는 공격입니다.
            
            ```jsx
            해커가 악성 스크립트를 웹사이트에 주입
            다른 사용자가 해당 페이지 방문
            브라우저는 신뢰하는 사이트이므로 스크립트 실행
            사용자 정보 탈취
            ```
            
        - XSS 방어 전략에 대해 정리해주세요.
            - HTML Sanitization: 위험한 HTML태크과 JS를 제거해주는 라이브러리 사용
            
            ```jsx
            const DOMPurify = require('isomorphic-dompurify');
            const cleanHTML = DOMPurify.sanitize(dirtyHTML);
            ```
            
            - HTML 이스케이프 처리: HTML 특수문자를 브라우저가 해설할 수 없는 문자로 변환
            
            ```jsx
            < => &lt
            > => &gt;
            & => &amp;
            " => &quot;
            ' => &#39;
            ```
            
    
    - 세션 스토리지 (Session Storage)
        
        # 세션 스토리지 (sessionStorage)
        
        ---
        
        ### ✅ 특징
        
        - **브라우저 탭 단위 저장소**.
        - 탭이나 창을 닫으면 자동 삭제됨.
        - API 사용법은 localStorage와 동일.
        
        ---
        
        ### 📌 장점
        
        - 민감한 데이터를 **짧게 유지**할 때 적합.
        - 자동 삭제 → 사용자가 로그아웃하지 않아도 보안성 조금 더 나음.
        
        ---
        
        ### 📌 단점
        
        - 탭 닫으면 데이터 날아감 → **로그인 유지 불가능**.
        - 역시 JS에서 접근 가능 → XSS 취약.
    - 📚 블로그 읽고 세션 하이재킹 정리해보기 🍠
        
        # 📚 블로그 읽고 세션 하이재킹 정리해보기
        
        ---
        
        [개발자 매튜 | 세션 하이재킹 완벽 가이드 - 쿠키 탈취(XSS) 공격과 HttpOnly 방어법](https://www.yolog.co.kr/post/security-session-hijacking/)
        
        - 세션 하이재킹은 무엇인가요? 🍠
            
            :공격자가 정상 사용자의 세션ID를 탈취하여 악용
            
        - 하이재킹 공격을 차단하는 방법은 무엇인가요? 🍠
            
            : HttpOnly, Secure플래그 
            
        - 쿠키의 다양한 옵션들에 대해서 정리해주세요. 🍠
            - HttpOnlyJavaScript에서 쿠키 접근 차단 (XSS 방어)
            - SecureHTTPS에서만 쿠키 전송 (중간자 공격 방어)
            - SameSite크로스 사이트 요청 제한 (CSRF 방어)
            - Max-Age쿠키 만료 시간 설정 (초 단위)
            - Path쿠키가 전송될 경로 지정
            - Domain쿠키가 유효한 도메인 설정
            
            ```jsx
            Set-Cookie: sid=abc123; HttpOnly; Secure; SameSite=Strict; Max-Age=3600; Path=/
            ```
            
        
    - 📚 블로그 읽고 CSRF 공격 정리해보기 🍠
        
        # 📚 블로그 읽고 CSRF 공격 정리해보기
        
        ---
        
        [개발자 매튜 | 프론트엔드·백엔드 개발자라면 꼭 알아야 할 CSRF 공격과 방어법](https://www.yolog.co.kr/post/security-csrf)
        
        - CSRF는 무엇인가요? 🍠
            
            : 인증된 사용자가 모르는사이에 악성 사이트를 통해 정상 사이트로 요청을 보내게 만드는 공격
            
            ```jsx
            피해자가 은행 사이트에 로그인 (세션 쿠키 발급)
            공격자 사이트 방문 (악성 링크 클릭)
            자동으로 은행 API 호출 (송금, 비밀번호 변경 등)
            브라우저가 쿠키를 자동 전송 (인증된 요청으로 처리)
            ```
            
        - CSRF 방어 전략에 대해 정리해주세요. 🍠
            - **SameSite 쿠키:**브라우저에게 "이 쿠키는 같은 사이트에서만 사용해!"라고 알려주는 설정
            
            ```jsx
            Set-Cookie: sessionId=abc123; SameSite=Strict
            
            - `matthew.com` → `matthew.com` 요청: 쿠키 전송 
            - `hacker.com` → `matthew.com` 요청: 쿠키 차단 
            ```
            
            - CSRF 토큰: 서버가 암호를 HTML에 숨겨놓고 요청할 때 암호를 확인
            - Custom Header 검증: JS로만 추가 가능한 커스텀 헤더를 요구
            ⇒ 악성 사이트는 CORS 정책 때문에 커스텀 헤더를 추가한 크로스 도메인 요청을 보낼 수 없음
            - Referer/Origin: "이 요청이 어디서 왔는지" 확인하는 방식
        - CSRF 토큰의 장점과 단점에 대해 정리해주세요. 🍠
            - 장: 모든 브라우저 지원, SamSite와 이중 방어
            - 단: 구현 어려움, 모든 폼과 AJAX 요청에 수동으로 토큰 추가, XSS공격으로 토큰 유출 가능
        - CAPTCHA는 무엇인가요? 🍠
            
            : 사람과 봇을 구별하는 자동화된 테스트 ex) 신호등 선택, 자동차 찾기
            
        
        [[🔐인증] 3. 쿠키 vs 헤더: 데이터를 어떻게 전송할까](https://velog.io/@cucumtomatobean/%EC%9D%B8%EC%A6%9D-3.-%EC%BF%A0%ED%82%A4-vs-%ED%97%A4%EB%8D%94-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%A0%84%EC%86%A1%ED%95%A0%EA%B9%8C)
        
        - 쿠키 방식으로 인증 정보를 전송할 때 브라우저가 자동으로 쿠키를 포함하는 조건은 무엇인가요? 🍠
            - 같은 도메인
            - 다른 도메인
            
            ```jsx
            클라이언트: credentials: 'include'
            서버: Access-Control-Allow-Credentials: true
            ```
            
        - 크로스 도메인 환경에서 쿠키를 전송하려면 서버와 클라이언트 측에서 각각 어떤 설정이 필요할까요? 🍠
            
            ```jsx
            클라이언트: credentials: 'include'
            서버: Access-Control-Allow-Credentials: true
            ```
            
        - 쿠키 기반 인증에서 CSRF 공격이 발생할 수 있는 원리는 무엇인가요? 🍠
            
            : 브라우저가 자동으로 쿠키를 포함시키기 때문에
            
            ```jsx
            1. 사용자가 bank.com에 로그인 (쿠키 저장)
            2. 악성 사이트 hacker.com 방문
            3. hacker.com에서 bank.com으로 요청 발생
               <img src="http://bank.com/transfer?amount=10000" />
            4. 브라우저가 자동으로 bank.com 쿠키 포함 전송 🚨
            5. 서버는 정상 인증 요청으로 판단하여 송금 처리
            ```
            
        - 헤더 방식 인증의 주요 장점(예: CSRF 방어, 선택적 전송, CORS 단순화)을 정리해주세요. 🍠
            - CSRF 원천 차단: 헤더는 자동 전송 안 됨
            - 선택적 전송: 필요한 요청에만 토큰 포함
            - CORS 단순화: `credentials` 설정 불필요, 와일드카드 사용 가능
        - 토큰을 클라이언트에 저장할 때 LocalStorage, SessionStorage, 메모리 저장의 장단점을 비교해주세요. 🍠
            - **LocalStorage**: 편리하지만 XSS에 완전 노출, 영구 저장
            - **SessionStorage**: 탭 닫으면 삭제되어 LocalStorage보다 안전하지만 여전히 XSS 취약
            - **메모리**: 가장 안전 (XSS 접근 어려움), 새로고침 시 재인증 필요
        - Single Page Application, Mobile Application, Server Side Rendering Application 에서 여러분들이 생각하는 적합한 인증 전략은 무엇이라고 생각하시나요? 🍠
            
            
        
    - 저장소 전략 비교
        
        
        | 저장소 | 자동 전송 | 수명 | 보안 옵션 | XSS 취약 | CSRF 취약 | 활용 예시 |
        | --- | --- | --- | --- | --- | --- | --- |
        | **쿠키** | ✅ (자동) | 설정 가능 | ✅ (HttpOnly, Secure, SameSite) | ❌ (HttpOnly면 방어) | ✅ | RefreshToken 저장 |
        | **localStorage** | ❌ (직접 꺼내 써야 함) | 영구적 | ❌ | ✅ | ❌ | AccessToken 저장 |
        | **sessionStorage** | ❌ | 탭 종료 시 삭제 | ❌ | ✅ | ❌ | 임시 세션 데이터 |
- **Custom Hook**을 왜 사용하는가?
    <aside>
    🍠
    
    리액트 훅은 **함수형 컴포넌트에서 “상태/생명주기/DOM참조/컨텍스트”를 선언적으로 다루기 위한 표준 도구**에요. (옛날에는, 리액트가 클래스 기반이었어요!)
    
    클래스 없이도 컴포넌트가 “기억”하고, “변화”에 반응하며, “부수효과”를 안전하게 처리할 수 있게 해줘요.
    
    - **상태 관리**: `useState`로 값이 바뀌면 화면이 자동으로 리렌더링돼요.
    - **부수 효과 관리**: `useEffect`로 “언제” API를 호출할지/리스너를 붙였다 뗄지 제어해요.
    - **참조 유지**: `useRef`로 리렌더링과 무관한 값을 기억하거나 DOM을 직접 참조해요.
    - **전역 데이터**: `useContext`로 props 없이 필요한 곳에서 바로 꺼내 써요.
    - **재사용 가능한 로직**: 여러 훅을 조합해 **Custom Hook**으로 묶으면, 화면(UI)과 로직을 깔끔히 분리하고 재사용할 수 있어요.
    
    즉, **Custom Hook(커스텀 훅)**은 **React의 내장 훅(`useState`, `useEffect`, `useRef` 등)을 조합하여 특정 기능을 모듈화하고 재사용할 수 있도록 만든 함수**예요.
    </aside>
    
    - **Custom Hook**을 왜 사용할까?
        
        # **Custom Hook**을 왜 사용할까?
        
        1. **코드 중복 제거**: 여러 컴포넌트에서 쓰는 로직을 한 군데로 모아서 재사용해요.
        2. **관심사 분리**: 화면(UI)과 비즈니스 로직을 분리해 가독성과 유지보수성이 좋아져요.
        3. **유지보수 용이**: 로직을 한 파일에서 관리하니 수정이 쉬워요.
        4. **테스트 용이**: UI 없이도 로직만 독립적으로 테스트하기 좋아요.
        5. **명시적 의존성**: 훅의 의존성 배열을 통해 “언제 실행/정리할지”를 선언적으로 관리해요.
    - **Custom Hook**은 어디에 보관할까?
        
        # **Custom Hook**은 어디에 보관할까?
        
        보통 `src/hooks/` 폴더를 만들어 **재사용 가능한 Custom Hook**을 넣어요.
        
        ```tsx
        📂 src
         ├─ 📂 components
         ├─ 📂 hooks
         │   ├─ useFetch.ts         // 데이터 요청/취소/에러 관리
         │   ├─ useLocalStorage.ts  // 웹 스토리지 동기화
         │   ├─ useDebounce.ts      // 입력 지연 처리
         │   ├─ useAuth.ts          // 로그인/토큰/프로필 상태
         │   └─ useTheme.ts         // 테마(라이트/다크) 전역 상태
         ├─ 📂 pages
         ├─ 📂 utils
         ├─ App.tsx
         └─ main.tsx
        ```
        
        여러분들이 위에 있는 훅들은 저와 앞으로 만들어볼 훅들이에요, 지금 모른다고 너무 걱정하지 않으셔도 됩니다! 
        
    - **Custom Hook** 기본 문법
        
        # **Custom Hook** 기본 문법
        
        ```tsx
        import { useState } from "react";
        
        function useCustomHook() {
          const [value, setValue] = useState("");
        
          const updateValue = (newValue: string) => setValue(newValue);
        
          return { value, updateValue };
        }
        
        export default useCustomHook;
        ```
        
        - **Custom Hook** 이름은 반드시 `use`로 시작해요(리액트 규칙).
        - 내부에서 다른 훅(`useState`, `useEffect` 등)을 “정상적인 순서”로 호출해야 해요.
    - **Custom Hook** 직접 만들어보기 🍠
        
        # **Custom Hook** 직접 만들어보기
        
        ---
        
        처음이니, 한번 같이 엄청나게 간단한 **Custom Hook**을 하나 만들어볼 거예요.
        
        이번에 같이 만들어 볼 **Custom Hook**은 **`useToggle`**이라는 Hook이에요.
        
        토글(toggle)은 값이 **true ↔ false**로 전환되는 기능인데, 다크모드 전환, 모달 열기/닫기, 스위치 버튼 등에 자주 쓰여요.
        
        ---
        
        ## 1. 기존 코드에서 어떤 문제가 있었을까?
        
        보통 토글을 구현할 때는 **`useState`**만 단독으로 사용했어요.
        
        ```tsx
        import { useState } from "react";
        
        const ToggleExample = () => {
          const [isOpen, setIsOpen] = useState(false);
        
          return (
            <div>
              <h1>{isOpen ? "열림" : "닫힘"}</h1>
              <button onClick={() => setIsOpen(!isOpen)}>토글</button>
            </div>
          );
        };
        
        export default ToggleExample;
        ```
        
        위의 코드는 잘 동작하긴 하지만, 이런 문제가 있어요:
        
        1. **토글 로직이 중복됨**
            
            다른 컴포넌트에서도 토글을 만들 때마다 `setState(!state)` 같은 코드를 계속 반복해야 함.
            
        2. **재사용이 어려움**
            
            모달, 다크모드, 드롭다운 등에서 같은 로직을 다시 작성해야 함.
            
        
        <aside>
        🍠
        
        **실무에서는 이런 문제가 많이 발생해요.**
        
        매튜, 저희가 기존에 만들었던 서비스의 UI를 변경하기 위한 지표로 쓰기 위해서 앞으로 유저의 버튼 클릭 빈도수를 알고 싶어서, 모든 토글을 열고 닫는 로직에 사용자의 행동을 추적할 수 있도록 로깅을 해주시면 좋겠어요!
        
        ---
        
        ### 😥 **Custom Hook**을 만들지 않았다면
        
        앱 내의 모든 토글 컴포넌트를 **일일이 찾아다니며** 로깅 코드를 추가해야 해요.
        
        - **비효율적:** 토글이 100개 있다면, 100개 파일을 모두 수정해야 해요.
        - **오류 발생 가능성:** 사람이 직접 하다 보니 실수로 한두 개를 빠뜨리거나 오타를 낼 수 있어요. (휴먼 에러 확률 올라감!)
        - **유지보수 지옥:** 로깅 방식이 변경될 때마다 이 작업을 **계속 반복**해야 하는 문제가 생깁니다. (일하기 싫어짐!)
        
        ---
        
        ### ✨ **Custom Hook**을 만들었다면
        
         **`useToggle` 훅 파일 하나에** 로깅 로직을 추가하면 됩니다.
        
        - **재사용성:** 로직이 한 곳에 모여 있어 코드가 **중복되지 않아요.**
        - **일관성:** `useToggle` 훅을 사용하는 모든 컴포넌트에 변경 사항이 자동으로 반영되어, 코드가 **일관성 있게** 관리되요.
        - **쉬운 유지보수:** 나중에 로깅 방식이 바뀌더라도 **Custom Hook** 내부만 수정하면 되기 때문에 **유지보수가 훨씬 쉬워요.**
        </aside>
        
        ---
        
        ## 2. 그래서 Custom Hook으로 개선해보자!
        
        반복되는 로직을 `useToggle`이라는 Custom Hook으로 분리하면 훨씬 깔끔해져요.
        
        ```tsx
        import { useState } from "react";
        
        function useToggle(initialValue: boolean = false) {
          const [state, setState] = useState(initialValue);
        
          // 토글 로직을 내부에 캡슐화
          const toggle = () => setState((prev) => !prev);
        
          return [state, toggle] as const;
        }
        
        export default useToggle;
        ```
        
        ---
        
        ## 3. 이제 훨씬 깔끔하게 사용 가능!
        
        ```tsx
        import useToggle from "../hooks/useToggle";
        
        const ToggleExample = () => {
          const [isOpen, toggle] = useToggle(false);
        
          return (
            <div>
              <h1>{isOpen ? "열림" : "닫힘"}</h1>
              <button onClick={toggle}>토글</button>
            </div>
          );
        };
        
        export default ToggleExample;
        ```
        
        ---
        
        ## 4. 무엇이 좋아졌을까?
        
        - **중복 코드 제거** → `setState(!state)`를 매번 작성할 필요 없어요.
        - **재사용 가능** → 모달, 다크모드, 드롭다운 등 어디서든 불러다 쓸 수 있어요.
        - **가독성 향상** → `const [isOpen, toggle] = useToggle(false);` 한 줄로 바로 의미 파악 이 가능해요.
        
        ---
