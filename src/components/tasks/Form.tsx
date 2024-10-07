import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from '@mui/material';

import { TaskSchema } from '../../validations';
import { TaskFormProps, TaskFormValues } from '../../types';
import { TASK_STATUS, STATUS, ADD_TASK, UPDATE_TASK, TASK_TITLE } from '../../constants';

const TaskForm: FC<TaskFormProps> = ({ defaultValues, onSubmit }) => {
  const { id } = useParams<{ id: string }>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: yupResolver(TaskSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('title')}
        label={TASK_TITLE}
        variant="outlined"
        fullWidth
        error={!!errors.title}
        helperText={errors.title ? errors.title.message : ''}
        margin="normal"
      />

      <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.status}>
        <InputLabel>{STATUS}</InputLabel>
        <Select {...register('status')} label={STATUS}>
          {TASK_STATUS.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>

        {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {id ? UPDATE_TASK : ADD_TASK }
      </Button>
    </form>
  );
};

export default TaskForm;
