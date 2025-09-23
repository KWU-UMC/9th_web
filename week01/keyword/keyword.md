- null과 undefined의 차이점에 대해 직접 작성해주세요 🍠
    - null: 비어있음으로 선언된 변수
    - undefined: 선언 되지 않은 변수
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
        - null: 비어있음으로 선언된 변수
        - undefined: 선언 되지 않은 변수
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
            
            ```tsx
            const str:string = 'hi';
            ```
            
        - number
            
            ```tsx
            const num: number = 1;
            ```
            
        - boolean
            
            ```tsx
            const isTrue:boolean = true;
            ```
            
        - null
            
            ```tsx
            const name:null | string = null
            ```
            
        - undefined
            
            ```tsx
            const name:undefined| string;
            ```
            
        - symbol
            
            ```tsx
            const isSymbol: symbol = Symbol('symbol');
            ```
            
        - bigint
            
            ```tsx
            const bigInt:biging = 1234123412341234n;
            ```
            
        - object
            
            ```tsx
            const me:{name:string,age:num} = {
            	name:"도형",
            	age: 25
            }
            ```
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
        
        : 호이스팅이 된다
        
    - 화살표 함수의 특징에 대해 정리해주세요!
        
        : 호이스팅이 안된다
- 타입 스크립트에만 존재하는 타입 🍠
    - any 🍠
        
        : 아무거나
        
    - unknown 🍠
        
        : any와 비슷하지만 특정 타입에만 사용가능한 함수 사용 시 컴파일 에러 반환
        
    - void 🍠
        
        : 반환 값이 없을 때(undefined)
        
        ```tsx
        const func1 = ():void=>{
        	console.log('hi');
        	return;
        }
        ```
        
    - never 🍠
        
        : 반환하지 않는 경우
        
        ```tsx
        const func2 = ():never=>{
        	while(1);
        }
        ```