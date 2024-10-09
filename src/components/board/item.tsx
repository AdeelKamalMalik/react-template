
import React from 'react'
import { Draggable } from '@hello-pangea/dnd'
import styled from 'styled-components'
import { BoardItemStylesProps, Item } from '../../types'

type BoardItemProps = {
  index: number
  item: Item
}

const BoardItemEl = styled.div<BoardItemStylesProps>`
  padding: 16px;
  background-color: ${({ isdragging }) => isdragging === 'true' ? '#d3e4ee' : '#fff'};
  border-radius: 4px;
  border-left: 4px solid ${({ priority }) => priority === 'high' ? '#e53935' : priority === 'medium' ? '#ffb300' : '#4caf50'};
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: background-color .25s ease-out;
  margin-bottom: 8px;

  &:hover {
    background-color: #f7fafc;
  }
`

const BoardItemTitle = styled.h4`
  font-size: 16px;
  margin: 0 0 8px;
  font-weight: bold;
`

const BoardItemDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 12px;
`

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`

const Tag = styled.span`
  padding: 4px 8px;
  background-color: #e0f7fa;
  border-radius: 12px;
  font-size: 12px;
  color: #00695c;
`

const DueDate = styled.div`
  font-size: 12px;
  color: #999;
`

const BoardItem: React.FC<BoardItemProps> = ({ index, item }) => {
  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided, snapshot) => (
        <BoardItemEl
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isdragging={snapshot.isDragging ? 'true' : 'false'}
          priority={item.priority}
        >
          <BoardItemTitle>{item.title}</BoardItemTitle>
          <BoardItemDescription>{item.description}</BoardItemDescription>

          {item.tags && (
            <TagsContainer>
              {item.tags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </TagsContainer>
          )}

          {item.dueDate && (
            <DueDate>Due: {new Date(item.dueDate).toLocaleDateString()}</DueDate>
          )}
        </BoardItemEl>
      )}
    </Draggable>
  )
}

export default BoardItem