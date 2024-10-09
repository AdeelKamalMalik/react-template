import React from 'react';
import styled from 'styled-components';
import { Draggable } from '@hello-pangea/dnd';

import { TAG_COLORS } from '../../constants';
import { BoardItemProps, BoardItemStylesProps } from '../../types';

const BoardItemEl = styled.div<BoardItemStylesProps>`
  padding: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  border-radius: 8px;
  border-left: 4px solid
    ${({ priority }) =>
    priority === 'high'
      ? '#e53935'
      : priority === 'medium'
        ? '#ffb300'
        : priority === 'low'
          ? '#4caf50'
          : 'transparent'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.25s ease-out, box-shadow 0.25s ease-out;
  margin-bottom: 8px;

  &:hover {
    background: linear-gradient(135deg, #f7fafc 0%, #e0e0e0 100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  cursor: pointer; /* Add cursor to indicate clickable */
`;

const BoardItemTitle = styled.h4`
  font-size: 16px;
  margin: 0 0 8px;
  font-weight: bold;
`;

const BoardItemDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 12px;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const Tag = styled.span<{ color: string }>`
  padding: 4px 8px;
  background-color: ${({ color }) => color};
  border-radius: 12px;
  font-size: 12px;
  color: #fff;
`;

const DueDate = styled.div`
  font-size: 12px;
  color: #999;
`;

const BoardItem: React.FC<BoardItemProps> = ({ index, item, onEditTask }) => {
  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided, snapshot) => (
        <BoardItemEl
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isdragging={snapshot.isDragging ? 'true' : 'false'}
          priority={item.priority}
          onClick={() => onEditTask(item.id)} // Call onEditTask when the item is clicked
        >
          <BoardItemTitle>{item.title}</BoardItemTitle>
          <BoardItemDescription>{item.description}</BoardItemDescription>

          {item.tags && (
            <TagsContainer>
              {item.tags.map((tag, i) => (
                <Tag key={i} color={TAG_COLORS[tag] || '#ccc'}>
                  {tag}
                </Tag>
              ))}
            </TagsContainer>
          )}

          {item.dueDate && (
            <DueDate>Due: {new Date(item.dueDate).toLocaleDateString()}</DueDate>
          )}
        </BoardItemEl>
      )}
    </Draggable>
  );
};

export default BoardItem;
