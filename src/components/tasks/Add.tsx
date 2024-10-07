import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import TaskForm from './Form';

import { ROOT_ROUTE } from '../../constants';
import { TaskFormValues, TaskStatus } from '../../types';
import { useTaskContext } from '../../context/TaskContext';

const AddTaskComponent: FC = () => {
  const navigate = useNavigate()
  const { addTask } = useTaskContext();

  const handleAddTask = ({ status, title }: TaskFormValues) => {
    addTask(title, status as TaskStatus);
    navigate(ROOT_ROUTE)
  };

  return (
    <TaskForm
      defaultValues={{ title: '', status: 'pending' }}
      onSubmit={handleAddTask}
    />
  );
};

export default AddTaskComponent;
