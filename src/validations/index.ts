import * as yup from 'yup';
import { TITLE, STATUS, DESCRIPTION } from '../constants';

const requiredMessage = (field: string) => `${field} is required`;

export const TaskSchema = yup.object().shape({
  title: yup.string().required(requiredMessage(TITLE)),
  status: yup.string().required(requiredMessage(STATUS)),
});

export const CardSchema = yup.object().shape({
  title: yup.string().required(requiredMessage(TITLE)),
  description: yup.string().required(requiredMessage(DESCRIPTION)),
  tags: yup.string(),
});
