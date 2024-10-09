import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import styled from 'styled-components';
import BoardItem from './item';
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
  color: ${({ isDarkMode }) => (isDarkMode ? '#fff' : '#000')}; /* Set text color based on theme */
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

const BoardColumn: React.FC<BoardColumnProps> = ({ column, items, onEditTask }) => {
  const { currentGradients, isDarkMode } = useThemeContext();

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
            {items.map((item, index) => (
              <BoardItem
                key={item.id}
                item={item}
                index={index}
                onEditTask={onEditTask}
              />
            ))}
            {provided.placeholder}
          </BoardColumnContent>
        )}
      </Droppable>
    </BoardColumnWrapper>
  );
};

export default BoardColumn;
