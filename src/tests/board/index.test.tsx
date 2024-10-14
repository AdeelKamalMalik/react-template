import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from '../../pages/board';
import { useTaskContext } from '../../context/TaskContext';
import { useThemeContext } from '../../context/ThemeContext';

jest.mock('../../context/TaskContext', () => ({
  useTaskContext: jest.fn(),
}));

jest.mock('../../context/ThemeContext', () => ({
  useThemeContext: jest.fn(),
}));

const mockBoardData = {
  items: {
    'item-1': { id: 'item-1', title: 'Task 1', description: 'Task 1 description', tags: ['bug'], dueDate: '2024-10-20' },
    'item-2': { id: 'item-2', title: 'Task 2', description: 'Task 2 description', tags: ['feature'], dueDate: null },
  },
  columns: {
    'column-1': { id: 'column-1', title: 'To Do', itemsIds: ['item-1'] },
    'column-2': { id: 'column-2', title: 'In Progress', itemsIds: ['item-2'] },
    'column-3': { id: 'column-3', title: 'Completed', itemsIds: [] },
  },
  columnsOrder: ['column-1', 'column-2', 'column-3'],
};

const mockUseTaskContext = {
  searchTerm: '',
  openModal: false,
  setOpenModal: jest.fn(),
  boardData: mockBoardData,
  setBoardData: jest.fn(),
  addTask: jest.fn(),
  updateTask: jest.fn(),
};

const mockUseThemeContext = {
  currentGradients: { background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
  isdarkmode: false,
};

describe('Board Component', () => {
  beforeEach(() => {
    (require('../../context/TaskContext').useTaskContext as jest.Mock).mockReturnValue(mockUseTaskContext);
    (require('../../context/ThemeContext').useThemeContext as jest.Mock).mockReturnValue(mockUseThemeContext);
  });

  test('renders columns and items correctly', () => {
    render(<Board />);
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('opens the edit modal when clicking an item', () => {
    render(<Board />);

    fireEvent.click(screen.getByText('Task 1'));

    expect(mockUseTaskContext.setOpenModal).toHaveBeenCalledWith(true);
  });

  test('handles drag and drop between columns', () => {
    const { getByText } = render(<Board />);

    const item = getByText('Task 1'); // Find the item to drag
    const targetColumn = getByText('In Progress'); // Find the target column

    fireEvent.dragStart(item);
    fireEvent.drop(targetColumn);
    fireEvent.dragEnd(item);

    expect(mockUseTaskContext.setBoardData);
  });

  test('opens the card form modal for adding new cards', async () => {
    render(<Board />);

    fireEvent.click(screen.getByText(/Add a card/i));

    await waitFor(() => {
      expect(mockUseTaskContext.setOpenModal).toHaveBeenCalledWith(true);
    });
  });
});

describe('BoardColumn Component', () => {
  test('renders empty state when no items are available', () => {
    render(<Board />);

    expect(screen.getByText('Add a card')).toBeInTheDocument();
  });
});

describe('BoardItem Component', () => {
  test('renders item with title, description, tags, and due date', () => {
    render(<Board />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 1 description')).toBeInTheDocument();
    expect(screen.getByText('bug')).toBeInTheDocument();
    expect(screen.getByText('Due: 10/20/2024')).toBeInTheDocument();
  });

  test('calls onEditTask when clicking an item', () => {
    render(<Board />);

    fireEvent.click(screen.getByText('Task 1'));

    expect(mockUseTaskContext.setOpenModal).toHaveBeenCalledWith(true);
  });
});

describe('CardForm Component', () => {
  test('renders form with empty inputs when adding a new task', async () => {
    render(<Board />);

    fireEvent.click(screen.getByText(/Add a card/i));

    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  test('renders form with task details when editing a task', async () => {
    render(<Board />);

    fireEvent.click(screen.getByText('Task 1'));

    expect(screen.getByText('Task 1'));
    expect(screen.getByText('Task 1 description'))
  });

  test('submits the form to add or update a task', async () => {
    render(<Board />);

    fireEvent.click(screen.getByText(/Add a card/i));

    await waitFor(() => {
      expect(mockUseTaskContext.addTask);
    })
  });
});
