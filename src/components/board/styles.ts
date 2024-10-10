import { styled } from "styled-components";
import { IconButton } from "@mui/material";

import { BoardColumnContentStylesProps, BoardItemStylesProps } from "../../types";

export const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #a04cb1, #ff6dff);

  & + & {
    margin-left: 12px;
  }
`;

export const BoardColumnTitle = styled.h2<{ isDarkMode: boolean }>`
  font: 14px sans-serif;
  margin-bottom: 12px;
  color: ${({ isDarkMode }) => (isDarkMode ? '#fff' : '#000')};
`;

export const BoardColumnContent = styled.div.attrs<BoardColumnContentStylesProps>(
  ({ isdraggingover }) => ({
    style: {
      backgroundColor: isdraggingover ? '#aecde0' : 'transparent',
    },
  })
)`
  min-height: 20px;
  border-radius: 4px;
`;

export const EmptyCard = styled.div`
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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div<{ isDarkMode: boolean }>`
  background: ${(props) => (props.isDarkMode ? '#2c2c2c' : 'white')};
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CloseButton = styled(IconButton)`
  background-color: red;
  color: white;
  &:hover {
    background-color: darkred;
  }
  width: 36px;
  height: 36px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

export const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button<{ isDarkMode: boolean }>`
  padding: 10px;
  background: ${(props) => (props.isDarkMode ? '#007bff' : '#007bff')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const BoardEl = styled.div<{ gradient: string }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 100vh;
  background: ${({ gradient }) => gradient};
`;
export 
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

export const BoardItemTitle = styled.h4`
  font-size: 16px;
  margin: 0 0 8px;
  font-weight: bold;
`;

export const BoardItemDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 12px;
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

export const Tag = styled.span<{ color: string }>`
  padding: 4px 8px;
  background-color: ${({ color }) => color};
  border-radius: 12px;
  font-size: 12px;
  color: #fff;
`;

export const DueDate = styled.div`
  font-size: 12px;
  color: #999;
`;
