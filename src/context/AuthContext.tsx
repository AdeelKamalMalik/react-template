import React, { createContext, useContext, useState, ReactNode } from 'react';
import bcrypt from 'bcryptjs';

import { AuthContextProps, User } from '../types';
import { AUTH_CONTEXT_PROVIDER_ERROR, USER_NOT_FOUND } from '../constants';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error(AUTH_CONTEXT_PROVIDER_ERROR);
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('user');
  });

  const login = async (email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user) => user.email === email);

    if (!user) {
      alert(USER_NOT_FOUND);
    } else if (user && bcrypt.compareSync(password, user.password)) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser: User = { email, password: hashedPassword, firstName, lastName };
  
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      return true
      
    } catch (error) {
      console.log(error)
      return false
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
