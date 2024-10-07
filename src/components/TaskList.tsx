import { FC } from 'react';
import { List, ListItem, ListItemText, IconButton, Container } from '@mui/material';
import { Delete } from '@mui/icons-material'

import { useTaskContext } from '../context/TaskContext';

const TaskList: FC = () => {
  const { tasks, removeTask } = useTaskContext();

  return (
    <Container>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <ListItemText primary={task.title} />
            <IconButton edge="end" aria-label="delete" onClick={() => removeTask(task.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskList;
