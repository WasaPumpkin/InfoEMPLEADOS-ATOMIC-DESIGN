//src/services/userService.tsx
import axios from 'axios';

const API_URL = '/api/users'; // Base URL for user-related endpoints

// Fetch a single user by ID
export const getUserById = async (userId: string) => {
  const token = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!).token
    : null;

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await axios.get(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};