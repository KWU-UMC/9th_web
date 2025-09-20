# Chapter 01 - TypeScript의 기본

# 📝 학습 목표

---

- **TypeScript 기초 이해**: TypeScript가 무엇인지, 왜 필요한지 이해할 수 있어요.
- **타입 시스템 마스터**: 반환값 타입, 리터럴 타입, 배열/튜플 타입 등 다양한 타입 정의 방법 습득할 수 있어요.
- **고급 타입 기능에 대해 이해할 수 있어요.**
    - 유니언 타입 (|)으로 유연한 타입 정의
    - Type Aliases를 통한 타입 재사용
    - Interface를 활용한 객체 타입 정의
    - Generic으로 재사용 가능한 컴포넌트 작성
    - Enum과 Utility Type 활용법

<aside>
💡 이번 주차는 **TypeScript의 핵심 개념과 타입 시스템**을 전반적으로 다루는 주차예요. TypeScript가 왜 필요한지부터 시작해서 다양한 타입 정의 방법, Interface, Generic 등 실무에서 자주 쓰이는 기능들을 학습합니다. 한 번에 완벽하게 이해하려 하지 말고, 실습하면서 점진적으로 익혀나가세요.

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

- 왜 **`TypeScript`**를 학습해야 할까요?
    
    ### TypeScript
    
    마이크로소프트는 **JavaScript의 Superset 언어**인 TypeScript를 공개했어요.
    
    Superset이란 기존 언어 위에 새로운 기능과 문법을 더해서 보완하거나 향상시키는 언어를 말해요.
    
    **`TypeScript`**는 **기존 JavaScript 코드를 그대로 사용할 수 있어서** 많은 개발자들이 쉽게 받아들였어요.
    
    ---
    
    ### TypeScript 활용 시 장점이에요
    
    1. **안정성 보장** – 타입 검사로 런타임 오류를 줄여줘요.
    2. **개발 생산성 향상** – 자동 완성과 코드 인텔리센스가 강력해요.
    3. **협업에 유리** – 명확한 타입 덕분에 팀원 간 코드 이해가 쉬워요.
    4. **점진적 적용 가능** – 기존 JS 코드에 천천히 TS를 도입할 수 있어요.
    
    ---
    
    ### 실제 활용 분야예요
    
    - **React / React Native** → 웹, iOS, Android 앱 개발
    - **Nest.js, Node.js** → 서버 개발
    - **Electron** → 데스크톱 애플리케이션 개발
- 반환값에 타입을 붙이면 그것이 **`TypeScript`** 🍠
    
    ### 반환값에 타입을 붙이면 그것이 TypeScript
    
    기본적으로 변수 이름 바로 뒤에 콜론과 함께 타입을 표기해요.
    
    ```tsx
    const 변수: 변수의 예상되는 반환값: '변수';
    ```
    
    - 문자열 (string)
        
        ### string
        
        - **문자열을 표현하는 타입**이에요.
        - 작은따옴표(`'`), 큰따옴표(`"`), 백틱(``) 모두 사용할 수 있어요.
        - 특히 **백틱(``)**은 *템플릿 리터럴*이라고 부르며, 문자열 안에서 변수나 표현식을 쉽게 넣을 수 있어요.
        
        ---
        
        ### 예시 코드예요
        
        ```tsx
        const matthew: string = '매튜'; // 작은따옴표
        
        let text: string = "Hello, TypeScript!"; // 큰따옴표
        
        let template: string = `안녕하세요, ${text}`; // 백틱 + 템플릿 리터럴
        
        ```
        
    - 숫자 (number)
        
        ### number
        
        - 정수와 소수를 포함한 모든 숫자를 표현해요.
        - 10진수, 16진수, 2진수, 8진수를 사용할 수 있어요.
        
        ```tsx
        const age: number = 26;
        
        let intNum: number = 42;
        let floatNum: number = 3.14;
        let hexNum: number = 0xff;   // 16진수
        let binNum: number = 0b1010; // 2진수
        let octNum: number = 0o52;   // 8진수
        ```
        
    - 참 / 거짓 불 값 (boolean)
        
        ### boolean
        
        - `true` 또는 `false` 값을 가질 수 있어요.
        
        ```tsx
        const isMac: boolean = true;
        const isGram: boolean = false;
        ```
        
    - null
        
        ### null
        
        - **값이 없음을 의미하는 타입**이에요.
        - `undefined`가 "아직 값이 할당되지 않음"이라면, `null`은 보통 **개발자가 명시적으로 값이 없음**을 표현할 때 사용해요.
        
        ```tsx
        const isNull: null = null;
        
        let user: string | null = null; 
        // 값이 아직 준비되지 않았음을 의도적으로 표시할 때 활용해요
        ```
        
    - undefined
        
        ### undefined
        
        - 변수가 **초기화되지 않았을 때** 자동으로 할당되는 값이에요.
        - 객체에서 **존재하지 않는 속성**을 참조할 때도 `undefined`가 돼요.
        - `null`과는 다르게, 아예 “값이 없음”이라기보다는 “값이 아직 할당되지 않음”을 의미해요.
        
        ```tsx
        const isUndefined: undefined = undefined;
        
        let notInit: undefined;  
        console.log(notInit); // undefined
        
        const obj: { key?: string } = {};
        console.log(obj.key); // undefined
        ```
        
    - null과 undefined의 차이점에 대해 직접 작성해주세요 🍠
        
        undefined는 값이 할당되지 않았다는 뜻이고 null은 의도를 가지고 값을 집어 넣지 않았다는 뜻이다.
        
    - symbol
        
        ### Symbol
        
        - **항상 고유한 값**이에요.
            - 같은 설명 문자열로 생성해도 서로 다른 값으로 취급돼요.
            - 객체 프로퍼티 키로 쓰면 충돌을 피할 수 있어요.
        - *변경 불가능(Immutable)**이에요.
            - 한 번 생성된 Symbol은 다른 값으로 바꿀 수 없어요.
        - **객체의 숨겨진 속성으로 활용 가능**해요.
            - 문자열 키와 달리, `Object.keys()`나 `for...in` 같은 반복문에 노출되지 않아요.
            - 은닉화된 프로퍼티를 만들 때 유용해요.
        
        ```tsx
        const isSymbol: symbol = Symbol('symbol');
        
        const user = {
          name: '매튜',
          [isSymbol]: '비밀 정보예요',
        };
        
        console.log(user.name);        // 매튜
        console.log(user[isSymbol]);   // 비밀 정보예요
        console.log(Object.keys(user)); // ['name']만 보여요
        ```
        
    - bigint
        
        ### bigint
        
        - **매우 큰 정수**를 다룰 때 사용하는 타입이에요.
        - 자바스크립트의 기본 `number`는 약 ±9,007,199,254,740,991(`2^53 - 1`)까지 안전하게 표현할 수 있지만, 그 이상은 `bigint`를 써야 해요.
        - 숫자 뒤에 **`n`을 붙이거나**, `BigInt()` 생성자를 사용해 만들 수 있어요.
        
        ```tsx
        let bigNumber: bigint = 900930992547140991n;
        let anotherBig: bigint = BigInt(12345678901234567890);
        
        // 비교나 연산도 가능해요
        console.log(bigNumber + 10n);  // 900930992547140, ... + 10n
        console.log(bigNumber > anotherBig); // false
        ```
        
    - object
        
        ### object
        
        - **객체를 표현하는 타입**이에요.
        - 객체는 **키-값 쌍**으로 구성되고, 각 속성에는 원하는 타입을 지정할 수 있어요.
        - 기본적으로 `object` 타입은 너무 넓기 때문에, 실제로는 **구체적인 형태(프로퍼티 타입 지정)**로 많이 사용해요.
        
        ```tsx
        const yaho: object = { yaho: 'yaho' }; 
        // 단순히 object 타입이라 내부 속성에 바로 접근은 불가능해요.
        
        let engName: { firstName: string; lastName: string } = {
          firstName: "Ahn",
          lastName: "Ohtani"
        };
        
        console.log(engName.firstName); // Ahn
        console.log(engName.lastName);  // Ohtani
        ```
        
    
    <aside>
    📌
    
    반환값으로, 설정한 타입과 할당한 변수의 타입이 맞지 않으면, 어떻게 되는지 아래에 작성해주세요!
    아래와 같이, 반환값이 문자열이라고 예상했지만, 숫자가 들어간 경우, 에러가 발생해요.
    
    각 실습들의 성공케이스와, 실패 케이스를 아래에 정리해주세요!
    
    ![스크린샷 2024-10-10 오후 3.10.44.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/076cc6d0-483c-4c12-bc9b-06cf75b80584/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.10.44.png)
    
    </aside>
    
    - 실습 정리 🍠
        - string
            
            const str: string = 123;를 진행하였는데 
            
            ‘number’ 형식은 ‘string’형식에 할당할 수 없다는 오류가 떴다.
            const str: string = e34; 는 또 이름을 찾을 수 없다는 오류가 떴다.
            
        - number
            
            const str: number = r3;는 형식을 부여할 수 없다는 오류가 아니라 
            이름을 찾을 수 없다는 오류가 떴다.
            
        - boolean
            
            const str: boolean = 0; ‘number’ 형식은 ‘string’형식에 할당할 수 없다는 오류가 떴다.
            const str: boolean = re; 이름을 찾을 수 없다는 오류가 떴다.
            
        - null
            
            const str: null = 0; ‘number’ 형식은 ‘string’형식에 할당할 수 없다는 오류가 떴다.
            const str: null = re; 이름을 찾을 수 없다는 오류가 떴다
            
        - undefined
            
            const str: undefined = 0; ‘number’ 형식은 ‘string’형식에 할당할 수 없다는 오류가 떴다.
            const str: undefined = re; 이름을 찾을 수 없다는 오류가 떴다
            
        - symbol
            
            const str: symbol = 0; ‘number’ 형식은 ‘string’형식에 할당할 수 없다는 오류가 떴다.
            const str: symbol = re; 이름을 찾을 수 없다는 오류가 떴다
            
        - bigint
            
            const str: bigint = 0; ‘number’ 형식은 ‘string’형식에 할당할 수 없다는 오류가 떴다.
            const str: bigint = re; 이름을 찾을 수 없다는 오류가 떴다
            
        - object
            
            const str: object = 0; ‘number’ 형식은 ‘string’형식에 할당할 수 없다는 오류가 떴다.
            const str: object = re; 이름을 찾을 수 없다는 오류가 떴다
            
- 함수에서의 **`TypeScript`** 🍠
    
    ### 함수의 매개변수 타입과 반환 타입
    
    - **매개변수 타입**은 매개변수 이름 뒤에 `: 타입` 형식으로 적어요.
    - **반환 타입**은 매개변수 목록 `()` 뒤에 `: 타입`을 붙여서 함수가 어떤 값을 반환할지 명시해요.
    
    ```tsx
    // 매개변수 a, b는 number 타입이고, 반환값도 number 타입이에요
    function add(a: number, b: number): number {
      return a + b;
    }
    
    // 매개변수 name은 string 타입이고, 반환값은 string 타입이에요
    function greet(name: string): string {
      return `안녕하세요, ${name}입니다`;
    }
    ```
    
    - 함수 선언식
        
        ### 함수 선언식 예시
        
        ```tsx
        function minus(x: number, y: number): number {
          return x - y;
        }
        ```
        
        - `x: number, y: number` → 매개변수 `x`, `y`는 **숫자 타입**이에요.
        - `): number` → 이 함수는 **반환값이 number 타입**임을 의미해요.
        - `return x - y;` → 실제로 두 숫자의 차이를 계산해서 `number` 값을 반환해요.
    - 화살표 함수
        
        ### 화살표 함수 (Arrow Function)
        
        ```tsx
        const getFullname = (firstName: string, lastName: string): string => {
          return firstName + lastName;
        	};
        
        const fullName = getFullname('김', '용민');
        console.log(fullName); // "김용민"
        
        ```
        
        - `(firstName: string, lastName: string)` → 매개변수 두 개를 받는데, 둘 다 **string 타입**이에요.
        - `): string => { ... }` → 이 함수의 **반환 타입은 string**이에요.
        - `return firstName + lastName;` → 두 문자열을 이어 붙여 하나의 문자열을 반환해요.
        - `const getFullname = ...` → 화살표 함수는 보통 **변수에 할당해서 함수처럼 사용**해요.
    - 함수 선언식의 특징에 대해 정리해주세요!
        1. 함수 선언식은 호이스팅의 영향을 받는다. 
        즉, 함수가 선언된 위치보다 더 위에서 호출해도 에러가 발생하지 않는다.
        2. 매개변수와 반환값의 타입을 명시한다.
    - 화살표 함수의 특징에 대해 정리해주세요!
        1. 함수 선언식보다 더 짧고 간결하게 만들 수 있다.
        2. 자신이 선언된 렉시컬 스코프의 this를 그대로 상속받는다.
        렉시컬 스코프: 함수가 선언된 위치에 따라
        그 함수가 접근할 수 있는 변수의 범위를 결정하는 방식
- 리터럴 타입
    - 타입 자리에 **`리터럴 값`**을 넣어보자!
        
        ### 리터럴 타입 (Literal Types)
        
        - **리터럴 타입**은 특정한 값 그 자체만을 허용하는 타입이에요.
        - `string`, `number`, `boolean` 같은 기본 타입이 모든 값을 포함한다면, 리터럴 타입은 **한정된 값만 가질 수 있도록 제한**해요.
        - 이를 통해 **예기치 않은 값이 들어오는 오류를 방지**할 수 있어 코드의 안정성을 높일 수 있어요.
        
        ---
        
        ## 1. 문자열 리터럴 타입
        
        ```tsx
        const name: "Matthew" = "Matthew"; // 정상
        ```
        
        - `name`은 `"Matthew"`라는 값만 가질 수 있어요.
        - 다른 문자열을 대입하면 에러가 발생해요.
        
        ```tsx
        const name: "Matthew" = "Yaho";
        // ❌ 오류: '"Yaho"' 형식은 '"Matthew"' 형식에 할당할 수 없어요.
        ```
        
        ---
        
        ## 2. 숫자 리터럴 타입
        
        ```tsx
        const age: 30 = 30; // 정상
        ```
        
        - `age`는 숫자 `30`만 가질 수 있어요.
        - 다른 숫자를 대입하면 에러가 발생해요.
        
        ```tsx
        const age: 30 = 25;
        // ❌ 오류: '25' 형식은 '30' 형식에 할당할 수 없어요.
        ```
        
        ---
        
        ## 3. 불리언 리터럴 타입
        
        ```tsx
        const isGogumaLover: true = true; // 정상
        ```
        
        - `isGogumaLover`는 무조건 `true`만 가질 수 있어요.
        
        ```tsx
        const isGogumaLover: true = false;
        // ❌ 오류: 'false' 형식은 'true' 형식에 할당할 수 없어요.
        ```
        
    - 객체 리터럴 타입
        
        ### 객체 리터럴 타입 (Object Literal Types)
        
        - **객체 리터럴 타입**은 특정 구조와 값을 가진 객체만 허용하도록 제한하는 타입이에요.
        - 프로퍼티 이름과 값의 타입을 명확하게 정의해서, 예상치 못한 값이 들어가는 걸 방지해줘요.
        
        ---
        
        ### 기본 개념
        
        TypeScript에서 객체 리터럴 타입을 정의하면:
        
        1. **정의된 프로퍼티만 포함할 수 있고**
        2. 각 프로퍼티는 **정해진 타입 값만 가질 수 있어요.**
        
        ---
        
        ### 올바른 예시
        
        ```tsx
        const person: { name: string; age: number } = {
          name: "Matthew",
          age: 27
        };
        ```
        
        - `name`은 문자열, `age`는 숫자여야 해요.
        
        ---
        
        ### 잘못된 예시
        
        ```tsx
        const person: { name: string; age: number } = {
          name: "John",
          age: "yaho"
        };
        // ❌ 오류: 'string' 형식은 'number' 형식에 할당할 수 없어요.
        ```
        
        - `age`는 숫자 타입이어야 하는데 문자열 `"yaho"`를 넣었기 때문에 에러가 발생해요.
        
        ---
        
        ### 불필요한 프로퍼티 방지
        
        ```tsx
        const person: { name: string; age: number } = {
          name: "Matthew",
          age: 30,
          job: "Engineer"
        };
        // ❌ 오류: 'job'은 타입에 정의되지 않은 프로퍼티예요.
        ```
        
        - 타입에 정의되지 않은 `job` 프로퍼티를 추가하려고 하면 에러가 발생해요.
    - **`인덱스 시그니처`**를 통한, 추가 프로퍼티 받기
        
        ### 인덱스 시그니처 (Index Signature)
        
        - 기본적으로 **객체 리터럴 타입**은 정의된 프로퍼티 외에 다른 프로퍼티를 허용하지 않아요.
        - 하지만 때로는 객체에 **추가적인 프로퍼티**를 유연하게 넣고 싶을 때가 있어요.
        - 이럴 때 `인덱스 시그니처`를 사용하면, **임의의 키-값 쌍**을 허용할 수 있어요.
        
        ---
        
        ### 기본 예시
        
        ```tsx
        const person: { name: string; age: number; [key: string]: any } = {
          name: "Matthew",
          age: 27,
          job: "Software Developer"
        };
        ```
        
        - `[key: string]: any` → **임의의 문자열 키**를 허용하고, 그 값은 **어떤 타입(any)**이든 가질 수 있어요.
        - 그래서 `job` 같은 추가 프로퍼티도 오류 없이 쓸 수 있어요.
        
        ---
        
        ### 조금 더 타입 안전하게 쓰기
        
        `any` 대신 **구체적인 타입**을 지정할 수도 있어요.
        
        ```tsx
        const scores: { [subject: string]: number } = {
          math: 95,
          english: 88,
          science: 92
        };
        
        console.log(scores.math);    // 95
        console.log(scores["music"]); // ❌ music을 정의하지 않았지만 타입상 number 기대
        ```
        
        - 이렇게 하면 모든 키 값은 반드시 `number` 타입을 가져야 해요.
    - 선택적 프로퍼티 (Optional Property **`?.`**)
        
        ### 선택적 프로퍼티 (Optional Property)
        
        - TypeScript에서는 객체 리터럴 타입의 프로퍼티 중 일부를 **선택적(optional)**으로 만들 수 있어요.
        - 선택적 프로퍼티는 있어도 되고 없어도 되는 값이에요.
        - 프로퍼티 이름 뒤에 `?`를 붙여서 정의해요.
        
        ---
        
        ### 예시: 선택적 프로퍼티
        
        ```tsx
        const person: { name: string; age?: number } = {
          name: "Matthew"
        };
        ```
        
        - `age`는 선택적 프로퍼티이기 때문에 없어도 에러가 나지 않아요.
        - 만약 `age`를 포함한다면, 그 값은 반드시 **number 타입**이어야 해요.
        
        ```tsx
        const personWithAge: { name: string; age?: number } = {
          name: "Matthew",
          age: 27
        };
        ```
        
    - 자바스크립트 객체는 **`const`**로 선언되도, 수정이 가능하다. (**`as const`**)
        
        ## 자바스크립트의 객체는 const 변수여도 수정이 가능하다.
        
        - 자바스크립트에서 객체는 `const`로 선언해도 내부 속성은 수정이 가능해요.
        - 그래서 타입스크립트는 객체를 `const`로 선언해도 **프로퍼티 타입을 넓게(string, number 등)** 추론해요.
        - 만약 **값을 변경 불가능하게 만들고**, **리터럴 값 그대로 타입으로 고정**하고 싶다면 `as const`를 사용하면 돼요.
        
        ---
        
        **예시: 기본 const 선언**
        
        ```tsx
        const matthew = { name: 'matthew' };
        ```
        
        - 여기서 `name`은 `'matthew'`가 아니라 `string`으로 넓게 추론돼요.
        - 즉, `"hi"` 같은 다른 문자열도 들어갈 수 있어요.
        
        ![스크린샷 2024-10-10 오후 3.27.36.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/cabae0b2-f75b-4d4f-b909-ef070e7e7383/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.27.36.png)
        
        **`matthew`** 이외에, **`다른 값을 들어가고 싶지 않게하고 싶고`**, **`수정 가능성이 없는 것이 확실`**하다면 **`as const`** 라는 특별한 접미사를 붙이면 되요.
        
        ---
        
        **예시: `as const` 사용**
        
        ```tsx
        const matthew = { name: 'matthew' } as const;
        
        // 타입 추론 결과: { readonly name: "matthew" }
        matthew.name = 'hi'; 
        // ❌ 오류: 읽기 전용 속성이므로 할당할 수 없어요.
        ```
        
        ![스크린샷 2024-10-10 오후 3.29.23.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/9e5d0a24-c69b-49c7-be06-f09b8ea3cf2a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.29.23.png)
        
        - `as const`를 붙이면 `name`의 타입이 `"matthew"`로 고정돼요.
        - 동시에 `readonly`가 적용돼서 수정도 불가능해져요.
        
    - 객체 리터럴 타입과 읽기 전용 프로퍼티
        
        ## 객체 리터럴 타입과 읽기 전용(Readonly) 프로퍼티
        
        - 객체 리터럴 타입에서 특정 프로퍼티를 **수정 불가능**하게 만들고 싶다면 `readonly` 키워드를 사용해요.
        - 이렇게 하면 객체가 생성된 이후에는 해당 프로퍼티 값을 바꿀 수 없어요.
        
        ---
        
        **예시: 읽기 전용 프로퍼티**
        
        ```tsx
        const person: { readonly name: string; age: number } = {
          name: "Matthew",
          age: 30
        };
        
        person.age = 31;    // ✅ 가능 (age는 readonly가 아님)
        person.name = "John";  
        // ❌ 오류: 'name'은 읽기 전용이므로 값을 변경할 수 없어요.
        ```
        
        위 코드에서 `name`은 `readonly`로 선언되었기 때문에, 객체가 생성된 후에 값을 변경하려고 하면 오류가 발생해요.
        
- 배열 타입, 튜플 타입
    - 배열
        
        ## 배열 타입
        
        TypeScript에서 배열은 두 가지 방식으로 정의할 수 있어요.
        
        ```tsx
        // 방법 1: string[]
        const stringArray: string[] = ['야호', '고구마', '맥북'];
        
        // 방법 2: 제네릭 Array<string>
        const stringArray2: Array<string> = ['야호', '고구마', '맥북'];
        ```
        
        - `string[]` → 배열 요소가 문자열임을 간단히 표시하는 방법이에요.
        - `Array<string>` → 제네릭 문법을 활용해서 타입을 지정하는 방법이에요.
        
        두 방식은 완전히 동일하게 동작해요.
        
        ---
        
        ### 타입 체크 예시
        
        ```tsx
        stringArray.push(14);
        // ❌ 오류: Argument of type 'number' is not assignable to parameter of type 'string'.
        ```
        
        ![스크린샷 2024-10-10 오후 3.36.17.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/da242222-1f3a-4066-a322-c59a5c6bfd77/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.36.17.png)
        
        - `string[]`로 선언했기 때문에, 배열에는 **문자열만 들어갈 수 있어요.**
        - 숫자 `14`를 넣으려 하면 타입 불일치 에러가 발생해요.
        
    - 배열 타입의 문제점 (추론의 한계)
        
        ### 배열의 문제점
        
        ```tsx
        const array = [1, 2, 3];
        
        array[3].toFixed(2); // ❓ (존재하지 않는 요소)
        ```
        
        ![스크린샷 2024-10-10 오후 3.38.55.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/ad7e00da-b8cf-4bf9-9d32-8994f4bd2cc0/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.38.55.png)
        
        - `toFixed`는 숫자를 소수점 이하 자리까지 포맷팅하는 메서드예요.
        - 그런데 현재 `array[3]`에는 값이 없기 때문에, 실행 시 에러가 발생해요.
        
        ---
        
        ### 왜 이런 문제가 생길까?
        
        TypeScript는 `array`를 `number[]` (숫자 배열)로 추론해요.
        
        그래서 `array[3]`도 자동으로 `number` 타입으로 판단돼요.
        
        ```tsx
        const array = [1, 2, 3]; 
        // 추론: number[]
        // 따라서 array[3]은 number 타입으로 취급
        ```
        
        실제로는 값이 없는데도, 타입 검증에서 에러를 잡아주지 못하는 거예요.
        
        ![스크린샷 2024-10-10 오후 3.40.32.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/a2e942c5-f3c9-4b19-8040-e4c60cd6544e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.40.32.png)
        
        이러한 문제를 **`튜플`**로 해결할 수 있습니다.
        
    - 튜플
        
        ### Tuple (튜플)
        
        - **튜플**은 배열과 비슷하지만, **각 요소의 타입과 순서가 고정**되어 있어요.
        - 배열은 `number[]`, `string[]`처럼 요소 전체가 같은 타입을 가질 때 주로 사용하지만, 튜플은 서로 다른 타입을 섞어서 정의할 수 있어요.
        
        ---
        
        ### 기본 예시
        
        ```tsx
        const tuple: [string, boolean, number] = ['매튜', true, 26];
        ```
        
        - 첫 번째 요소 → 문자열(string)
        - 두 번째 요소 → 불리언(boolean)
        - 세 번째 요소 → 숫자(number)
        
        ---
        
        ### 올바른 값과 잘못된 값
        
        ```tsx
        const tuple: [string, boolean, number] = ['매튜', true, 26];
        
        // ✅ 문자열은 첫 번째 자리에 올 수 있어요
        tuple[0] = '고구마';
        
        // ❌ 불리언은 첫 번째 자리에 올 수 없어요
        tuple[0] = false;
        
        // ❌ 3번 인덱스는 정의되지 않았기 때문에 어떤 값도 넣을 수 없어요
        tuple[3] = true;
        ```
        
        👉 튜플은 요소의 **위치마다 타입이 엄격히 고정**돼 있어요.
        
        ---
        
        ### 배열에서 발생했던 문제 해결
        
        튜플을 사용하면, 존재하지 않는 인덱스 접근도 컴파일 단계에서 막을 수 있어요.
        
        ```tsx
        const array: [number, number, number] = [1, 2, 3];
        
        array[3].toFixed(2);
        // ❌ 오류: 길이가 3으로 고정되어 있어서 인덱스 3은 존재하지 않아요
        ```
        
        ![스크린샷 2024-10-10 오후 3.47.38.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/4a464062-fe91-4712-bbd8-e5c8045e04cb/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.47.38.png)
        
    - 튜플 타입의 문제점
        
        ## 튜플 타입의 문제점
        
        튜플은 배열처럼 보이지만 **길이와 각 요소 타입이 고정**된 특별한 타입이에요.
        
        하지만 한 가지 주의할 점은, `push`, `pop`, `unshift`, `shift` 같은 **배열 메서드**는 기본적으로 막지 않는다는 거예요.
        
        ---
        
        ### 문제 예시
        
        ```tsx
        const array: [number, string, boolean] = [1, '야호', false];
        
        array.push(4);       // ✅ 가능 (하지만 튜플 정의에는 없는 값)
        array.push(false);   // ✅ 가능
        array.push('매튜');  // ✅ 가능
        array.pop();         // ✅ 가능
        array.unshift();     // ✅ 가능
        array.shift();       // ✅ 가능
        ```
        
        ![스크린샷 2024-10-10 오후 3.54.09.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/31782fbe-5b33-4f59-a734-566969a74735/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.54.09.png)
        
        👉 보시다시피, TypeScript는 `array`를 튜플로 인식하면서도 배열 메서드 사용은 허용해요.
        
        즉, **런타임에서는 튜플이 깨질 수 있는 문제**가 발생할 수 있어요.
        
        ---
        
        ## 해결 방법: `readonly`
        
        이 문제를 해결하려면, **튜플을 읽기 전용으로 만들면 돼요.**
        
        즉, `readonly` 키워드를 붙여주면, 배열을 변경하는 메서드를 사용할 수 없게 돼요.
        
        ---
        
        ### 수정된 예시
        
        ```tsx
        const array: readonly [number, string, boolean] = [1, '야호', false];
        
        // ❌ 에러 발생
        array.push(4);
        array.push(false);
        array.push('매튜');
        array.pop();
        array.unshift();
        array.shift();
        ```
        
        ![스크린샷 2024-10-10 오후 3.54.28.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/961b1bc2-6122-4f03-8a6d-83fe7094c8c1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.54.28.png)
        
- 유니언 타입 **(|)**
    
    # 유니언 타입 (Union Types)
    
    **TypeScript의 유니언 타입**은 **둘 이상의 타입을 허용**해서, 변수가 여러 타입 중 하나를 가질 수 있게 해줘요.
    
    이런 특성 덕분에 다양한 상황에서 유연하게 사용할 수 있어요.
    
    ---
    
    ## 1. 유니언 타입의 기본 개념
    
    유니언 타입은 **파이프(`|`) 기호**를 사용해서 두 개 이상의 타입을 결합해요.
    
    이렇게 하면 변수나 함수의 인자, 반환 값이 여러 타입 중 하나를 가질 수 있어요.
    
    ```tsx
    let value: string | number;
    
    value = "Hello";  // 정상이에요
    value = 123;      // 정상이에요
    value = true;     // ❌ 오류: boolean은 허용되지 않아요
    ```
    
    ---
    
    ## 2. 유니언 타입의 활용
    
    유니언 타입은 **함수 인자나 반환 타입**에 많이 활용돼요.
    
    ```tsx
    function printValue(value: string | number) {
      console.log(value);
    }
    
    printValue("Hello"); // 출력: Hello
    printValue(123);     // 출력: 123
    ```
    
    위 예시에서 `printValue`는 문자열과 숫자를 모두 받을 수 있어요.
    
    ---
    
    ## 3. 유니언 타입과 조건부 로직 (타입 좁히기)
    
    유니언 타입을 사용할 때는 **조건문으로 타입을 좁혀서 처리**할 수 있어요.
    
    ### 타입 좁히기(Type Narrowing)
    
    <aside>
    📌
    
    **`typeof ‘Matthew’;`
    typeof를 통해, 뒤에 붙은, 내용이 어떠한 타입인지 알 수 있어요.**
    
    ![스크린샷 2024-10-10 오후 4.01.34.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/30b7043d-45de-4c0f-a8d1-61dcffa96364/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.01.34.png)
    
    </aside>
    
    `typeof`나 `instanceof`를 활용해서 변수의 실제 타입을 검사할 수 있어요.
    
    ```tsx
    function process(value: string | number) {
      if (typeof value === "string") {
        console.log(`문자열 처리: ${value.toUpperCase()}`);
      } else {
        console.log(`숫자 처리: ${value.toFixed(2)}`);
      }
    }
    
    process("Hello"); // 문자열 처리: HELLO
    process(123);     // 숫자 처리: 123.00
    ```
    
    ---
    
    ## 4. 유니언 타입과 배열
    
    배열에도 유니언 타입을 적용할 수 있어요.
    
    ```tsx
    let mixedArray: (string | number)[] = ["Hello", 123, "World", 456];
    ```
    
    이 배열은 문자열과 숫자를 동시에 담을 수 있어요.
    
    ---
    
    ## 5. 유니언 타입과 리터럴 타입의 결합
    
    유니언 타입은 **리터럴 타입**과 결합하면 특정 값만 허용하는 타입을 만들 수 있어요.
    
    ```tsx
    function move(direction: "left" | "right" | "up" | "down") {
      console.log(`You moved: ${direction}`);
    }
    
    move("left");    // 정상이에요
    move("right");   // 정상이에요
    move("forward"); // ❌ 오류: forward는 허용되지 않아요
    ```
    
- 타입 스크립트에만 존재하는 타입 🍠
    - any 🍠
        
        어떤 종류의 값이라도 할당가능
        
    - unknown 🍠
        
        any처럼 작동 세부사항 필요 더 안전
        
    - void 🍠
        
        어떤 값을 가지지 않는 것을 의미
        
    - never 🍠
        
        아무 값이 없음을 의미
        
- Type Aliases (타입 별칭)
    
    # Type Aliases (타입 별칭)
    
    ### 타입 별칭이란?
    
    타입 별칭은 **특정 타입이나 인터페이스를 참조할 수 있는 타입 변수**예요.
    
    즉, 긴 타입이나 복잡한 타입을 간단한 이름으로 정리해서 재사용할 수 있어요.
    
    ---
    
    ### 기본 예시
    
    ```tsx
    // 타입 별칭 사용
    type Matthew = 'Matthew';
    const yongminEnglishName: Matthew = 'Matthew';
    ```
    
    이렇게 하면 `'Matthew'`라는 리터럴 타입을 `Matthew`라는 별칭으로 정의해서 재사용할 수 있어요.
    
    ---
    
    ### 유니언 타입과 함께 사용
    
    유니언 타입이 길거나 복잡할 때, 별칭을 활용하면 훨씬 깔끔해져요.
    
    ```tsx
    type UmcPartType = 'WEB' | 'SPRING' | 'NODE' | 'PLAN' | 'DESIGN' | 'ANDROID' | 'IOS';
    ```
    
    `UmcPartType`으로 정의하면, 특정 문자열 값들만 허용하도록 제한할 수 있어요.
    
    ---
    
    ### 여러 타입을 묶어서 사용
    
    ```tsx
    type Name = string;
    type Nickname = string;
    
    type Member = Name | Nickname;
    ```
    
    이렇게 하면 `Member` 타입이 `string` 두 가지 별칭을 유니언으로 가질 수 있어요.
    
    ---
    
    ### 객체 타입에 사용
    
    객체 타입을 정의할 때도 유용하게 쓸 수 있어요.
    
    ```tsx
    type UMC = {
      nickname: string;
      part: string;
    }
    
    let member: UMC = { nickname: 'Matthew', part: 'WEB' };
    ```
    
    ---
    
    ### & 연산자와 함께 사용
    
    객체 타입을 합칠 때는 `&` 연산자를 활용해요.
    
    ```tsx
    type TNickname = { nickname: string }
    type TName = { name: string }
    
    type TMember = TNickname & TName;
    
    let me: TMember = {
      name: '김용민',
      nickname: '매튜'
    };
    ```
    
- **Interface** 객체 타이핑
    - 인터페이스 병합
        
        # 인터페이스 병합
        
        ### Merging Interfaces
        
        TypeScript에서는 **같은 이름을 가진 여러 인터페이스가 선언되면 자동으로 병합**돼요.
        
        이 기능은 인터페이스를 확장하는 데 유용하고, 모듈 간 충돌을 방지하면서 유연하게 관리할 수 있어요.
        
        ```tsx
        interface UMC {
          name: string;
          nickname: string;
        }
        
        interface UMC {
          skill: string;
        }
        
        let member: UMC = { name: '김용민', nickname: '매튜', skill: 'WEB' };
        ```
        
        ---
        
        ### 특징
        
        1. **자동 병합**: 같은 이름을 가진 인터페이스는 자동으로 합쳐져요.
        2. **확장성**: 여러 곳에서 나눠 정의하고, 필요할 때 속성을 추가할 수 있어요.
        3. **타입 안전성 유지**: 병합된 결과도 타입 검사를 통해 안전하게 사용할 수 있어요.
        
        ---
        
        ### 주의사항
        
        - 같은 속성을 서로 다른 타입으로 정의하면 오류가 발생해요.
        
        ```tsx
        interface UMC {
          name: string;
        }
        
        interface UMC {
          name: number; // ❌ 오류: 'name' 속성의 타입이 다르기 때문에 충돌해요
        }
        ```
        
    - 네임 스페이스
        
        ### 네임스페이스란?
        
        네임스페이스는 코드를 **모듈화하고 그룹화해서 관리**할 수 있는 방법이에요.
        
        여러 변수와 함수를 하나로 묶어서 **이름 충돌을 방지**하는 데 유용해요.
        
        특히 전역 스코프가 쉽게 오염될 수 있는 대규모 프로젝트에서 많이 사용돼요.
        
        ---
        
        ### 기본 예시
        
        ```tsx
        namespace A {
          const a = 1;
          export let b = a + 10;
        }
        
        namespace A {
          export const c = 2;
          b = 20;
        }
        
        console.log(A.c); // 2
        ```
        
        위 예시처럼 `A`라는 네임스페이스를 두 번 선언해도, **TypeScript에서 자동으로 병합**돼요.
        
        따라서 `A` 네임스페이스 안에는 `b`와 `c`가 함께 포함돼요.
        
        ---
        
        ### 특징
        
        1. **코드 조직화**: 관련 있는 기능을 하나로 묶어서 관리할 수 있어요.
        2. **자동 병합**: 같은 이름의 네임스페이스는 자동으로 병합돼요.
        3. **전역 오염 방지**: 전역 스코프에 변수가 흩어지는 걸 막아줘요.
        
        ---
        
        ### 주의사항: 의도치 않은 병합
        
        네임스페이스도 **의도치 않은 병합**이 일어날 수 있어요.
        
        예를 들어, 두 명의 개발자가 각각 `A` 네임스페이스를 선언하고 같은 속성을 만들면, 자동으로 합쳐지면서 **예상치 못한 충돌**이 발생할 수 있어요.
        
        이를 방지하려면:
        
        - 네임스페이스 이름을 신중하게 짓거나,
        - 모듈 시스템(`import/export`)을 사용하는 게 더 안전해요.
- **Generic**
    
    # Generic (제네릭)
    
    ### 제네릭이란?
    
    제네릭은 **다양한 타입을 재사용하기 위해** 사용하는 문법이에요.
    
    TypeScript는 정적 타입 언어인데, 제네릭을 활용하면 **구체적인 타입을 미리 정하지 않고**, 나중에 사용하는 시점에 외부에서 타입을 지정할 수 있어요.
    
    덕분에 유연성과 타입 안정성을 동시에 얻을 수 있어요.
    
    ---
    
    ### 기본 사용법
    
    ```tsx
    function identity<T>(arg: T): T {
      return arg;
    }
    
    // 사용 시점에 타입 지정
    let result = identity<number>(42); // T = number
    ```
    
    ---
    
    ### 제네릭 문법 해석
    
    1. **`<T>` (제네릭 타입 선언)**
        - `<T>`는 **타입 변수를 선언**하는 부분이에요.
        - 아직 구체적인 타입이 정해지지 않았고, **호출 시점에 지정**돼요.
    2. **`arg: T` (매개변수 타입)**
        - 함수 매개변수 `arg`는 `T` 타입이에요.
        - 호출할 때 `T` 자리에 들어오는 타입이 그대로 적용돼요.
    3. **`: T` (반환 타입)**
        - 함수의 반환 타입도 `T`예요.
        - 따라서 매개변수와 반환 타입이 항상 동일한 타입으로 보장돼요.
    
    ---
    
    ### 제네릭의 장점
    
    - 하나의 함수로 여러 타입을 처리할 수 있어요.
    - 코드 재사용성이 높아져 유지보수가 편리해져요.
    - 타입 안전성을 유지하면서도 유연하게 사용할 수 있어요.
- **Enum**
    
    # Enum (열거형)
    
    ### Enum이란?
    
    `Enum`은 **이름이 있는 상수 집합**을 정의하는 방법이에요.
    
    여러 값을 하나의 그룹으로 묶어서 **가독성**을 높이고, **의미 있는 이름**을 제공해줘요.
    
    JavaScript에는 없고 TypeScript에만 있는 고유 기능이에요.
    
    ---
    
    ### Enum의 종류
    
    TypeScript에서는 크게 두 가지 `enum`을 지원해요:
    
    1. 숫자형 Enum (Numeric Enum)
    2. 문자열 Enum (String Enum)
    
    ---
    
    ### 1. 숫자형 Enum (Numeric Enum)
    
    기본적으로 Enum 값은 **숫자**예요.
    
    첫 번째 값은 **0부터 시작**하고, 이후 값들은 자동으로 1씩 증가해요.
    
    ```tsx
    enum Direction {
      Up,    // 0
      Down,  // 1
      Left,  // 2
      Right  // 3
    }
    
    let dir: Direction = Direction.Up;
    console.log(dir); // 0
    
    ```
    
    - `Direction.Up`은 0, `Direction.Down`은 1이에요.
    - 시작 값을 직접 지정할 수도 있어요.
    
    ```tsx
    enum Status {
      Success = 1,  // 1
      Failure,      // 2
      Pending       // 3
    }
    ```
    
    ---
    
    ### 2. 문자열 Enum (String Enum)
    
    문자열을 값으로 지정할 수도 있어요. 이 경우는 자동 증가하지 않고, 반드시 **직접 문자열을 지정**해야 해요.
    
    ```tsx
    enum Color {
      Red = "RED",
      Green = "GREEN",
      Blue = "BLUE"
    }
    
    let myColor: Color = Color.Green;
    console.log(myColor); // "GREEN"
    ```
    
    ---
    
    ### Enum의 특징
    
    1. **양방향 매핑 (숫자형 Enum만 가능해요)**
        
        값으로 키를 찾을 수도 있어요.
        
        ```tsx
        enum Role {
          Admin = 1,
          User,
          Guest
        }
        
        console.log(Role[1]);      // "Admin"
        console.log(Role.Admin);   // 1
        ```
        
    2. **상수 Enum (`const enum`)**
        
        컴파일된 JS 코드에서 실제 값으로 치환돼서 성능이 좋아져요.
        
        ```tsx
        const enum Size {
          Small = 1,
          Medium,
          Large
        }
        
        let tshirtSize = Size.Medium;
        ```
        
    
    ---
    
    ### Enum의 장점
    
    - **가독성**: 숫자/문자 대신 의미 있는 이름을 쓸 수 있어요.
    - **유지보수성**: 관련 값들을 한 곳에서 관리할 수 있어요.
    - **타입 안정성**: 잘못된 값을 쓰면 컴파일 단계에서 잡아줘요.
- **Utility Type**
    - Pick
        
        # Pick
        
        ## Pick<T, K> - 특정 프로퍼티만 선택해요
        
        `Pick<T, K>`는 기존 타입 `T`에서 **원하는 속성(`K`)만 골라서 새로운 타입**을 만드는 도구에요.
        
        즉, “큰 타입 중 필요한 부분만 뽑아서 쓰고 싶다” 할 때 유용해요.
        
        ---
        
        ### 예시 1: 사용자(User) 타입
        
        ```tsx
        interface User {
          id: number;
          name: string;
          age: number;
          email: string;
        }
        
        // User에서 id와 name만 뽑아오기
        type UserPreview = Pick<User, "id" | "name">;
        
        const user: UserPreview = { id: 1, name: "김용민" };
        ```
        
        👉 `User` 타입에는 `id`, `name`, `age`, `email` 네 가지가 있지만,
        
        `UserPreview`는 **id와 name만 가지는 타입**이에요.
        
        ---
        
        ### 예시 2: 책(Book) 타입
        
        ```tsx
        interface Book {
          title: string;
          author: string;
          publishedYear: number;
          price: number;
        }
        
        // 책 목록 화면에서는 제목과 저자만 필요
        type BookPreview = Pick<Book, "title" | "author">;
        
        const book: BookPreview = { title: "고구마 요리 비법", author: "매튜" };
        ```
        
        👉 책 전체 정보는 많지만, **리스트 화면**에서는 `title`과 `author`만 있으면 충분해요.
        
        ---
        
        ### 언제 사용하나요?
        
        - **API 응답**에서 필요한 필드만 뽑아올 때
        - **UI 화면에 보여줄 데이터**만 선택할 때
        - DTO(Data Transfer Object)를 만들 때
        
        ---
        
        정리하면, `Pick`은 **큰 타입 중 꼭 필요한 부분만 뽑아서 새로운 타입을 만들 때 쓰는 도구에요.**
        
    - Omit
        
        # Omit
        
        ## Omit<T, K> - 특정 프로퍼티 제외
        
        `Omit<T, K>`는 기존 타입 `T`에서 **특정 속성(`K`)을 빼고** 새로운 타입을 만드는 도구에요.
        
        즉, 필요 없는 속성을 제거한 버전의 타입을 만들 때 사용해요.
        
        ---
        
        ### 예시 1: 사용자(User) 타입
        
        ```tsx
        interface User {
          id: number;
          name: string;
          age: number;
          email: string;
        }
        
        // email을 제외
        type UserWithoutEmail = Omit<User, "email">;
        
        const user: UserWithoutEmail = { id: 1, name: "김용민", age: 27 }
        ```
        
        👉 `email` 속성이 빠졌기 때문에 `id`, `name`, `age`만 남았어요.
        
        ---
        
        ### 예시 2: 책(Book) 타입
        
        ```tsx
        interface Book {
          title: string;
          author: string;
          publishedYear: number;
          price: number;
        }
        
        // price를 제외
        type BookInfo = Omit<Book, "price">;
        
        const book: BookInfo = {
          title: "고구마의 역사",
          author: "매튜",
          publishedYear: 2024
        };
        ```
        
        👉 책 리스트 화면에는 가격이 필요 없으니까, `Omit`으로 `price`를 빼고 타입을 만들었어요.
        
        ---
        
        ### 예시 3: 게시글(Post) 타입
        
        ```tsx
        interface Post {
          id: number;
          title: string;
          content: string;
          createdAt: Date;
        }
        
        // content를 제외
        type PostPreview = Omit<Post, "content">;
        
        const post: PostPreview = {
          id: 101,
          title: "김용민의 고구마 일기",
          createdAt: new Date()
        };
        ```
        
        👉 요약 화면에서는 긴 본문(`content`)이 필요 없으니까, `Omit`으로 빼고 타입을 정의했어요.
        
        ---
        
        ### 언제 사용하나요?
        
        - 특정 속성을 **제외한 API 응답 타입**을 만들 때
        - 리스트/미리보기 화면처럼 **일부 정보만 보여줄 때**
        - `email`, `password` 같은 **민감한 정보 제거할 때**
        
        ---
        
        정리하면, `Omit`은 **큰 타입에서 필요 없는 속성을 제외해서 깔끔한 타입을 만들 때** 사용해요.
        
    - Record
        
        # Record
        
        ## Record<K, T> - 객체의 키-값 타입 정의
        
        `Record<K, T>`는 객체의 **키(`K`)와 값(`T`)의 타입을 강제**할 수 있는 도구에요.
        
        즉, "이 키들은 반드시 있어야 하고, 값은 전부 같은 타입이야"라고 지정하는 방식이에요.
        
        ---
        
        ### 예시 1: 역할(Role) 타입
        
        ```tsx
        type Role = "yongmin" | "matthew" | "goguma";
        
        const roles: Record<Role, string> = {
          yongmin: "김용민",
          matthew: "매튜",
          goguma: "고구마"
        };
        ```
        
        👉 `Role`에 정의된 `"yongmin"`, `"matthew"`, `"goguma"` 세 가지 키를 모두 포함해야 하고, 값은 전부 `string`이어야 해요.
        
        ---
        
        ### 예시 2: 점수(Score) 타입
        
        ```tsx
        type Member = "yongmin" | "matthew" | "goguma";
        
        const scores: Record<Member, number> = {
          yongmin: 100,
          matthew: 95,
          goguma: 88
        };
        ```
        
        👉 모든 멤버에게 점수를 부여해야 하고, 값은 `number`만 허용돼요.
        
        ---
        
        ### 예시 3: 과일(Frut) 재고 관리
        
        ```tsx
        type Fruit = "apple" | "banana" | "goguma";
        
        const stock: Record<Fruit, number> = {
          apple: 50,
          banana: 30,
          goguma: 77
        };
        ```
        
        👉 재고 관리에서 `Fruit` 타입에 정의된 과일 키는 모두 들어가야 하고, 값은 `number`여야 해요.
        
        ---
        
        ### 언제 사용하나요?
        
        - **정해진 키 집합**을 강제하고 싶을 때
        - 특정 키를 모두 채워야 하는 **객체 매핑**이 필요할 때
        - 예: **권한 관리**, **점수표**, **설정 값 매핑** 등
        
        ---
        
        정리하면, `Record`는 "특정 키 집합을 강제로 모두 포함시키고, 값 타입을 통일시키는 객체 타입"을 만들 때 유용해요.
        
    - Partial
        
        # Partial
        
        ## Partial<T> - 모든 프로퍼티를 선택적으로 변경
        
        `Partial<T>`는 기존 타입 `T`의 모든 속성을 선택적(`?`)으로 바꿔주는 도구에요.
        
        즉, 원래는 반드시 필요한 속성이더라도 `Partial`을 쓰면 있어도 되고 없어도 돼요.
        
        ---
        
        ### 예시 1: User 타입
        
        ```tsx
        interface User {
          id: number;
          name: string;
          age: number;
        }
        
        const updateUser = (user: Partial<User>) => {
          console.log(user);
        };
        
        // 모든 속성이 선택적이기 때문에 일부만 넘겨도 돼요
        updateUser({ name: "김용민" });
        updateUser({ age: 27 });
        updateUser({}); // 아무것도 없어도 가능
        ```
        
        👉 원래 `id`, `name`, `age` 모두 필요했지만, `Partial`을 쓰면 일부만 전달해도 돼요.
        
        ---
        
        ### 예시 2: Book 타입
        
        ```tsx
        interface Book {
          title: string;
          author: string;
          publishedYear: number;
        }
        
        const updateBook = (book: Partial<Book>) => {
          console.log(book);
        };
        
        updateBook({ title: "고구마의 모든 것" });
        updateBook({ author: "매튜" });
        ```
        
        👉 책 정보를 수정할 때, **일부 정보만 바꿀 수 있도록** 할 때 유용해요.
        
        ---
        
        ### 예시 3: Post 타입 (PATCH 요청 상황)
        
        ```tsx
        interface Post {
          title: string;
          content: string;
        }
        
        const patchPost = (post: Partial<Post>) => {
          console.log(post);
        };
        
        // 일부만 업데이트 가능
        patchPost({ title: "고구마는 맛있다" });
        patchPost({ content: "매튜가 작성한 글이에요" });
        ```
        
        👉 새 글 작성(POST)일 때는 `title`, `content` 둘 다 필요하지만, 수정(PATCH)일 때는 일부만 바꾸고 싶을 수 있어요. 이때 `Partial`을 쓰면 돼요.
        
        ---
        
        ### 언제 사용하나요?
        
        - **일부 데이터만 수정할 때** (예: PATCH 요청)
        - 기본 객체를 만들고 **일부 값만 덮어쓸 때**
        - 모든 속성을 선택적으로 바꾸고 싶을 때
        
        ---
        
        정리하면, `Partial`은 **원래 필수 속성도 모두 선택적으로 바꿔주는 도구에**요.
        
    - Required
        
        # Required
        
        ## Required<T> - 모든 프로퍼티를 필수로 변경해요
        
        `Required<T>`는 원래 선택적(`?`)인 속성까지도 전부 **필수(required)**로 바꿔주는 타입이에요.
        
        즉, 원래는 있어도 되고 없어도 되는 속성이더라도 반드시 값을 넣어야 해요.
        
        ---
        
        ### 예시 1: User 타입
        
        ```tsx
        interface User {
          id?: number;
          name?: string;
          age?: number;
        }
        
        const createUser = (user: Required<User>) => {
          console.log(user);
        };
        
        // 모든 속성을 다 넣어야 해요
        createUser({ id: 1, name: "김용민", age: 27 });
        createUser({ name: "매튜" }); // 🚨 오류! id, age도 필요해요
        ```
        
        👉 `id`, `name`, `age`가 모두 있어야만 통과돼요.
        
        ---
        
        ### 예시 2: Book 타입
        
        ```tsx
        interface Book {
          title?: string;
          author?: string;
          year?: number;
        }
        
        const addBook = (book: Required<Book>) => {
          console.log(book);
        };
        
        // 모든 속성을 다 제공해야 해요
        addBook({ title: "고구마 탐험기", author: "매튜", year: 2024 });
        ```
        
        👉 원래는 선택적인 속성이었지만, `Required`를 적용하면 하나도 빠뜨릴 수 없어요.
        
        ---
        
        ### 언제 사용하나요?
        
        - 원래는 선택적인 속성을 **반드시 채워야 하는 상황**일 때
        - 객체를 생성하거나 저장하기 전에 **모든 값이 있는지 보장**하고 싶을 때
        
        ---
        
        정리하면, `Required`는 선택적 속성을 전부 필수로 바꿔서 **빈 값 없이 확실히 채우고 싶을 때 쓰는 타입이에요.**
        
    - Readonly
        
        # Readonly
        
        ## Readonly<T> - 모든 프로퍼티를 읽기 전용으로 변경해요
        
        `Readonly<T>`는 타입의 모든 속성을 읽기 전용(`readonly`)으로 바꿔주는 도구에요.
        
        즉, 한 번 값을 설정하면 나중에 수정할 수 없어요.
        
        ---
        
        ### 예시 1: User 타입
        
        ```tsx
        interface User {
          id: number;
          name: string;
        }
        
        const member: Readonly<User> = { id: 1, name: "김용민" };
        
        // ❌ 읽기 전용이라 수정할 수 없어요
        member.name = "매튜"; // 오류 발생
        ```
        
        👉 `Readonly<User>`를 적용했기 때문에 `name`을 바꿀 수 없어요.
        
        ---
        
        ### 예시 2: Book 타입
        
        ```tsx
        interface Book {
          title: string;
          author: string;
        }
        
        const book: Readonly<Book> = {
          title: "고구마 요리 비법",
          author: "매튜"
        };
        
        // ❌ title은 읽기 전용이라 변경 불가능해요
        book.title = "김용민의 고구마 요리"; // 오류 발생
        ```
        
        👉 책 정보가 한 번 정해지면 바뀌면 안 된다는 상황에 적합해요.
        
        ---
        
        ### 언제 사용하나요?
        
        - 객체를 한 번 생성하면 **수정 불가능**해야 할 때
        - 중요한 설정 값(config)이나 상수를 안전하게 보호하고 싶을 때
        
        ---
        
        정리하면, `Readonly`는 **객체 속성을 잠궈서 변경할 수 없도록 만드는 타입이에요.**
        
    - Exclude
        
        # Exclude
        
        ## Exclude<T, U> - 타입에서 특정 타입을 제거해요
        
        `Exclude<T, U>`는 타입 `T`에서 타입 `U`를 **빼고 남은 타입만** 가져와요.
        
        즉, "이건 빼고 나머지 다!"라는 느낌이에요.
        
        ---
        
        ### 예시 1: 상태 값에서 제거
        
        ```tsx
        type Status = "success" | "error" | "pending";
        
        // "pending"을 제외하고 나머지 타입만 남겨요
        type ExcludedStatus = Exclude<Status, "pending">;
        
        const status1: ExcludedStatus = "success"; // ✅ 가능
        const status2: ExcludedStatus = "error";   // ✅ 가능
        const status3: ExcludedStatus = "pending"; // ❌ 불가능
        ```
        
        👉 `ExcludedStatus`는 `"success" | "error"`만 허용해요.
        
        ---
        
        ### 예시 2: 인물 타입에서 제거
        
        ```tsx
        type People = "김용민" | "매튜" | "고구마";
        
        // "고구마"를 빼고 싶을 때
        type OnlyPeople = Exclude<People, "고구마">;
        
        const p1: OnlyPeople = "김용민"; // ✅
        const p2: OnlyPeople = "매튜";   // ✅
        const p3: OnlyPeople = "고구마"; // ❌ 오류
        ```
        
        👉 `OnlyPeople` 타입에는 `"김용민"`과 `"매튜"`만 가능해요.
        
        ---
        
        ### 언제 사용하나요?
        
        - 여러 타입 중 **특정 타입만 제외**하고 싶을 때
        - 예: `"admin" | "user" | "guest"` 중 `"guest"`는 빼고 싶을 때
        - 예: `"success" | "error" | "pending"` 중 `"pending"`은 필요 없을 때
        
        ---
        
        정리하면, `Exclude`는 **큰 집합에서 불필요한 타입을 빼내고 싶은 상황**에서 유용해요.
        
    - Extract
        
        # Extract
        
        ## Extract<T, U> - 특정 타입만 추출해요
        
        `Extract<T, U>`는 타입 `T` 중에서 `U`에 해당하는 타입만 **뽑아와서 새로운 타입**으로 만들어요.
        
        즉, "이것만 가져와!"라는 느낌이에요.
        
        ---
        
        ### 예시 1: 상태 값에서 추출
        
        ```tsx
        type Status = "success" | "error" | "pending";
        
        // "success"와 "error"만 뽑아요
        type AllowedStatus = Extract<Status, "success" | "error">;
        
        const s1: AllowedStatus = "success"; // ✅ 가능
        const s2: AllowedStatus = "error";   // ✅ 가능
        const s3: AllowedStatus = "pending"; // ❌ 불가능
        ```
        
        👉 `AllowedStatus`는 `"success"` 또는 `"error"`만 허용해요.
        
        ---
        
        ### 예시 2: 인물 타입에서 추출
        
        ```tsx
        type People = "김용민" | "매튜" | "고구마";
        
        // "김용민"과 "매튜"만 추출
        type OnlyNames = Extract<People, "김용민" | "매튜">;
        
        const p1: OnlyNames = "김용민"; // ✅
        const p2: OnlyNames = "매튜";   // ✅
        const p3: OnlyNames = "고구마"; // ❌ 오류
        ```
        
        👉 `OnlyNames`는 `"김용민"`과 `"매튜"`만 가능해요.
        
        ---
        
        ### 언제 사용하나요?
        
        - 여러 타입 중에서 **일부만 뽑아 쓰고 싶을 때**
        - 예: `"admin" | "user" | "guest"` 중 `"admin"`과 `"user"`만 허용하고 싶을 때
        - 예: `"김용민" | "매튜" | "고구마"` 중 `"고구마"`는 빼고, 사람 이름만 받고 싶을 때
        
        ---
        
        정리하면, `Extract`는 **큰 집합에서 필요한 타입만 골라내는 도구에요.**
        
    - NonNullabe
        
        # NonNullable
        
        ## NonNullable<T> - `null`과 `undefined`를 제거해요
        
        `NonNullable<T>`는 타입 `T`에서 `null`과 `undefined`를 빼고 남은 타입만 가져와요.
        
        즉, 값이 꼭 **존재해야 하는 경우**에 안전하게 사용할 수 있어요.
        
        ---
        
        ### 예시 1: 기본 사용
        
        ```tsx
        type UserName = string | null | undefined;
        type ValidUserName = NonNullable<UserName>;
        
        const name1: ValidUserName = "김용민"; // ✅ 가능
        const name2: ValidUserName = null;     // ❌ 불가능
        const name3: ValidUserName = undefined;// ❌ 불가능
        ```
        
        👉 `ValidUserName`은 이제 `string`만 허용해요.
        
        ---
        
        ### 예시 2: 여러 타입에서 제거
        
        ```tsx
        type Food = "고구마" | "김용민" | null | undefined;
        
        // null과 undefined가 제거돼요
        type RealFood = NonNullable<Food>;
        
        const f1: RealFood = "고구마";   // ✅ 가능
        const f2: RealFood = "김용민";   // ✅ 가능
        const f3: RealFood = null;       // ❌ 오류
        const f4: RealFood = undefined;  // ❌ 오류
        ```
        
        👉 `RealFood`는 `"고구마" | "김용민"`만 가능해요.
        
        ---
        
        ### 언제 사용하나요?
        
        - `null`이나 `undefined`가 들어오면 안 되는 경우
        - 예: 함수 매개변수에서 무조건 값이 있어야 할 때
        - 예: DB에서 조회한 값이 `null`일 수도 있지만, 이후 로직에서는 꼭 값이 필요할 때
        
        ---
        
        정리하면, `NonNullable`은 **값이 비어 있지 않도록 강제할 때 쓰는 도구에요.**
        
    - ReturnType
        
        # ReturnType
        
        ## ReturnType<T> - 함수 반환 타입을 가져와요
        
        `ReturnType<T>`는 함수가 **무엇을 반환하는지 그 타입만 뽑아내는 도구**에요.
        
        즉, "이 함수가 반환하는 게 어떤 타입이지?" 하고 자동으로 추출해줘요.
        
        ---
        
        ### 예시 1: 기본 사용
        
        ```tsx
        function getUser() {
          return { id: 1, name: "김용민" };
        }
        
        // 함수 반환 타입 자동 추출
        type UserType = ReturnType<typeof getUser>;
        
        const user: UserType = { id: 2, name: "매튜" }; // ✅ 가능
        ```
        
        👉 `UserType`은 `{ id: number; name: string }` 타입으로 추출돼요.
        
        ---
        
        ### 예시 2: 다른 함수에도 활용
        
        ```tsx
        function getFood() {
          return ["고구마", "고구마아이스크림"];
        }
        
        type FoodType = ReturnType<typeof getFood>;
        
        const foods: FoodType = ["고구마", "고구마아이스크림"]; // ✅ 가능
        ```
        
        👉 `FoodType`은 `string[]` 타입으로 추출돼요.
        
        ---
        
        ### 언제 사용하나요?
        
        - 함수가 반환하는 타입을 따로 **중복 선언하기 싫을 때**
        - 여러 곳에서 동일한 반환 타입을 **재사용하고 싶을 때**
        - API 호출 함수의 응답 타입을 **자동으로 맞추고 싶을 때**
        
        ---
        
        정리하면, `ReturnType`은 **함수의 결과 타입을 자동으로 뽑아서 재사용할 때 쓰는 도구에요.**
        
    - Parameters
        
        # Parameters
        
        ## Parameters<T> - 함수 매개변수 타입을 가져와요
        
        `Parameters<T>`는 함수가 **어떤 매개변수를 받는지 그 타입들을 튜플 형태로 뽑아내는 도구**에요.
        
        즉, "이 함수의 파라미터 타입이 뭐였지?" 하고 자동으로 추출해줘요.
        
        ---
        
        ### 예시 1: 기본 사용
        
        ```tsx
        function introduce(name: string, age: number) {
          return `${name}은 ${age}살이에요.`;
        }
        
        // 함수 매개변수 타입 추출
        type IntroduceParams = Parameters<typeof introduce>;
        
        const params: IntroduceParams = ["김용민", 27]; // ✅ 가능
        ```
        
        👉 `IntroduceParams`는 `[string, number]` 타입이에요.
        
        ---
        
        ### 예시 2: 다른 함수에도 활용
        
        ```tsx
        function addFood(food: string, count: number, isSweet: boolean) {
          return `${food}를 ${count}개 추가했어요. 달콤한가요? ${isSweet}`;
        }
        
        type FoodParams = Parameters<typeof addFood>;
        
        const goguma: FoodParams = ["고구마", 3, true]; // ✅ 가능
        ```
        
        👉 `FoodParams`는 `[string, number, boolean]` 타입으로 추출돼요.
        
        ---
        
        ### 언제 사용하나요?
        
        - 함수를 재사용할 때, 매개변수 타입을 **자동으로 가져오고 싶을 때**
        - 여러 곳에서 같은 인자를 쓰는 함수를 만들고 싶을 때
        - API 요청 함수의 **입력 타입을 중복 선언하지 않고** 재사용하고 싶을 때
        
        ---
        
        정리하면, `Parameters`는 **함수의 입력(파라미터) 타입을 자동으로 추출해서 재사용할 때 쓰는 도구에요.**
        
    
    ### **📌 결론**
    
    | 유틸리티 타입 | 설명 |
    | --- | --- |
    | `Partial<T>` | 모든 프로퍼티를 선택적으로 만듦 (`?`) |
    | `Required<T>` | 모든 프로퍼티를 필수로 만듦 (`!`) |
    | `Readonly<T>` | 모든 프로퍼티를 읽기 전용으로 만듦 |
    | `Record<K, T>` | 객체의 키와 값 타입을 정의 |
    | `Pick<T, K>` | 특정 프로퍼티만 선택 |
    | `Omit<T, K>` | 특정 프로퍼티 제외 |
    | `Exclude<T, U>` | 특정 타입 제거 |
    | `Extract<T, U>` | 특정 타입만 추출 |
    | `NonNullable<T>` | `null` 및 `undefined` 제거 |
    | `ReturnType<T>` | 함수의 반환 타입 추출 |
    | `Parameters<T>` | 함수의 매개변수 타입을 튜플로 추출 |
    

# 🍠 미션 1 - TypeScript를 활용하여 ToDo List 만들기!

---

<aside>
🔥 이번 미션에서는 **`TypeScript`**를 활용해 **`To-Do List**를 직접 구현`하는 것이 목표에요. 단순히 JavaScript로 만드는 것이 아니라, `타입 안정성을 갖춘 **견고한 애플리케이션**`을 만들어보는 경험을 할 수 있어요.

> 📌 방법: 
1. **`JavaScript`** 핸드북의 미션을 먼저 참고한 뒤, **`JavaScript`**로 먼저 만들어보세요 (권장)
> 
> 
> 2. 그 이후 **`TypeScript`**로 재작성해보는 것을 추천해요.  (물론, 1번 과정을 생략해도 좋아요)
> 
> 3. 강의 영상은 참고용으로만 활용하고, 먼저 직접 구현해보는 게 좋아요.
> 
</aside>

**👉 강의 영상**

https://www.youtube.com/watch?v=e8H5IvHCKwA&t=4s

**👉 ToDo List 동작 영상**

[Screen Recording 2025-02-15 at 10.57.33 PM.mov](attachment:0f4c6fdd-b36e-4684-8f1a-c6c0ab2ff251:Screen_Recording_2025-02-15_at_10.57.33_PM.mov)

**진행 방법 체크리스트**

- [x]  **`ToDo List`** 구조를 먼저 잡아주세요 `HANDBOOK`의 `html` 미션을 참고하여 나누어주세요!
- [x]  **`ToDo List`**의 UI를 구현해주세요!
- [x]  `tsconfig.json` 파일은 아래 토글을 열어 복사해서 사용해주세요.
    - **`tsconfig.json`**
        
        ```tsx
        {
          "compilerOptions": {
            "target": "es2016", // ECMAScript 2016으로 컴파일
            "module": "ES2015", // ES2015 모듈 시스템 사용
            "rootDir": "./src", // 소스 파일의 루트 디렉토리
            "outDir": "./dist", // 컴파일된 파일이 저장될 디렉토리
            "esModuleInterop": true, // ES 모듈 호환성 설정
            "forceConsistentCasingInFileNames": true, // 파일 이름의 대소문자 일관성 강제
            "strict": true, // 엄격한 타입 검사
            "skipLibCheck": true, // 라이브러리 파일 검사 건너뜀
            "removeComments": true, // 컴파일된 코드에서 주석 제거
            "noEmitOnError": false, // 컴파일 에러 발생 시 파일 생성 안 함
            "noUnusedLocals": true, // 사용하지 않는 지역 변수에 대해 에러 발생
            "noUnusedParameters": true, // 사용하지 않는 매개변수에 대해 에러 발생
            "noImplicitReturns": true, // 함수에서 명시적으로 값을 반환하지 않는 경우 에러 발생
            "noFallthroughCasesInSwitch": true, // switch 문에서 fallthrough 방지
            "noUncheckedIndexedAccess": true // 인덱스 접근 시 체크되지 않은 경우 에러 발생
          }
        }
        ```
        
- [x]  할 일 추가시, 할 일 목록에 추가가 됩니다.
- [x]  추가된 할 일에서 완료 버튼을 클릭시, 완료 목록으로 이동됩니다.
- [x]  완료 목록의 삭제 버튼을 클릭 시, 할 일이 삭제 됩니다.
- [x]  CSS BEM 방법론을 활용하였나요?
    
    [개발자 매튜 | BEM CSS 방법론 실전 가이드 - 예제로 배우는 네이밍 규칙](https://www.yolog.co.kr/post/css-bem-methodology)
    

### 🍠 미션 1. 제출

- 깃허브 주소 🍠
    
    
- 실행 영상 🍠
    
    [9th-web_강민규_1주차 실행영상.mp4](attachment:079745f5-11b1-4ff9-a90c-ba5d0cd813d9:9th-web_강민규_1주차_실행영상.mp4)
    

### 🍠 추가 미션. `type` vs `interface`

<aside>
💡

처음엔 `type`과 `interface`가 거의 비슷해 보이지만, 막상 프로젝트에서 사용하다 보면 “이 상황에는 어떤 걸 쓰는 게 더 적합하지?” 하는 고민이 생기곤 합니다.

저도 직접 정리하면서 생각이 많이 정리되었는데, 여러분도 한번 정리해보시면 도움이 될 것이라고 생각합니다!

</aside>

**제가 정리한 글도 참고하실 수 있습니다 !**

[개발자 매튜 | type vs interface 어떤 것을 사용해야 할까?](https://www.yolog.co.kr/post/ts-interface-type)

여러분도 블로그 글이나 노션 링크를 남겨주셔도 좋고, 간단히 키워드 위주로 정리해서 공유해주셔도 좋습니다.

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

[개발자 매튜 | BEM CSS 방법론 실전 가이드 - 예제로 배우는 네이밍 규칙](https://www.yolog.co.kr/post/css-bem-methodology)

[개발자 매튜 | type vs interface 어떤 것을 사용해야 할까?](https://www.yolog.co.kr/post/ts-interface-type)

# 🛡️ 저작권

---

**© 2025 [Kim Yongmin (Matthew)](https://www.youtube.com/@yongcoding). All rights reserved.**