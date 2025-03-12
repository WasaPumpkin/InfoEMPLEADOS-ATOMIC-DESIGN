// src/components/molecules/TaskDetails/TaskDetails.tsx
import React from 'react';
import TaskStatus from '../../atoms/TaskStatus/TaskStatus'; // Updated import
import { Task } from '../../../features/tasks/types';

interface TaskDetailsProps {
  task: Task;
  assignedUserName: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  assignedUserName,
}) => (
  <div className="task-item__content">
    <p className="task-item__text">{task.text}</p>
    <p className="task-item__assigned-to">Assigned to: {assignedUserName}</p>
    <TaskStatus status={task.status} completedAt={task.completedAt} />
    {task.status === 'completed' && task.completionMessage && (
      <p className="task-item__completion-message">
        Completion Note: {task.completionMessage}
      </p>
    )}
  </div>
);

export default TaskDetails;
