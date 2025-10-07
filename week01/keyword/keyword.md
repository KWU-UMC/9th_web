- null과 undefined의 차이점에 대해 직접 작성해주세요 🍠
    
    undefined는 선언은 되었으나 값 할당이 아직 되지 않은 상태이고, null은 값이 없는 상태를 명시적으로 설정할 때 사용한다.

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
    
    호이스팅 가능
    
- 화살표 함수의 특징에 대해 정리해주세요!
    
    호이스팅 불가.

- 타입 스크립트에만 존재하는 타입 🍠
    - any 🍠
        
        모든 타입을 허용하는 타입
        
        타입 검사 안함
        
    - unknown 🍠
        
        어떤 타입도 담을 수 있지만, 사용할 때는 타입 검사
        
        → 타입 검증을 거치기 전까지 쓸 수 없는 안전한 타입.
        
    - void 🍠
        
        값 반환하지 않는 함수의 반환 타입
        
    - never 🍠
        
        절대 실행이 끝까지 도달하지 않는 함수의 반환 타입

    
    깃허브 주소 : https://github.com/j134224/9th_web