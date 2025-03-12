// //features/tasks/initialState.ts
// import { TaskState } from './types';

// // Retrieve tasks from localStorage if available
// const tasksFromStorage = localStorage.getItem('tasks')
//   ? JSON.parse(localStorage.getItem('tasks')!)
//   : [];

// // Define the initial state
// const initialState: TaskState = {
//   tasks: tasksFromStorage,
//   loading: false,
//   error: null,
// };

// // Export the initial state as default
// export default initialState;


//features/tasks/initialState.ts
// import { TaskState } from './types';

// // Retrieve tasks from localStorage if available
// const tasksFromStorage = localStorage.getItem('tasks')
//   ? JSON.parse(localStorage.getItem('tasks')!)
//   : [];

// // Define the initial state
// // features/tasks/initialState.ts
// const initialState = {
//   tasks: [] as Task[], // List of tasks
//   page: 1, // Current page
//   limit: 10, // Tasks per page
//   totalPages: 1, // Total number of pages
//   totalTasks: 0, // Total number of tasks
//   loading: false,
//   error: null as string | null,
// };
// // Export the initial state as default
// export default initialState;

// features/tasks/initialState.ts
// features/tasks/initialState.ts
import { TaskState } from './types';

const initialState: TaskState = {
  tasks: [], // List of tasks
  page: 1, // Current page
  limit: 10, // Tasks per page
  totalPages: 1, // Total number of pages
  totalTasks: 0, // Total number of tasks
  loading: false,
  error: null,
};

export default initialState;