 //src/components/organisms/TaskForm/TaskForm.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@features/store'; 
import { createTask } from '@features/tasks/taskThunks'; 
import Button from '@components/atoms/Button/Button'; 
import Input from '@components/atoms/Input/Input'; 
import Select from '@components/atoms/Select/Select'; 
import Label from '@components/atoms/Label/Label'; 


interface Employee {
  _id: string;
  name: string;
}

interface TaskFormProps {
  onCreateTask: (taskData: { text: string; assignedTo: string }) => void;
}

const BASE_URL = 'http://localhost:7000';

const TaskForm: React.FC<TaskFormProps> = ({ onCreateTask }) => {
  const [text, setText] = useState<string>('');
  const [assignedTo, setAssignedTo] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!userInfo) return;
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get(
          `${BASE_URL}/api/users/employees`,
          config
        );
        setEmployees(data as Employee[]);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to fetch employees. Please try again.');
      }
    };
    fetchEmployees();
  }, [userInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !assignedTo) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await dispatch(createTask({ text, assignedTo }));
      onCreateTask({ text, assignedTo });
      setText('');
      setAssignedTo('');
      setError('');
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task. Please try again.');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} aria-label="Task Form">
      <h3 className="task-form__title">Assign New Task</h3>
      {error && (
        <div className="task-form__error" role="alert">
          {error}
        </div>
      )}
      <div className="task-form__group">
        <Label htmlFor="taskText" className="task-form__label" required>
          Task
        </Label>
        <Input
          type="text"
          id="taskText"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="task-form__input"
          required
          ariaLabel="Task Input"
          ariaRequired
        />
      </div>
      <div className="task-form__group">
        <Label htmlFor="assignedTo" className="task-form__label" required>
          Assign To
        </Label>
        <Select
          id="assignedTo"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="task-form__input"
          required
          ariaLabel="Assign To Dropdown"
          ariaRequired
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </Select>
      </div>
      <Button
        type="submit"
        className="task-form__button"
        ariaLabel="Create Task"
      >
        Create Task
      </Button>
    </form>
  );
};

export default TaskForm;