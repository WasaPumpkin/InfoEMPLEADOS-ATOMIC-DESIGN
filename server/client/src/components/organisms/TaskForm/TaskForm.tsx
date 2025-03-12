// //src/components/organisms/TaskForm/TaskForm.tsx
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import type { AppDispatch, RootState } from '../../../features/store';
// import { createTask } from '../../../features/tasks/taskSlice';

// // Define an interface for an Employee object
// interface Employee {
//   _id: string;
//   name: string;
// }

// const BASE_URL = 'http://localhost:7000';

// const TaskForm: React.FC = () => {
//   const [text, setText] = useState<string>('');
//   const [assignedTo, setAssignedTo] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   // Specify the type for employees
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const dispatch = useDispatch<AppDispatch>();
//   const { userInfo } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       if (!userInfo) return;
//       try {
//         const config = {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         };
//         const { data } = await axios.get(
//           `${BASE_URL}/api/users/employees`,
//           config
//         );
//         // Assuming data is an array of Employee objects
//         setEmployees(data as Employee[]);
//       } catch (err) {
//         console.error('Error fetching employees:', err);
//         setError('Failed to fetch employees. Please try again.');
//       }
//     };
//     fetchEmployees();
//   }, [userInfo]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!text || !assignedTo) {
//       setError('Please fill in all fields');
//       return;
//     }
//     dispatch(createTask({ text, assignedTo }));
//     setText('');
//     setAssignedTo('');
//     setError('');
//   };

//   return (
//     <form className="task-form" onSubmit={handleSubmit} aria-label="Task Form">
//       <h3 className="task-form__title">Assign New Task</h3>
//       {error && (
//         <div className="task-form__error" role="alert">
//           {error}
//         </div>
//       )}
//       <div className="task-form__group">
//         <label htmlFor="taskText" className="task-form__label">
//           Task
//         </label>
//         <input
//           type="text"
//           id="taskText"
//           className="task-form__input"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           required
//           aria-required="true"
//         />
//       </div>
//       <div className="task-form__group">
//         <label htmlFor="assignedTo" className="task-form__label">
//           Assign To
//         </label>
//         <select
//           id="assignedTo"
//           className="task-form__input"
//           value={assignedTo}
//           onChange={(e) => setAssignedTo(e.target.value)}
//           required
//           aria-required="true"
//         >
//           <option value="">Select Employee</option>
//           {employees.map((emp) => (
//             <option key={emp._id} value={emp._id}>
//               {emp.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button type="submit" className="task-form__button">
//         Create Task
//       </button>
//     </form>
//   );
// };

// export default TaskForm;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../features/store';
import { createTask } from '../../../features/tasks/taskThunks'; // Import from taskThunks

// Define an interface for an Employee object
interface Employee {
  _id: string;
  name: string;
}

interface TaskFormProps {
  onCreateTask: (taskData: { text: string; assignedTo: string }) => void; // Add onCreateTask prop
}

const BASE_URL = 'http://localhost:7000';

const TaskForm: React.FC<TaskFormProps> = ({ onCreateTask }) => {
  const [text, setText] = useState<string>('');
  const [assignedTo, setAssignedTo] = useState<string>('');
  const [error, setError] = useState<string>('');
  // Specify the type for employees
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
        // Assuming data is an array of Employee objects
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
      // Dispatch the createTask action
      await dispatch(createTask({ text, assignedTo }));
      // Call the onCreateTask prop to refetch tasks
      onCreateTask({ text, assignedTo });
      // Reset the form
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
        <label htmlFor="taskText" className="task-form__label">
          Task
        </label>
        <input
          type="text"
          id="taskText"
          className="task-form__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div className="task-form__group">
        <label htmlFor="assignedTo" className="task-form__label">
          Assign To
        </label>
        <select
          id="assignedTo"
          className="task-form__input"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
          aria-required="true"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="task-form__button">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;