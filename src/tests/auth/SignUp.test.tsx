import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'; // Use BrowserRouter to wrap the component
import Signup from '../../pages/auth/SignUp';
import { AuthProvider } from '../../context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';

// Mocking useAuth and navigate
const mockedSignup = jest.fn();
const mockedNavigate = jest.fn();

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    signup: mockedSignup,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('SignUp Component', () => {
  beforeEach(() => {
    mockedSignup.mockClear();
    mockedNavigate.mockClear();
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>); // Wrap the component with BrowserRouter
  };

  it('renders the SignUp form correctly', () => {
    renderWithRouter(<Signup />);

    // Check if form fields are rendered
    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('shows validation errors if fields are empty', async () => {
    renderWithRouter(<Signup />);

    // Try submitting the form without filling in the fields
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // Check if validation errors are displayed
    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  it('calls signup function with correct data on valid form submission', async () => {
    renderWithRouter(<Signup />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // Check if the signup function is called with correct arguments
    await waitFor(() => {
      expect(mockedSignup).toHaveBeenCalledWith('john.doe@example.com', 'password123', 'John', 'Doe');
    });
  });

  it('navigates to the login page on successful signup', async () => {
    mockedSignup.mockResolvedValue(true); // Simulate successful signup

    renderWithRouter(<Signup />);

    // Fill in the form and submit
    fireEvent.change(screen.getByPlaceholderText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // Wait for the signup to complete and check if navigation to login happens
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('shows an error if signup fails', async () => {
    mockedSignup.mockResolvedValue(false); // Simulate signup failure

    renderWithRouter(<Signup />);

    // Fill in the form and submit
    fireEvent.change(screen.getByPlaceholderText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // Wait for the signup to fail and check if any error message is displayed
    await waitFor(() => {
      expect(mockedNavigate).not.toHaveBeenCalled();
    });
  });
});
