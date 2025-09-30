import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { useTodo } from "../context/TodoContext";
import { ThemeToggle } from "./ThemeToggle"; // ✅ 다크/라이트 모드 토글 버튼 import

const Todo = () => {
  const { todos, completeTodo, deleteTodo, doneTodos } = useTodo();

  // return 다음 줄바꿈 에러 방지: 괄호를 같은 줄에 시작
  return (
    <div className="todo-container">
      <div className="todo-container__header">
        <h1>Dew Todo</h1>
        <ThemeToggle /> {/* ✅ 다크/라이트 모드 전환 버튼 */}
      </div>

      <TodoForm />

      {/* 나중에 todoform 만들어서 파일 import해서 가져옴 */}
      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          variant="success"            // ✅ here
          onClick={completeTodo} //context?.completeTodos는?
          /*context?.completeTodos 처럼 물음표(?.) 가 들어간 건 옵셔널 체이닝(optional chaining) 문법이에요.
          정리  
          ?. = 옵셔널 체이닝
          객체가 null 또는 undefined일 때 안전하게 접근하기 위해 씀
          context가 undefined일 수 있기 때문에 붙여둔 것*/
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          buttonLabel="삭제"
          variant="danger"             // ✅ here
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
