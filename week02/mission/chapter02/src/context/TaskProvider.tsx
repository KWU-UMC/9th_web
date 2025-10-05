import { createContext, useState, ReactNode, useContext } from 'react'

export type Task = {
  id: number
  text: string
}

interface TaskContextType {
  todoTasks: Task[]
  doneTasks: Task[]
  addTodo: (text: string) => void
  completeTask: (task: Task) => void
  deleteTask: (task: Task) => void
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [todoTasks, setTodoTasks] = useState<Task[]>([])
  const [doneTasks, setDoneTasks] = useState<Task[]>([])

  // 할 일 추가
  const addTodo = (text: string) => {
    setTodoTasks([...todoTasks, { id: Date.now(), text }])
  }

  // 완료 처리
  const completeTask = (task: Task) => {
    setTodoTasks(todoTasks.filter((t) => t.id !== task.id))
    setDoneTasks([...doneTasks, task])
  }

  // 삭제 처리
  const deleteTask = (task: Task) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id))
  }

  return (
    <TaskContext.Provider value={{ todoTasks, doneTasks, addTodo, completeTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks는 TodoProvider 안에서만 사용할 수 있습니다.')
  }
  return context
}
