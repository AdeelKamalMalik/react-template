
import { BoardData, Option, TagColors } from '../types'


/* ---------------------------------------------------
|                       Routes                        |
-----------------------------------------------------*/
export const ROOT_ROUTE = '/'
export const LOGIN_ROUTE = '/login'
export const SIGN_UP_ROUTE = '/sign-up'
export const ADD_TASK_ROUTE = '/add-task'


/* ---------------------------------------------------
|                  Strings Literals                   |
-----------------------------------------------------*/
export const EMAIL = "Email"
export const LOGIN = "Login"
export const TITLE = "Title"
export const STATUS = "Status"
export const LOGOUT = "Logout"
export const SEARCH = "Search"
export const TASK_TAGS = "Tags"
export const SIGN_UP = "Sign Up"
export const NEW_TASK = "New Task"
export const ADD_TASK = "Add Task"
export const PASSWORD = "Password"
export const ADD_CARD = "Add Card"
export const LOADING = "Loading..."
export const LAST_NAME = "Last Name"
export const FIRST_NAME = "First Name"
export const TASK_TITLE = "Task Title"
export const SEARCH_TEXT = "Search..."
export const TASK_BOARD = "Task Board"
export const USER_AVATAR = "User Avatar"
export const UPDATE_TASK = "Update Task"
export const DESCRIPTION = "Description"
export const TASK_MANAGER = "Task Manager"
export const JOIN_BOARD = "Join Task Board"
export const INVALID_EMAIL  = "Invalid Email"
export const MODAL_TITLE_ADD = "Add New Task"
export const MODAL_TITLE_UPDATE = "Update Task"
export const USER_NOT_FOUND = "User not found!";
export const TASK_DESCRIPTION = "Task Description"
export const INVALID_PASSWORD = "Invalid password!";
export const WELCOME_TO_BOARD = "Welcome to Task Board";
export const DO_NOT_HAVE_ACCOUNT = "Don’t have an account?  "
export const ALREADY_HAVE_ACCOUNT = "Already have an account?  "
export const PLEASE_LOGIN_TO_CONTINUE = "Please login to continue managing your tasks"
export const CREATE_YOUR_ACCOUNT = "Create your account to start managing tasks efficiently"

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

export const TAG_OPTIONS = [
  'bug',
  'urgent',
  'design',
  'feature',
  'devops',
  'automation',
  'testing',
  'UI',
  'marketing',
  'research',
  'payment'
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
      itemsIds: ['item-1', 'item-2']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      itemsIds: ['item-3', 'item-4']
    },
    'column-3': {
      id: 'column-3',
      title: 'Review',
      itemsIds: ['item-5']
    },
    'column-4': {
      id: 'column-4',
      title: 'Done',
      itemsIds: ['item-6', 'item-7']
    }
  },
  columnsOrder: ['column-1', 'column-2', 'column-3', 'column-4']
}


/* ---------------------------------------------------
|                  Messages and Alerts                |
-----------------------------------------------------*/
export const USER_ALREADY_EXIST = 'User already exists!'
export const USER_REGISTER_SUCCESSFULLY = 'User registered successfully!'
export const NO_TASK_IS_AVAILABLE = "No tasks available. Please add a new task."
export const PASSWORD_VALIDATION_MESSAGE = 'Password must be at least 6 characters'
export const YOU_MUST_BE_AUTHENTICATED = "You must be logged in to view this page."
export const TASK_CONTEXT_ERROR = "useTaskContext must be used within a TaskProvider"
export const AUTH_CONTEXT_PROVIDER_ERROR = 'useAuth must be used within an AuthProvider'
export const THEME_CONTEXT_ERROR = "useThemeContext must be used within a ThemeProvider"