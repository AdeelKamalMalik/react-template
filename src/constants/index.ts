
import { BoardData, Option, TagColors } from '../types'


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
export const TASK_BOARD = "Task Board"
export const SEARCH = "Search"
export const SEARCH_TEXT = "Search..."
export const USER_AVATAR = "User Avatar"
export const ADD_CARD = "Add Card"


/* ---------------------------------------------------
|                  Lists and Enums                    |
-----------------------------------------------------*/
export enum Theme {
	DARK = 'dark',
	LIGHT = 'light'
}

export const TAG_COLORS: TagColors = {
  bug: "#e53935",
  urgent: "#ff0000",
  design: "#ffb300",
  feature: "#4caf50",
  devops: "#2196F3",
  automation: "#3f51b5",
  testing: "#9c27b0",
  UI: "#ff4081",
  marketing: "#ffc107",
  research: "#673ab7",
  payment: "#795548",
};

export const TASK_STATUS: Option[] = [
	{ label: 'Pending', value: 'pending' },
	{ label: 'In-progress', value: 'In Progress' },
	{ label: 'Done', value: 'Done' }
]

export const INITIAL_BOARD_DATA: BoardData = {
  items: {
    'item-1': {
      id: 'item-1',
      title: 'Fix Login Bug',
      description: 'Users are unable to log in using Google OAuth. Investigate and fix the issue.',
      tags: ['bug', 'urgent'],
      dueDate: '2024-10-15',
      priority: 'high'
    },
    'item-2': {
      id: 'item-2',
      title: 'Design New Landing Page',
      description: 'Create a new landing page design for the upcoming product launch. Ensure it is mobile-friendly.',
      tags: ['design', 'feature'],
      dueDate: '2024-11-01',
      priority: 'medium'
    },
    'item-3': {
      id: 'item-3',
      title: 'Set Up CI/CD Pipeline',
      description: 'Automate deployment and testing processes by setting up a continuous integration and deployment pipeline.',
      tags: ['devops', 'automation'],
      dueDate: '2024-10-25',
      priority: 'high'
    },
    'item-4': {
      id: 'item-4',
      title: 'Write Unit Tests for Auth Module',
      description: 'Increase the test coverage of the authentication module by adding unit tests.',
      tags: ['testing'],
      dueDate: '2024-10-18',
      priority: 'medium'
    },
    'item-5': {
      id: 'item-5',
      title: 'Update User Profile UI',
      description: 'Revamp the user profile UI to make it more user-friendly and responsive.',
      tags: ['UI', 'feature'],
      dueDate: '2024-10-30',
      priority: 'low'
    },
    'item-6': {
      id: 'item-6',
      title: 'Create Marketing Email Template',
      description: 'Design a reusable marketing email template for newsletters and announcements.',
      tags: ['marketing', 'design'],
      dueDate: '2024-11-05',
      priority: 'low'
    },
    'item-7': {
      id: 'item-7',
      title: 'Research Payment Gateway Options',
      description: 'Compare payment gateway providers and make recommendations for the best solution.',
      tags: ['research', 'payment'],
      dueDate: '2024-10-20',
      priority: 'medium'
    }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      itemsIds: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      itemsIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Review',
      itemsIds: []
    },
    'column-4': {
      id: 'column-4',
      title: 'Done',
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