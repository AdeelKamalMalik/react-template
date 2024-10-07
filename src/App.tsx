import { FC } from 'react';

import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import ThemeToggleButton from './components/ThemeToggleButton';

import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import { TASK_MANAGER } from './constants';

const App: FC = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="app-container">
          <ThemeToggleButton />

          <h1>{TASK_MANAGER}</h1>
          <AddTaskForm />
          <TaskList />
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;
