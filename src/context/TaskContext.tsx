import { createContext, useState, useContext, useCallback, useMemo, FC, ReactNode } from 'react';

import { generateTaskId } from '../utils';
import { Item, Tag, TaskContextProps } from '../types';
import { TASK_CONTEXT_ERROR } from '../constants';

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error(TASK_CONTEXT_ERROR);
  return context;
};

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  const addTask = useCallback(
    (title: string, description: string, tags: Tag[]) => {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 2);
  
      const newTask: Item = {
        id: generateTaskId().toString(),
        title,
        description,
        tags,
        dueDate: dueDate.toISOString().split('T')[0]
      };
  
      setTasks((prevTasks) => [...prevTasks, newTask]);
    },
    []
  );
  

  const removeTask = useCallback(
    (id: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    []
  );

  const updateTask = useCallback(
    (updatedTask: Item) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    },
    []
  );

  const value = useMemo(
    () => ({ tasks: filteredTasks, addTask, removeTask, searchTerm, updateTask, setSearchTerm }),
    [filteredTasks, addTask, removeTask, searchTerm, updateTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
