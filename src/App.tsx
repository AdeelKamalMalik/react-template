import React, { FC, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './routes';

import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header';
import styled from 'styled-components';
import Loader from './components/common/Loader';
import { useThemeContext } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

const AppContainer = styled.div<{ gradient: string }>`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background: ${({ gradient }) => gradient};
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const App: FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <TaskProvider>
            <InnerApp />
          </TaskProvider>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

const InnerApp: FC = () => {
  const { currentGradients } = useThemeContext();

  return (
    <AppContainer gradient={currentGradients.background}>
      <Suspense fallback={<Loader />}>
        <Header />
        <AppRoutes />
      </Suspense>
    </AppContainer>
  );
};

export default App;
