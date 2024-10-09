import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import BoardColumn from './column';
import { BoardData } from '../../types';
import { INITIAL_BOARD_DATA } from '../../constants';
import { useTaskContext } from '../../context/TaskContext';
import { useThemeContext } from '../../context/ThemeContext';

const BoardEl = styled.div<{ gradient: string }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 100vh;
  background: ${({ gradient }) => gradient};
`;

export const Board: React.FC = () => {
  const { currentGradients } = useThemeContext();
  const { searchTerm } = useTaskContext();

  const [boardData, setBoardData] = useState<BoardData>(INITIAL_BOARD_DATA);

  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

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
  }, [boardData]);

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
  
          return <BoardColumn key={column.id} column={column} items={items} />;
        })}
      </DragDropContext>
    </BoardEl>
  );  
};
