// components/pages/Dashboard/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '@features/store'; 
import { fetchTasks, createTask } from '@features/tasks/taskThunks'; 
import TaskForm from '@components/organisms/TaskForm/TaskForm'; 
import TaskList from '@components/organisms/TaskList/TaskList'; 
import Spinner from '@components/atoms/Spinner/Spinner'; 

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Match this with the limit used in your backend

  // Get tasks and pagination metadata from Redux store
  const { tasks, totalPages, totalTasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);

  // Fetch tasks when the page changes or when the user logs in
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(fetchTasks({ page: currentPage, limit: tasksPerPage }));
    }
  }, [userInfo, navigate, dispatch, currentPage, tasksPerPage]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage); // Update the current page
    dispatch(fetchTasks({ page: newPage, limit: tasksPerPage })); // Fetch tasks for the new page
  };

  // Handle task creation
  const handleCreateTask = async (taskData: { text: string; assignedTo: string }) => {
    try {
      await dispatch(createTask(taskData)); // Create the new task
      await dispatch(fetchTasks({ page: currentPage, limit: tasksPerPage })); // Refetch tasks for the current page
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  // Debugging: Log totalTasks, totalPages, tasksPerPage, and tasks
  console.log(
    'Total Tasks:',
    totalTasks,
    'Total Pages:',
    totalPages,
    'Tasks Per Page:',
    tasksPerPage,
    'Tasks:',
    tasks
  );

  return (
    <div className="dashboard">
      <main className="dashboard__main">
        <h2 className="dashboard__title">Tareas</h2>
        {error && <div className="dashboard__error">{error}</div>}
        {userInfo && userInfo.role === 'admin' && (
          <TaskForm onCreateTask={handleCreateTask} /> // Pass handleCreateTask to TaskForm
        )}
        {loading ? (
          <Spinner /> // Use a Spinner component for loading state
        ) : (
          <TaskList
            tasks={tasks || []} // Ensure tasks is defined
            userRole={userInfo?.role || 'employee'}
            totalTasks={totalTasks}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;