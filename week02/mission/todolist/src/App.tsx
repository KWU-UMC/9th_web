import './App.css';
import Lists from './components/Lists';
import Form from './components/Form';
import clsx from 'clsx';
import { useTodo } from './context/TodoProvider';

const App = () => {
  const {isDark} = useTodo();

  return (
    <div className={clsx(
      'todo-container',
      isDark ? 'bg-gray-500' : 'bg-white'
    )}>
      <header>
        <h1 className={clsx(
          'todo-container__header',
          isDark ? 'text-white' : 'text-black'
        )}>TODO LIST</h1>
      </header>
      <Form />
      <div className='render-container'>
        <Lists isCompleted={false}/>
        <Lists isCompleted={true}/>
      </div>
    </div>
  );
};

export default App;
