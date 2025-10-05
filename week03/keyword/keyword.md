- `pushState`, `popstate` 이벤트, 전체 리로드와의 차이 🍠
  **pushState:**
  - 브라우저 히스토리에 새 경로 추가
  popstate 이벤트
  - 브라우저의 히스토리에서 뒤로/앞으로 가기 수행
  전체 리로드
- 전체 리로드 방식과 SPA 라우팅 방식의 가장 큰 차이는 무엇일까? 🍠
  전체 리로드: 서버에 새 HTML요청, 페이지 전체 새로고침
  SPA 라우팅: 필요한 데이터만 요청, 화면 일부만 업데이트, 부드러운 전환
- `preventDefault()`와 `stopPropagation()`의 차이와 역할은 무엇인가? 🍠
  preventDefault(): 브라우저 기본 동작 차단(링크이동,폼제출,우클릭)
  stopPropagation(): 이벤트가 부모로 전파되는 것 차단
- 선언적 라우팅(`Route`, `Routes`) 구조가 가지는 장점은 무엇일까? 🍠
  - 브라우저의 뒤로/앞으로 가기 감지
  - pushState만으로는 감지 안 됨
  - 히스토리 이동 시에만 발생
