import { BoardData, Option } from '../types'


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

export const INITIAL_BOARD_DATA: BoardData = {
  items: {
    'item-1': { id: 'item-1', content: 'Content of item 1.'},
    'item-2': { id: 'item-2', content: 'Content of item 2.'},
    'item-3': { id: 'item-3', content: 'Content of item 3.'},
    'item-4': { id: 'item-4', content: 'Content of item 4.'},
    'item-5': { id: 'item-5', content: 'Content of item 5.'},
    'item-6': { id: 'item-6', content: 'Content of item 6.'},
    'item-7': { id: 'item-7', content: 'Content of item 7.'}
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Column 1',
      itemsIds: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7']
    },
    'column-2': {
      id: 'column-2',
      title: 'Column 2',
      itemsIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Column 3',
      itemsIds: []
    },
    'column-4': {
      id: 'column-4',
      title: 'Column 4',
      itemsIds: []
    }
  },
  columnsOrder: ['column-1', 'column-2', 'column-3', 'column-4']
}

/* ---------------------------------------------------
|                  Messages and Alerts                |
-----------------------------------------------------*/
export const TASK_CONTEXT_ERROR = "useTaskContext must be used within a TaskProvider"
export const THEME_CONTEXT_ERROR = "useThemeContext must be used within a ThemeProvider"
export const YOU_MUST_BE_AUTHENTICATED = "You must be logged in to view this page."
export const NO_TASK_IS_AVAILABLE = "No tasks available. Please add a new task."
