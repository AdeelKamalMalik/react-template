import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import styled from 'styled-components'
import BoardItem  from './item'

type BoardColumnProps = {
  column: { id: string, title: string, itemsIds: string[] }
  items: { id: string, content: string }[]
}

type BoardColumnContentStylesProps = {
  isdraggingover: string
}

const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #e5eff5;
  border-radius: 4px;

  & + & {
    margin-left: 12px;
  }
`

const BoardColumnTitle = styled.h2`
  font: 14px sans-serif;
  margin-bottom: 12px;
`

// Prevent `isdraggingover` from being passed to the DOM element
const BoardColumnContent = styled.div.attrs<BoardColumnContentStylesProps>(
  ({ isdraggingover }) => ({
    style: {
      backgroundColor: isdraggingover ? '#aecde0' : 'transparent',
    },
  })
)`
  min-height: 20px;
  border-radius: 4px;
`

const BoardColumn: React.FC<BoardColumnProps> = ({ column = { title: 'Default Column', id: 'default' }, items = [] }) => {
  return (
    <BoardColumnWrapper>
      <BoardColumnTitle>{column.title}</BoardColumnTitle>

      <Droppable droppableId={column.id} key={column.id}>
        {(provided, snapshot) => (
          <BoardColumnContent
            ref={provided.innerRef}
            {...provided.droppableProps}
            isdraggingover={snapshot.isDraggingOver ? 'true' : 'false'}
          >
            {items.map((item, index) => (
              <BoardItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </BoardColumnContent>
        )}
      </Droppable>
    </BoardColumnWrapper>
  )
}

export default BoardColumn