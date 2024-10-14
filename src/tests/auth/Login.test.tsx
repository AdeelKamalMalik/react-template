import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/auth/Login';
import '@testing-library/jest-dom';

const mockedLogin = jest.fn();

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: mockedLogin,
  }),
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  it('renders the login form and all its components', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to Task Board/i)).toBeInTheDocument();
    expect(screen.getByText(/Please login to continue managing your tasks/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/Don’t have an account\?/i)).toBeInTheDocument();
  });

  it('shows validation errors if fields are empty', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  it('displays validation error for invalid email format', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'invalidemail' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid Email/i)).toBeInTheDocument();
    });
  });

  it('submits form successfully with valid inputs', async () => {
    mockedLogin.mockResolvedValue(true); // Simulate successful signup

    render(<MemoryRouter>
      <Login />
    </MemoryRouter>)

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(window.location.pathname).toBe('/');
    });
  });

  it('redirects to signup page when clicking the signup link', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const signUpLink = screen.getByRole('link', { name: /Sign Up/i });
    expect(signUpLink).toHaveAttribute('href', '/sign-up');
  });
});
