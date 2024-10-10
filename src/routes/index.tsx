// routes.tsx
import React, { FC, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from '../components/common/Loader';
import withAuth from '../hoc/withAuth';
import { ADD_TASK_ROUTE, LOGIN_ROUTE, ROOT_ROUTE, SIGN_UP_ROUTE } from '../constants';

const AddTask = lazy(() => import('../pages/tasks/Add'));
const EditTask = lazy(() => import('../pages/tasks/Edit'));
const Board = lazy(() => import('../pages/board'));
const Login = lazy(() => import('../pages/auth/Login'));
const SignUp = lazy(() => import('../pages/auth/SignUp'));

const AppRoutes: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    setIsAuthenticated(!!loggedInUser);
  }, []);

  const ProtectedAddTask = withAuth(AddTask);
  const ProtectedEditTask = withAuth(EditTask);

  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path={ROOT_ROUTE}
          element={
            isAuthenticated ? <Board /> : <Navigate to="/login" />
          }
        />

        <Route
          path={LOGIN_ROUTE}
          element={
            isAuthenticated ? <Navigate to={ROOT_ROUTE} /> : <Login />
          }
        />
        <Route
          path={SIGN_UP_ROUTE}
          element={
            isAuthenticated ? <Navigate to={ROOT_ROUTE} /> : <SignUp />
          }
        />

        <Route path={ADD_TASK_ROUTE} element={<ProtectedAddTask isAuthenticated={isAuthenticated} />} />
        <Route path="/edit-task/:id" element={<ProtectedEditTask isAuthenticated={isAuthenticated} />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
