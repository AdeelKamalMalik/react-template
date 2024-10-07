import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TaskForm from './Form';

import { ROOT_ROUTE } from '../../constants';
import { TaskFormValues, TaskStatus } from '../../types';
import { useTaskContext } from '../../context/TaskContext';

const EditTaskComponent: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()

  const { tasks, updateTask } = useTaskContext();
  const task = tasks.find((task) => task.id.toString() === id);

  const handleUpdateTask = ({ status, title }: TaskFormValues) => {
    if (task) {
      updateTask({ ...task, ...{ status: status as TaskStatus, title } });
      navigate(ROOT_ROUTE)
    }
  };

  return (
    <TaskForm
      defaultValues={{ title: task?.title || '', status: task?.status || 'pending' }}
      onSubmit={handleUpdateTask}
    />
  );
};

export default EditTaskComponent;
