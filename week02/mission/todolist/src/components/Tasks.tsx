import clsx from "clsx"
import type { TasksProps, Task } from "../types/todo"
import { useTodo } from "../context/TodoProvider"

const Tasks = ({ taskList, onClick, color, btnText }: TasksProps) => {
  const {isDark} = useTodo();
  return (
    <>
      {taskList.map((task: Task) => (
        <li className={clsx(
          'render-container__item',
          isDark ? 'bg-gray-400 text-white' : 'bg-#f9f9f9'
        )} key={task.id}>
          {task.text}
          <button
            className='render-container__item-button'
            style={{backgroundColor: color}}
            onClick={() => onClick(task)}
          >{btnText}</button>
        </li>
      ))}
    </>
  )
}

export default Tasks
