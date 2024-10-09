import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import BoardColumn from './column';
import { BoardData, Item } from '../../types';
import { INITIAL_BOARD_DATA } from '../../constants';
import { useTaskContext } from '../../context/TaskContext';
import { useThemeContext } from '../../context/ThemeContext';
import CardForm from './form';

const BoardEl = styled.div<{ gradient: string }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 100vh;
  background: ${({ gradient }) => gradient};
`;

export const Board: React.FC = () => {
  const { currentGradients } = useThemeContext();
  const { tasks, searchTerm, openModal, setOpenModal } = useTaskContext();
  const [editingTask, setEditingTask] = useState<Item | null>(null);
  const [boardData, setBoardData] = useState<BoardData>(INITIAL_BOARD_DATA);

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
    setEditingTask(null);
  };

  const openEditModal = (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);

    if (task) {
      setEditingTask(task);
      setOpenModal(true);
    }
  };

  useEffect(() => {
    const updatedItems = tasks.reduce((acc, task) => {
      acc[task.id] = task;
      return acc;
    }, {} as BoardData['items']);

    setBoardData((prevData) => ({
      ...prevData,
      items: {
        ...prevData.items,
        ...updatedItems,
      },
      columns: {
        ...prevData.columns,
        'column-1': {
          ...prevData.columns['column-1'],
          itemsIds: tasks.map((task) => task.id).concat('item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7',), // Update column-1 with the task ids
        },
      },
    }));
  }, [tasks]);
  
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;

      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;

      const columnStart = boardData.columns[source.droppableId];
      const columnFinish = boardData.columns[destination.droppableId];

      if (columnStart === columnFinish) {
        const newItemsIds = Array.from(columnStart.itemsIds);
        newItemsIds.splice(source.index, 1);
        newItemsIds.splice(destination.index, 0, draggableId);

        const newColumnStart = { ...columnStart, itemsIds: newItemsIds };
        const newState = {
          ...boardData,
          columns: {
            ...boardData.columns,
            [newColumnStart.id]: newColumnStart,
          },
        };
        setBoardData(newState);
      } else {
        const newStartItemsIds = Array.from(columnStart.itemsIds);
        newStartItemsIds.splice(source.index, 1);

        const newColumnStart = { ...columnStart, itemsIds: newStartItemsIds };
        const newFinishItemsIds = Array.from(columnFinish.itemsIds);
        newFinishItemsIds.splice(destination.index, 0, draggableId);

        const newColumnFinish = { ...columnFinish, itemsIds: newFinishItemsIds };
        const newState = {
          ...boardData,
          columns: {
            ...boardData.columns,
            [newColumnStart.id]: newColumnStart,
            [newColumnFinish.id]: newColumnFinish,
          },
        };
        setBoardData(newState);
      }
    },
    [boardData]
  );

  return (
    <BoardEl gradient={currentGradients.background}>
      <DragDropContext onDragEnd={onDragEnd}>
        {boardData.columnsOrder.map((columnId) => {
          const column = boardData.columns[columnId];
          const items = column.itemsIds
            .map((itemId) => boardData.items[itemId])
            .filter((item) => {
              if (!searchTerm) {
                return true;
              }

              return item.title.toLowerCase().includes(searchTerm.toLowerCase());
            });

          return (
            <BoardColumn
              key={column.id}
              column={column}
              items={items}
              onEditTask={openEditModal}
            />
          );
        })}
      </DragDropContext>

      {openModal && (
        <CardForm
          onClose={toggleModal}
          task={
            editingTask as {
              id: string;
              title: string;
              description: string;
              tags: string[];
            }
          }
        />
      )}
    </BoardEl>
  );
};
