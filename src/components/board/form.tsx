import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

import InputController from '../../controllers/Input';

import { Tag } from '../../types';
import { CardSchema } from '../../validations';
import { useTaskContext } from '../../context/TaskContext';
import { useThemeContext } from '../../context/ThemeContext';
import {
  TASK_TITLE,
  TASK_DESCRIPTION,
  TASK_TAGS,
  ADD_TASK,
  UPDATE_TASK,
  MODAL_TITLE_ADD,
  MODAL_TITLE_UPDATE,
  TAG_OPTIONS,
} from '../../constants';

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

const ModalContent = styled.div<{ isDarkMode: boolean }>`
  background: ${(props) => (props.isDarkMode ? '#2c2c2c' : 'white')};
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled(IconButton)`
  background-color: red;
  color: white;
  &:hover {
    background-color: darkred;
  }
  width: 36px;
  height: 36px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button<{ isDarkMode: boolean }>`
  padding: 10px;
  background: ${(props) => (props.isDarkMode ? '#007bff' : '#007bff')};
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
  const { isDarkMode } = useThemeContext()
  const { addTask, updateTask } = useTaskContext();
  const [availableTags] = useState<string[]>(TAG_OPTIONS);

  const methods = useForm({
    resolver: yupResolver(CardSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: task ? task.tags : ['bug'],
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        tags: task.tags,
      });
    } else {
      reset({
        title: '',
        description: '',
        tags: [],
      });
    }
  }, [task, reset]);

  const onSubmit: SubmitHandler<{ title: string; description: string; tags: (string | undefined)[] }> = (data) => {
    const tagArray = data.tags.filter((tag): tag is string => tag !== undefined);

    if (task) {
      updateTask({ ...task, title: data.title, description: data.description, tags: tagArray as Tag[] });
    } else {
      addTask(data.title, data.description, tagArray as Tag[]);
    }

    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent isDarkMode={isDarkMode}> 
        <ModalHeader>
          <ModalTitle>{task ? MODAL_TITLE_UPDATE : MODAL_TITLE_ADD}</ModalTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>
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
              type="autocomplete"
              options={availableTags}
              freeSolo={true}
            />

            <Button type="submit" isDarkMode={isDarkMode}>{task ? UPDATE_TASK : ADD_TASK}</Button>
          </TaskForm>
        </FormProvider>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CardForm;
