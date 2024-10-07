import { createContext, useState, useContext, useCallback, useMemo, FC, ReactNode } from 'react';
import { generateTaskId } from '../utils';
import { Task, TaskContextProps, TaskStatus } from '../types';
import { TASK_CONTEXT_ERROR } from '../constants';

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error(TASK_CONTEXT_ERROR);
  return context;
};

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback(
    (title: string, status: TaskStatus = 'pending') => {
      const newTask: Task = {
        id: generateTaskId(),
        title,
        status,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    },
    [setTasks]
  );

  const removeTask = useCallback(
    (id: number) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const updateTask = useCallback(
    (updatedTask: Task) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    },
    [setTasks]
  );

  const value = useMemo(
    () => ({ tasks, addTask, removeTask, updateTask }),
    [tasks, addTask, removeTask, updateTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
