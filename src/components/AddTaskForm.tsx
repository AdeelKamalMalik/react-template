// src/components/AddTaskForm.tsx
import { FC } from 'react';
import { TextField, Button, Container } from '@mui/material';

import { useTaskContext } from '../context/TaskContext';
import { ADD_TASK, NEW_TASK } from '../constants';

const AddTaskForm: FC = () => {
  const { addTask, newTask, setNewTask } = useTaskContext();

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask) {
      addTask(newTask);
      setNewTask('');
    }
  };

  return (
    <Container>
      <form onSubmit={handleAddTask}>
        <TextField
          label={NEW_TASK}
          variant="outlined"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {ADD_TASK}
        </Button>
      </form>
    </Container>
  );
};

export default AddTaskForm;
