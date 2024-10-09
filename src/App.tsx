import { FC, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './routes';

import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header';
import styled from 'styled-components';
import Loader from './components/common/Loader';
import { useThemeContext } from './context/ThemeContext';

const AppContainer = styled.div<{ gradient: string }>`
  min-height: 100vh;
  background: ${({ gradient }) => gradient};
  padding: 16px;
`;

const App: FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <TaskProvider>
          <InnerApp />
        </TaskProvider>
      </Router>
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
