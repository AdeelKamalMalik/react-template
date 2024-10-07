import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Container,
  Typography,
  Button,
  Chip,
} from '@mui/material';

import { TaskStatus } from '../../types';
import { useTaskContext } from '../../context/TaskContext';
import { ADD_TASK, ADD_TASK_ROUTE, NO_TASK_IS_AVAILABLE } from '../../constants';

const statusColors: Record<TaskStatus, string> = {
  "pending": 'orange',
  "in-progress": 'blue',
  "done": 'green',
};

const TaskListingComponent: FC = () => {
  const { tasks, removeTask } = useTaskContext();
  const navigate = useNavigate();

  const handleAddTask = () => navigate(ADD_TASK_ROUTE);

  const handleEditTask = (id: number) => navigate(`/edit-task/${id}`);

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ marginBottom: 2 }}>
        {ADD_TASK}
      </Button>
      {tasks.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          {NO_TASK_IS_AVAILABLE}
        </Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} divider>
              <ListItemText primary={task.title} />
              <Chip
                label={task.status}
                sx={{
                  backgroundColor: statusColors[task.status],
                  color: 'white',
                  marginLeft: 2,
                }}
              />
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditTask(task.id)}
                sx={{ marginLeft: 2 }}
              >
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => removeTask(task.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default TaskListingComponent;
