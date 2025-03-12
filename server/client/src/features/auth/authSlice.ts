//features/auth/authSlice.tsx
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios, { AxiosError } from 'axios';

// // Define the API URL
// // const API_URL = 'https://infoempleados-3q11.onrender.com/api/users'; // Production backend API URL
// const API_URL = 'http://localhost:7000/api/users'; // Local backend API URL

// // Define the UserInfo interface
// interface UserInfo {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   token: string;
// }

// // Define the AuthState interface
// interface AuthState {
//   userInfo: UserInfo | null;
//   loading: boolean;
//   error: string | null;
// }

// // Retrieve user info from localStorage if available
// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo')!)
//   : null;

// // Define the initial state
// const initialState: AuthState = {
//   userInfo: userInfoFromStorage,
//   loading: false,
//   error: null,
// };

// // Define the LoginCredentials interface
// interface LoginCredentials {
//   email: string;
//   password: string;
// }

// // Define the RegisterCredentials interface
// interface RegisterCredentials {
//   name: string;
//   email: string;
//   password: string;
//   role: string;
// }

// // Define the loginUser async thunk
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, {
//         email,
//         password,
//       });
//       localStorage.setItem('userInfo', JSON.stringify(response.data));
//       return response.data as UserInfo;
//     } catch (error) {
//       const axiosError = error as AxiosError<{ message: string }>;
//       return rejectWithValue(
//         axiosError.response?.data?.message || axiosError.message
//       );
//     }
//   }
// );

// // Define the registerUser async thunk
// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (
//     { name, email, password, role }: RegisterCredentials,
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(API_URL, {
//         name,
//         email,
//         password,
//         role,
//       });
//       localStorage.setItem('userInfo', JSON.stringify(response.data));
//       return response.data as UserInfo;
//     } catch (error) {
//       const axiosError = error as AxiosError<{ message: string }>;
//       return rejectWithValue(
//         axiosError.response?.data?.message || axiosError.message
//       );
//     }
//   }
// );

// // Define the rejected payload type
// type RejectedPayload = string | undefined;

// // Create the auth slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout(state) {
//       state.userInfo = null;
//       localStorage.removeItem('userInfo');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login Cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         loginUser.fulfilled,
//         (state, action: PayloadAction<UserInfo>) => {
//           state.loading = false;
//           state.userInfo = action.payload;
//         }
//       )
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           (action.payload as RejectedPayload) ??
//           'An error occurred during login.';
//       })
//       // Register Cases
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         registerUser.fulfilled,
//         (state, action: PayloadAction<UserInfo>) => {
//           state.loading = false;
//           state.userInfo = action.payload;
//         }
//       )
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           (action.payload as RejectedPayload) ??
//           'An error occurred during registration.';
//       });
//   },
// });

// // Export the logout action
// export const { logout } = authSlice.actions;

// // Export the auth reducer
// export default authSlice.reducer;


//features/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { logoutReducer } from './reducers';
import { extraReducers } from './extraReducers';

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: logoutReducer,
  },
  extraReducers,
});

// Export the logout action
export const { logout } = authSlice.actions;

// Export the auth reducer
export default authSlice.reducer;