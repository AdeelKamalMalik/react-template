import React from 'react';
import styled from 'styled-components';
import { Droppable } from '@hello-pangea/dnd';
import AddIcon from '@mui/icons-material/Add';

import BoardItem from './item';

import { useTaskContext } from '../../context/TaskContext';
import { useThemeContext } from '../../context/ThemeContext';
import { BoardColumnContentStylesProps, BoardColumnProps } from '../../types';

const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #a04cb1, #ff6dff);

  & + & {
    margin-left: 12px;
  }
`;

const BoardColumnTitle = styled.h2<{ isDarkMode: boolean }>`
  font: 14px sans-serif;
  margin-bottom: 12px;
  color: ${({ isDarkMode }) => (isDarkMode ? '#fff' : '#000')};
`;

const BoardColumnContent = styled.div.attrs<BoardColumnContentStylesProps>(
  ({ isdraggingover }) => ({
    style: {
      backgroundColor: isdraggingover ? '#aecde0' : 'transparent',
    },
  })
)`
  min-height: 20px;
  border-radius: 4px;
`;

const EmptyCard = styled.div`
  padding: 16px;
  background: #f0f0f0;
  border-radius: 8px;
  text-align: center;
  color: #666;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

const BoardColumn: React.FC<BoardColumnProps> = ({ column, items, onEditTask }) => {
  const { currentGradients, isDarkMode } = useThemeContext();
  const { setOpenModal } = useTaskContext()

  return (
    <BoardColumnWrapper style={{ background: currentGradients.background }}>
      <BoardColumnTitle isDarkMode={isDarkMode}>{column.title}</BoardColumnTitle>

      <Droppable droppableId={column.id} key={column.id}>
        {(provided, snapshot) => (
          <BoardColumnContent
            ref={provided.innerRef}
            {...provided.droppableProps}
            isdraggingover={snapshot.isDraggingOver ? 'true' : 'false'}
          >
            {items.length > 0 ? (
              items.map((item, index) => (
                <BoardItem
                  key={item.id}
                  item={item}
                  index={index}
                  onEditTask={onEditTask}
                />
              ))
            ) : (
              <EmptyCard onClick={() => setOpenModal(true)}>
                <AddIcon />
                Add a card
              </EmptyCard>
            )}
            {provided.placeholder}
          </BoardColumnContent>
        )}
      </Droppable>
    </BoardColumnWrapper>
  );
};

export default BoardColumn;
