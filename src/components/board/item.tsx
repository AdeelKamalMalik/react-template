import { FC } from 'react';
import { Draggable } from '@hello-pangea/dnd';

import { TAG_COLORS } from '../../constants';
import { BoardItemProps } from '../../types';
import { BoardItemEl, BoardItemTitle, BoardItemDescription, TagsContainer,Tag, DueDate } from './styles';

const BoardItem: FC<BoardItemProps> = ({ index, item, onEditTask }) => {
  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided, snapshot) => (
        <BoardItemEl
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isdragging={snapshot.isDragging ? 'true' : 'false'}
          priority={item.priority}
          onClick={() => onEditTask(item.id)}
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
