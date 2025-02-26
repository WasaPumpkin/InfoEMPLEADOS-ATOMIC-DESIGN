//features/tasks/taskSlice.tsx
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../store'; // Adjust the path to your store file

// Define the API URL
const API_URL = 'http://localhost:7000/api/tasks'; // Local backend API URL
// const API_URL = 'https://infoempleados-3q11.onrender.com/api/tasks'; // Production backend API URL

// Define the Task interface
export interface Task {
  _id: string;
  text: string;
  assignedTo: string;
  status: string;
  completedAt?: string;
  completionMessage?: string;
}

// Define the TaskState interface
export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

// Define the CreateTaskPayload interface
export interface CreateTaskPayload {
  text: string;
  assignedTo: string;
}

// Define the CompleteTaskPayload interface
export interface CompleteTaskPayload {
  taskId: string;
  completionMessage: string;
}

// Define the initial state
const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Define the fetchTasks async thunk
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState; // Access the auth state with proper typing
      const config = {
        headers: { Authorization: `Bearer ${auth.userInfo?.token}` },
      };
      const response = await axios.get(API_URL, config);
      return response.data as Task[];
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);

// Define the createTask async thunk
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (
    { text, assignedTo }: CreateTaskPayload,
    { getState, rejectWithValue }
  ) => {
    try {
      const { auth } = getState() as RootState; // Access the auth state with proper typing
      const config = {
        headers: { Authorization: `Bearer ${auth.userInfo?.token}` },
      };
      const response = await axios.post(API_URL, { text, assignedTo }, config);
      return response.data as Task;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);

// Define the deleteTask async thunk
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState; // Access the auth state with proper typing
      const config = {
        headers: { Authorization: `Bearer ${auth.userInfo?.token}` },
      };
      await axios.delete(`${API_URL}/${taskId}`, config);
      return taskId;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);

// Define the completeTask async thunk
export const completeTask = createAsyncThunk(
  'tasks/completeTask',
  async (
    { taskId, completionMessage }: CompleteTaskPayload,
    { getState, rejectWithValue }
  ) => {
    try {
      const { auth } = getState() as RootState; // Access the auth state with proper typing
      const config = {
        headers: { Authorization: `Bearer ${auth.userInfo?.token}` },
      };
      const response = await axios.put(
        `${API_URL}/${taskId}/complete`,
        { completionMessage },
        config
      );
      return response.data as Task;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);

// Create the task slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to fetch tasks.';
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to create task.';
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to delete task.';
      })
      // Complete task
      .addCase(completeTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(completeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to complete task.';
      });
  },
});

export default taskSlice.reducer;