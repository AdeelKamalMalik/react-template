export type TaskStatus = 'pending' | 'in-progress' | 'done';

export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
}

export type TaskContextProps = {
  tasks: Task[];
  addTask: (title: string, status: TaskStatus) => void;
  updateTask: (task: Task) => void;
  removeTask: (id: number) => void;
}

export type ThemeContextProps = {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export type WithAuthProps = {
  isAuthenticated: boolean;
}

export type Option = {
  label: string;
  value: string
}

export type TaskFormProps = {
  defaultValues: TaskFormValues;
  onSubmit: (data: TaskFormValues) => void;
}

export type TaskFormValues = {
  title: string;
  status: string;
}

export  type Item = {
  id: string
  content: string
}

export  type Column = {
  id: string
  title: string
  itemsIds: string[] // Array of item ids
}

export  type BoardData = {
  items: Record<string, Item>
  columns: Record<string, Column>
  columnsOrder: string[] // Array of column ids
}