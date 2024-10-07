import * as yup from 'yup';
import { TITLE, STATUS } from '../constants';

const requiredMessage = (field: string) => `${field} is required`;

export const TaskSchema = yup.object().shape({
  title: yup.string().required(requiredMessage(TITLE)),
  status: yup.string().required(requiredMessage(STATUS)),
});
