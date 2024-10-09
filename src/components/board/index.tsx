import React, { useState, useCallback } from 'react'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import styled from 'styled-components'
// Import BoardColumn component
import BoardColumn from './column'
import { INITIAL_BOARD_DATA } from '../../constants'
import { BoardData } from '../../types'

// Create styles board element properties
const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const Board: React.FC = () => {
  const [boardData, setBoardData] = useState<BoardData>(INITIAL_BOARD_DATA)
  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    const columnStart = boardData.columns[source.droppableId]
    const columnFinish = boardData.columns[destination.droppableId]
    // Moving within the same column
    if (columnStart === columnFinish) {
      const newItemsIds = Array.from(columnStart.itemsIds)
      newItemsIds.splice(source.index, 1)
      newItemsIds.splice(destination.index, 0, draggableId)
      const newColumnStart = { ...columnStart, itemsIds: newItemsIds }
      const newState = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumnStart.id]: newColumnStart
        }
      }
      setBoardData(newState)
    } else {
      // Moving to a different column
      const newStartItemsIds = Array.from(columnStart.itemsIds)
      newStartItemsIds.splice(source.index, 1)
      const newColumnStart = { ...columnStart, itemsIds: newStartItemsIds }
      const newFinishItemsIds = Array.from(columnFinish.itemsIds)
      newFinishItemsIds.splice(destination.index, 0, draggableId)
      const newColumnFinish = { ...columnFinish, itemsIds: newFinishItemsIds }
      const newState = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish
        }
      }
      setBoardData(newState)
    }
  }, [boardData])
  
  return (
    <BoardEl>
      <DragDropContext onDragEnd={onDragEnd}>
        {boardData.columnsOrder.map(columnId => {
          const column = boardData.columns[columnId]
          const items = column.itemsIds.map(itemId => boardData.items[itemId])
          return <BoardColumn key={column.id} column={column} items={items} />
        })}
      </DragDropContext>
    </BoardEl>
  )
}
