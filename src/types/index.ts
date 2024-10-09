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
  currentGradients: {
    background: string;
  };

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

export type Priority = 'low' | 'medium' | 'high'

export type Item = {
  id: string
  title: string
  description: string
  tags?: Tag[]
  dueDate?: string
  priority?: Priority
}

export type Column = {
  id: string
  title: string
  itemsIds: string[]
}

export type BoardData = {
  items: Record<string, Item>
  columns: Record<string, Column>
  columnsOrder: string[]
}

export type BoardItemProps = {
  index: number
  item: Item
}

export type BoardItemStylesProps = {
  isdragging: string;
  priority?: Priority
}

export type BoardColumnProps = {
  column: { id: string, title: string, itemsIds: string[] }
  items: Item[]
}

export type BoardColumnContentStylesProps = {
  isdraggingover: string
}

export type Tag =
  | 'bug'
  | 'urgent'
  | 'design'
  | 'feature'
  | 'devops'
  | 'automation'
  | 'testing'
  | 'UI'
  | 'marketing'
  | 'research'
  | 'payment';

export type TagColors = {
  [key in Tag]: string;
};
