import type { Task } from '../../context/TaskProvider'
import './ListItem.css'

interface ListItemProps {
  task: Task
  isDone: boolean
  onClick: () => void
}

export const ListItem = ({ task, isDone, onClick }: ListItemProps) => {
  return (
    <>
      <li key={task.id} className='render-container__item'>
        {task.text}
        <button
          className='render-container__item-button'
          style={isDone ? { backgroundColor: '#dc3545' } : { backgroundColor: '#28a745' }}
          onClick={onClick}
        >
          {isDone ? '삭제' : '완료'}
        </button>
      </li>
    </>
  )
}
