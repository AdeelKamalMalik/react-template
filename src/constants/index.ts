import { Option } from '../types'


/* ---------------------------------------------------
|                       Routes                        |
-----------------------------------------------------*/
export const ROOT_ROUTE = '/'
export const ADD_TASK_ROUTE = '/add-task'


/* ---------------------------------------------------
|                  Strings Literals                   |
-----------------------------------------------------*/
export const TITLE = "Title"
export const STATUS = "Status"
export const NEW_TASK = "New Task"
export const ADD_TASK = "Add Task"
export const TASK_TITLE = "Task Title"
export const UPDATE_TASK = "Update Task"
export const TASK_MANAGER = "Task Manager"
export const LOADING = "Loading..."


/* ---------------------------------------------------
|                  Lists and Enums                    |
-----------------------------------------------------*/
export enum Theme {
	DARK = 'dark',
	LIGHT = 'light'
}

export const TASK_STATUS: Option[] = [
	{ label: 'Pending', value: 'pending' },
	{ label: 'in-progress', value: 'In Progress' },
	{ label: 'done', value: 'Done' }
]


/* ---------------------------------------------------
|                  Messages and Alerts                |
-----------------------------------------------------*/
export const TASK_CONTEXT_ERROR = "useTaskContext must be used within a TaskProvider"
export const THEME_CONTEXT_ERROR = "useThemeContext must be used within a ThemeProvider"
export const YOU_MUST_BE_AUTHENTICATED = "You must be logged in to view this page."
export const NO_TASK_IS_AVAILABLE = "No tasks available. Please add a new task."
