//components/molecules/TaskItem/TaskItem.tsx
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../features/hooks'; // Adjust path accordingly
import { completeTask, deleteTask } from '../../features/tasks/taskSlice';
import Button from '../atoms/Button';
// import './TaskItem.css';

interface TaskItemProps {
  task: {
    _id: string;
    text: string;
    status: string;
    completedAt?: string;
    completionMessage?: string;
  };
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#root');
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
      await dispatch(
        completeTask({ taskId: task._id, completionMessage })
      ).unwrap();
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
        <Button
          className="button--primary"
          onClick={() => setShowCompletionModal(true)}
        >
          Mark as Complete
        </Button>
        <Button
          className="button--secondary"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </Button>
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
          <Button className="button--primary" onClick={submitCompletion}>
            Submit
          </Button>
          <Button
            className="button--secondary"
            onClick={() => setShowCompletionModal(false)}
          >
            Cancel
          </Button>
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
          <Button className="button--primary" onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button
            className="button--secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </li>
  );
};

export default TaskItem;
