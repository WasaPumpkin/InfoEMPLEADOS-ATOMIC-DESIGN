//src/components/organisms/TaskList.tsx
import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  _id: string;
  text: string;
  status: string;
  completedAt?: string;
  completionMessage?: string;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return <p className="task-list__empty">No tasks available</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
