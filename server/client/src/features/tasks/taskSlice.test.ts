// src/features/tasks/taskSlice.test.ts
import { createTask, CreateTaskPayload, Task } from './taskSlice';
import axios from 'axios';

// Mock the axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('createTask async thunk', () => {
  const dummyToken = 'dummy-token';
  const dummyTask: Task = {
    _id: '1',
    text: 'Test Task',
    assignedTo: 'userId',
    status: 'pending',
  };

  // Provide a fake getState that returns an auth state with a token.
  const getState = () => ({
    auth: {
      userInfo: { token: dummyToken },
    },
  });

  it('should create a task successfully', async () => {
    const payload: CreateTaskPayload = {
      text: 'Test Task',
      assignedTo: 'userId',
    };

    // Simulate axios.post resolving with a successful response
    mockedAxios.post.mockResolvedValueOnce({ data: dummyTask });

    const thunk = createTask(payload);
    const dispatch = jest.fn();
    const extraArgument = undefined;

    const result = await thunk(dispatch, getState, extraArgument);

    // Assert axios.post was called with the correct parameters
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:7000/api/tasks',
      payload,
      { headers: { Authorization: `Bearer ${dummyToken}` } }
    );

    // Check that the thunk action was fulfilled and returned the dummyTask
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(dummyTask);

    // Verify that the correct actions were dispatched
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: createTask.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: createTask.fulfilled.type,
        payload: dummyTask,
      })
    );
  });

  it('should reject with an error message on failure', async () => {
    const payload: CreateTaskPayload = {
      text: 'Test Task',
      assignedTo: 'userId',
    };
    const errorMessage = 'Network Error';

    // Simulate axios.post throwing an error
    mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

    const thunk = createTask(payload);
    const dispatch = jest.fn();
    const extraArgument = undefined;

    const result = await thunk(dispatch, getState, extraArgument);

    // The thunk should be rejected and the payload should be the error message
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual(errorMessage);

    // Verify that the correct actions were dispatched
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: createTask.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: createTask.rejected.type,
        payload: errorMessage,
      })
    );
  });
});