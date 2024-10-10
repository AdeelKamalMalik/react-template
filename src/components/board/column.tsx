import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import AddIcon from '@mui/icons-material/Add';

import BoardItem from './item';

import { BoardColumnProps } from '../../types';
import { useTaskContext } from '../../context/TaskContext';
import { useThemeContext } from '../../context/ThemeContext';
import { BoardColumnWrapper, BoardColumnTitle, BoardColumnContent, EmptyCard } from './styles';

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
