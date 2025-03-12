// //src/components/organisms/TaskList/TaskList.tsx
// import React from 'react';
// import TaskItem from '../TaskItem/TaskItem';

// interface Task {
//   _id: string;
//   text: string;
//   assignedTo: string;
//   status: string;
//   completedAt?: string;
//   completionMessage?: string;
// }

// interface TaskListProps {
//   tasks: Task[];
//   userRole: string;
// }

// const TaskList: React.FC<TaskListProps> = ({ tasks, userRole }) => {
//   if (tasks.length === 0) {
//     return <p className="task-list__empty">No tasks available</p>;
//   }

//   return (
//     <ul className="task-list">
//       {tasks.map((task) => (
//         <TaskItem key={task._id} task={task} userRole={userRole} />
//       ))}
//     </ul>
//   );
// };

// export default TaskList;

// src/components/organisms/TaskList/TaskList.tsx
import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import Pagination from '../../molecules/Pagination/Pagination';
import { Task } from '../../../features/tasks/types';

interface TaskListProps {
  tasks: Task[];
  userRole: string;
  totalTasks: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  userRole,
  totalTasks,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const tasksPerPage = 5; // Match this with the limit used in your backend

  if (tasks.length === 0) {
    return <p className="task-list__empty">No tasks available</p>;
  }

  return (
    <div className="task-list">
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} userRole={userRole} />
        ))}
      </ul>

      {/* Display pagination metadata */}
      <div className="task-list__pagination-info">
        Showing {tasks.length} of {totalTasks} tasks (Page {currentPage} of{' '}
        {totalPages})
      </div>

      {/* Render Pagination component only if there are more tasks than the limit and tasks exist */}
      {totalTasks > tasksPerPage && tasks.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default TaskList;