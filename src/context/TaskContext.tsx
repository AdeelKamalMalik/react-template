import React, { createContext, useState, useContext, useCallback, useMemo, FC, ReactNode } from 'react';

import { generateTaskId } from '../utils';
import { BoardData, Item, Tag, TaskContextProps } from '../types';
import { INITIAL_BOARD_DATA, TASK_CONTEXT_ERROR } from '../constants';

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error(TASK_CONTEXT_ERROR);
  return context;
};

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [, setTasks] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [boardData, setBoardData] = useState<BoardData>(INITIAL_BOARD_DATA);

  const filteredTasks = useMemo(() => {
    const itemsArray = Object.values(boardData.items);

    // Sort items by due date (assuming latest means most recent due date)
    const sortedTasks = itemsArray.sort((a, b) => {
      const dateA = new Date(a.dueDate || '').getTime();
      const dateB = new Date(b.dueDate || '').getTime();
      return dateB - dateA;
    });

    return sortedTasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [boardData.items, searchTerm]);

  const syncBoardData = useCallback((newTasks: Item[]) => {
    const updatedItems = newTasks.reduce((acc, task) => {
      acc[task.id] = task;
      return acc;
    }, {} as BoardData['items']);

    setBoardData((prevData) => ({
      ...prevData,
      items: updatedItems,
      columns: {
        ...prevData.columns,
        'column-1': {
          ...prevData.columns['column-1'],
          itemIds: newTasks.map((task) => task.id),
        },
      },
    }));
  }, []);

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

      setBoardData((prevBoardData) => {
        const updatedItems = {
          ...prevBoardData.items,
          [newTask.id]: newTask,
        };

        const updatedColumn = {
          ...prevBoardData.columns['column-1'],
          itemsIds: [...prevBoardData.columns['column-1'].itemsIds, newTask.id],
        };

        return {
          ...prevBoardData,
          items: updatedItems,
          columns: {
            ...prevBoardData.columns,
            'column-1': updatedColumn,
          },
        };
      });

      setOpenModal(false);
    },
    []
  );

  const updateTask = useCallback(
    (updatedTask: Item) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );

        setBoardData((prevBoardData) => {
          const updatedBoardData = {
            ...prevBoardData,
            items: {
              ...prevBoardData.items,
              [updatedTask.id]: {
                ...prevBoardData.items[updatedTask.id],
                ...updatedTask,
              },
            },
          };
          return updatedBoardData;
        });

        return updatedTasks;
      });

      setOpenModal(false);
    },
    [setBoardData]
  );

  const removeTask = useCallback(
    (id: string) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== id);
        syncBoardData(updatedTasks);
        return updatedTasks;
      });
    },
    [syncBoardData]
  );

  const value = useMemo(
    () => ({
      tasks: filteredTasks,
      addTask,
      removeTask,
      searchTerm,
      updateTask,
      setSearchTerm,
      openModal,
      setOpenModal,
      boardData,
      setBoardData,
    }),
    [filteredTasks, addTask, removeTask, searchTerm, updateTask, openModal, boardData]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
