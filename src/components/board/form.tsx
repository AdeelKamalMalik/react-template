import { FC, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

import InputController from '../../controllers/Input';

import { CardFormProps, Tag } from '../../types';
import { CardSchema } from '../../validations';
import { useTaskContext } from '../../context/TaskContext';
import { useThemeContext } from '../../context/ThemeContext';
import {
  ModalOverlay, ModalContent, ModalHeader, ModalTitle, CloseButton, TaskForm, Button
} from './styles';
import {
  TASK_TITLE, TASK_DESCRIPTION, TASK_TAGS, ADD_TASK, UPDATE_TASK, MODAL_TITLE_ADD,
  MODAL_TITLE_UPDATE, TAG_OPTIONS
} from '../../constants';

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
