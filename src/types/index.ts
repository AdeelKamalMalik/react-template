import { Dispatch, SetStateAction } from "react";

export type Task = {
  id: number;
  title: string;
}

export type TaskContextProps = {
  tasks: Task[];
  newTask: string;
  addTask: (title: string) => void;
  removeTask: (id: number) => void;
  setNewTask: Dispatch<SetStateAction<string>>;
}

export type ThemeContextProps = {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export type WithAuthProps = {
  isAuthenticated: boolean;
}