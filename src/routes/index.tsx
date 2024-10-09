import React, { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loader from '../components/common/Loader';
import { ADD_TASK_ROUTE, ROOT_ROUTE } from '../constants';

// const TaskList = lazy(() => import('../pages/tasks/Listing'));
const AddTask = lazy(() => import('../pages/tasks/Add'));
const EditTask = lazy(() => import('../pages/tasks/Edit'));
const Board = lazy(() => import('../pages/board'));

const AppRoutes: FC = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route path={ROOT_ROUTE} element={<Board />} />
        {/* <Route path={ROOT_ROUTE} element={<TaskList />} /> */}
        <Route path={ADD_TASK_ROUTE} element={<AddTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
