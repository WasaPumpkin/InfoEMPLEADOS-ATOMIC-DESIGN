//components/pages/Dashboard/Dashboard.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../features/store';
import { fetchTasks } from '../../features/tasks/taskSlice';
import TaskForm from '../organisms/TaskForm';
import TaskList from '../organisms/TaskList'; // Correct import path

// Remove the empty interface
const Dashboard: React.FC = () => {
  // Use the typed dispatch so that async thunks work correctly.
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Type the state using RootState
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(fetchTasks());
    }
  }, [userInfo, navigate, dispatch]);

  return (
    <div className="dashboard">
      <main className="dashboard__main">
        <h2 className="dashboard__title">Tareas</h2>
        {error && <div className="dashboard__error">{error}</div>}
        {userInfo && userInfo.role === 'admin' && <TaskForm />}
        {loading ? <p>Loading tasks...</p> : <TaskList tasks={tasks} />}
      </main>
    </div>
  );
};

export default Dashboard;