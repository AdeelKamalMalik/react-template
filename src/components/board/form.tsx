import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useTaskContext } from '../../context/TaskContext';
import {
  TASK_TITLE,
  TASK_DESCRIPTION,
  TASK_TAGS,
  ADD_TASK,
  UPDATE_TASK,
  MODAL_TITLE_ADD,
  MODAL_TITLE_UPDATE,
  CLOSE_BUTTON,
} from '../../constants';
import { Tag } from '../../types';
import { useForm, FormProvider, SubmitHandler} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CardSchema } from '../../validations';
import InputController from '../../controllers/Input';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  float: right;
`;

const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export type CardFormProps = {
  onClose: () => void;
  task?: { id: string; title: string; description: string; tags: string[] };
};

const CardForm: FC<CardFormProps> = ({ onClose, task }) => {
  const { addTask, updateTask } = useTaskContext();

  const methods = useForm({
    resolver: yupResolver(CardSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: '',
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        tags: task.tags.join(','),
      });
    } else {
      reset({
        title: '',
        description: '',
        tags: '',
      });
    }
  }, [task, reset]);

  const onSubmit: SubmitHandler<{ title: string; description: string; tags?: string }> = (data) => {
    const tagArray = data?.tags?.split(',').map(tag => tag.trim());
    if (task) {
      updateTask({ ...task, title: data.title, description: data.description, tags: tagArray as Tag[] });
    } else {
      addTask(data.title, data.description, tagArray as Tag[]);
    }
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>{CLOSE_BUTTON}</CloseButton>
        <h2>{task ? MODAL_TITLE_UPDATE : MODAL_TITLE_ADD}</h2>
        <FormProvider {...methods}>
          <TaskForm onSubmit={handleSubmit(onSubmit)}>
            <InputController
              name="title"
              placeholder={TASK_TITLE}
              type="text"
            />

            <InputController
              name="description"
              placeholder={TASK_DESCRIPTION}
              type="textarea"
            />

            <InputController
              name="tags"
              placeholder={TASK_TAGS}
              type="text"
            />
            <Button type="submit">{task ? UPDATE_TASK : ADD_TASK}</Button>
          </TaskForm>
        </FormProvider>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CardForm;
