//src/components/organisms/TaskItem.tsx

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { completeTask, deleteTask } from '../../features/tasks/taskSlice';
import type { AppDispatch } from '../../features/store';
//import './TaskItem.css';

interface Task {
  _id: string;
  text: string;
  status: string;
  completedAt?: string;
  completionMessage?: string;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  // Removed unused userInfo
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [completionMessage, setCompletionMessage] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    if (document.getElementById('root')) {
      Modal.setAppElement('#root');
    }
  }, []);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      toast.success('Task successfully deleted!');
    } catch {
      toast.error('Error deleting task');
    }
    setShowDeleteModal(false);
  };

  const submitCompletion = async () => {
    try {
      await dispatch(completeTask({ taskId: task._id, completionMessage })).unwrap();
      toast.success('Task marked as complete!');
    } catch {
      toast.error('Error marking task as complete');
    }
    setShowCompletionModal(false);
    setCompletionMessage('');
  };

  return (
    <li className="task-item">
      <div className="task-item__content">
        <p className="task-item__text">{task.text}</p>
        <p className="task-item__status">
          Status: {task.status}
          {task.status === 'completed' && task.completedAt && (
            <span className="task-item__date">
              - Completed on {new Date(task.completedAt).toLocaleDateString()}
            </span>
          )}
        </p>
        {task.status === 'completed' && task.completionMessage && (
          <p className="task-item__completion-message">
            Completion Note: {task.completionMessage}
          </p>
        )}
      </div>
      <div className="task-item__actions">
        <button onClick={() => setShowCompletionModal(true)}>Mark as Complete</button>
        <button onClick={() => setShowDeleteModal(true)}>Delete</button>
      </div>
      {/* Completion Modal */}
      <Modal
        isOpen={showCompletionModal}
        onRequestClose={() => setShowCompletionModal(false)}
        contentLabel="Complete Task"
        className="completion-modal"
        overlayClassName="completion-modal-overlay"
      >
        <div className="completion-modal__header">Complete Task</div>
        <div className="completion-modal__body">
          <input
            type="text"
            className="completion-modal__input"
            placeholder="Describe your work"
            value={completionMessage}
            onChange={(e) => setCompletionMessage(e.target.value)}
            aria-label="Completion message"
          />
        </div>
        <div className="completion-modal__actions">
          <button onClick={submitCompletion}>Submit</button>
          <button onClick={() => setShowCompletionModal(false)}>Cancel</button>
        </div>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        contentLabel="Confirm Delete"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal__header">Confirm Delete</div>
        <div className="modal__body">
          <p>Are you sure you want to delete this task?</p>
        </div>
        <div className="modal__actions">
          <button onClick={handleDelete}>Yes, Delete</button>
          <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
        </div>
      </Modal>
    </li>
  );
};

export default TaskItem;

