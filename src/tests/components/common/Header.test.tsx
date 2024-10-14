// Header.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../../components/common/Header';
import { BrowserRouter } from 'react-router-dom';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

jest.mock('../../../context/AuthContext', () => ({
  useAuth: () => ({
    logout: jest.fn(),
  }),
}));

jest.mock('../../../context/TaskContext', () => ({
  useTaskContext: () => ({
    setSearchTerm: jest.fn(),
    setOpenModal: jest.fn(),
  }),
}));

// Mock ThemeContext with different theme scenarios
jest.mock('../../../context/ThemeContext', () => ({
  useThemeContext: jest.fn(() => ({
    isDarkMode: false,
    toggleTheme: jest.fn(),
    currentGradients: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    },
  })),
}));

describe('Header Component with Light Mode', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the Header component without user information in light mode', () => {
    render(<Header />);

    // Check for elements specific to light mode (if applicable)
    expect(screen.queryByText(/john doe/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /add card/i })).not.toBeInTheDocument();
  });

  it('renders the Header component with user information in light mode', () => {
    localStorage.setItem(
      'user',
      JSON.stringify({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' })
    );

    render(<Header />);

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add card/i })).toBeInTheDocument();
  });
});

// Updating mock to simulate dark mode
jest.mock('../../../context/ThemeContext', () => ({
  useThemeContext: jest.fn(() => ({
    isDarkMode: true,
    toggleTheme: jest.fn(),
    currentGradients: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)',
    },
  })),
}));

describe('Header Component with Dark Mode', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the Header component without user information in dark mode', () => {
    render(<Header />);

    expect(screen.queryByText(/john doe/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /add card/i })).not.toBeInTheDocument();
  });

  it('renders the Header component with user information in dark mode', () => {
    localStorage.setItem(
      'user',
      JSON.stringify({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' })
    );

    render(<Header />);

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add card/i })).toBeInTheDocument();
  });

  it('displays the background gradient correctly in dark mode', () => {
    render(<Header />);

    const appBar = screen.getByRole('banner');
    expect(appBar).toHaveStyle(
      'background: linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)'
    );
  });
});
