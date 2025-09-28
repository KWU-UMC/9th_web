export type Task ={
  id: number;
  text: string;
};

export interface ListsProps{
  isCompleted: boolean;
}

export interface TasksProps{
  taskList: Task[];
  onClick: (task: Task) => void;
  color: string;
  btnText: string;
};

export interface TodoContextType{
  todoList: Task[];
  doneList: Task[];
  setTodoList: React.Dispatch<React.SetStateAction<Task[]>>;
  setDoneList: React.Dispatch<React.SetStateAction<Task[]>>;
  completeTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
};