import React, { useState, useCallback } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import CardForm from './form';
import BoardColumn from './column';

import { BoardEl } from './styles';
import { Item } from '../../types';
import { useTaskContext } from '../../context/TaskContext';
import { useThemeContext } from '../../context/ThemeContext';

export const Board: React.FC = () => {
  const { currentGradients } = useThemeContext();
  const { searchTerm, openModal, setOpenModal, boardData, setBoardData } = useTaskContext();
  const [editingTask, setEditingTask] = useState<Item | null>(null);

  const openEditModal = (taskId: string) => {
    const task = Object.values(boardData.items).find((task) => task.id === taskId);

    if (task) {
      setEditingTask(task);
      setOpenModal(true);
    }
  };

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
    [boardData, setBoardData]
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
          onClose={() => {
            setOpenModal(false)
            setEditingTask(null)
          }}
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
