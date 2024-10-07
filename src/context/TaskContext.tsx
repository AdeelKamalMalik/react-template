import { createContext, useState, useContext, useCallback, useMemo, FC, ReactNode } from 'react';

import { generateTaskId } from '../utils';
import { Task, TaskContextProps } from '../types';
import { TASK_CONTEXT_ERROR } from '../constants';

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error(TASK_CONTEXT_ERROR);
  return context;
};

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = useCallback(
    (title: string) => {
      setTasks((prevTasks) => [...prevTasks, { id: generateTaskId(), title }]);
    },
    [setTasks]
  );

  const removeTask = useCallback((id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, [setTasks]);

  const value = useMemo(
    () => ({ tasks, newTask, addTask, removeTask, setNewTask }),
    [tasks, newTask, addTask, removeTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
