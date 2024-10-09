import React from 'react'
import { Draggable } from '@hello-pangea/dnd'
import styled from 'styled-components'

type BoardItemProps = {
  index: number
  item: { id: string, content: string }
}

type BoardItemStylesProps = {
  isdragging: string
}

const BoardItemEl = styled.div<BoardItemStylesProps>`
  padding: 8px;
  background-color: ${(props) => (props.isdragging === 'true' ? '#d3e4ee' : '#fff')};
  border-radius: 4px;
  transition: background-color 0.25s ease-out;

  &:hover {
    background-color: #f7fafc;
  }

  & + & {
    margin-top: 4px;
  }
`

const BoardItem: React.FC<BoardItemProps> = ({ index, item }) => {
  return (
    <Draggable key={`${index}-${item.id}`} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <BoardItemEl
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isdragging={snapshot.isDragging ? 'true' : 'false'}
        >
          {item.content}
        </BoardItemEl>
      )}
    </Draggable>
  )
}

export default BoardItem