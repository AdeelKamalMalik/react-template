import { FC, Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './routes';

import { LOADING, TASK_MANAGER } from './constants';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';

const ThemeToggleButton = lazy(() => import('./components/common/ThemeToggleButton'));

const App: FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <TaskProvider>
          <div className="app-container">
            <Suspense fallback={<div>{LOADING}</div>}>
              <ThemeToggleButton />
              <h1>{TASK_MANAGER}</h1>

              <AppRoutes />
            </Suspense>
          </div>
        </TaskProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
