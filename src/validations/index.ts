import * as yup from 'yup';
import {
  TITLE, STATUS, DESCRIPTION, FIRST_NAME, LAST_NAME, EMAIL, INVALID_EMAIL,
  PASSWORD_VALIDATION_MESSAGE, PASSWORD, TASK_TAGS
} from '../constants';

const requiredMessage = (field: string) => `${field} is required`;

export const TaskSchema = yup.object().shape({
  title: yup.string().required(requiredMessage(TITLE)),
  status: yup.string().required(requiredMessage(STATUS)),
});

export const CardSchema = yup.object().shape({
  title: yup.string().required(requiredMessage(TITLE)),
  description: yup.string().required(requiredMessage(DESCRIPTION)),
  tags: yup.array().of(yup.string().trim()).required(requiredMessage(TASK_TAGS))
});

export const SignupSchema = yup.object().shape({
  firstName: yup.string().required(requiredMessage(FIRST_NAME)),
  lastName: yup.string().required(requiredMessage(LAST_NAME)),
  email: yup.string().email(INVALID_EMAIL).required(requiredMessage(EMAIL)),
  password: yup.string().min(6, PASSWORD_VALIDATION_MESSAGE).required(requiredMessage(PASSWORD)),
});

export const LoginSchema = yup.object().shape({
  email: yup.string().email(INVALID_EMAIL).required(requiredMessage(EMAIL)),
  password: yup.string().min(6, PASSWORD_VALIDATION_MESSAGE).required(requiredMessage(PASSWORD)),
})
