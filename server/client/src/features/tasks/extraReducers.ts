// // features/tasks/extraReducers.ts
// // features/tasks/extraReducers.ts
// import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
// import { TaskState } from './types';
// import {
//   fetchTasks,
//   createTask,
//   deleteTask,
//   completeTask,
//   editTask,
// } from './taskThunks';
// import { handleTaskMutation } from './extraReducersHelpers';

// export const extraReducers = (builder: ActionReducerMapBuilder<TaskState>) => {
//   // Fetch tasks
//   builder
//     .addCase(fetchTasks.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(fetchTasks.fulfilled, (state, action) => {
//       state.loading = false;
//       state.tasks = action.payload;
//     })
//     .addCase(fetchTasks.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });

//   // Create task
//   handleTaskMutation(builder, createTask, (state, payload) => {
//     state.tasks.unshift(payload);
//   });

//   // Delete task
//   handleTaskMutation(builder, deleteTask, (state, payload) => {
//     state.tasks = state.tasks.filter((t) => t._id !== payload);
//   });

//   // Complete task
//   handleTaskMutation(builder, completeTask, (state, payload) => {
//     const index = state.tasks.findIndex((t) => t._id === payload._id);
//     if (index !== -1) state.tasks[index] = payload;
//   });

//   // Edit task
//   handleTaskMutation(builder, editTask, (state, payload) => {
//     const index = state.tasks.findIndex((t) => t._id === payload._id);
//     if (index !== -1) state.tasks[index] = payload;
//   });
// };

// features/tasks/extraReducers.ts
// features/tasks/extraReducers.ts
// features/tasks/extraReducers.ts
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { TaskState } from './types';
import { fetchTasks } from './taskThunks';

export const extraReducers = (builder: ActionReducerMapBuilder<TaskState>) => {
  builder
    .addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload.tasks; // Update tasks
      state.page = action.payload.page; // Update current page
      state.limit = action.payload.limit; // Update tasks per page
      state.totalPages = action.payload.totalPages; // Update total pages
      state.totalTasks = action.payload.totalTasks; // Update total tasks
    })
    .addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
};