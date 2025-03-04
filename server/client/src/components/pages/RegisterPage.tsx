//src/components/pages/RegisterPage.tsx
// src/components/pages/RegisterPage.tsx
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { registerUser } from '../../features/auth/authSlice';
// import type { RootState, AppDispatch } from '../../features/store';

// const RegisterPage: React.FC = () => {
//   const [name, setName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [role, setRole] = useState<string>('employee');

//   // Use a typed dispatch so that async thunk actions are accepted
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { userInfo, loading, error } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     if (userInfo) {
//       navigate('/');
//     }
//   }, [userInfo, navigate]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(registerUser({ name, email, password, role }));
//   };

//   return (
//     <div className="auth">
//       <form className="auth__form" onSubmit={handleSubmit} aria-label="Registration Form">
//         <h2 className="auth__title">Register</h2>
//         {error && <div className="auth__error" role="alert">{error}</div>}
//         <div className="auth__group">
//           <label htmlFor="name" className="auth__label">Name</label>
//           <input
//             type="text"
//             id="name"
//             className="auth__input"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             aria-required="true"
//           />
//         </div>
//         <div className="auth__group">
//           <label htmlFor="email" className="auth__label">Email</label>
//           <input
//             type="email"
//             id="email"
//             className="auth__input"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             aria-required="true"
//           />
//         </div>
//         <div className="auth__group">
//           <label htmlFor="password" className="auth__label">Password</label>
//           <input
//             type="password"
//             id="password"
//             className="auth__input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             aria-required="true"
//           />
//         </div>
//         <div className="auth__group">
//           <label htmlFor="role" className="auth__label">Role</label>
//           <select
//             id="role"
//             className="auth__input"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//             aria-required="true"
//           >
//             <option value="employee">Employee</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <button type="submit" className="auth__button" disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
//         </button>
//         <p className="auth__text">
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/auth/authSlice';
import type { RootState, AppDispatch } from '../../features/store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Using React Icons for eye icons
import logo from '../../img/Logo.png';

// Yup validation schema
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match') // Fix: Use Yup.ref without null
    .required('Confirm Password is required'),
  role: Yup.string().required('Role is required'),
});

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img src={logo} alt="Logo" />
      </div>
      <div className="auth-form-container">
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'employee',
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            dispatch(registerUser(values));
          }}
        >
          {() => (
            <Form className="auth__form" aria-label="Registration Form">
              <h2 className="auth__title">Register</h2>
              {error && (
                <div className="auth__error" role="alert">
                  {error}
                </div>
              )}
              <div className="auth__group">
                <label htmlFor="name" className="auth__label">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="auth__input"
                  aria-required="true"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="auth__error-message"
                />
              </div>
              <div className="auth__group">
                <label htmlFor="email" className="auth__label">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="auth__input"
                  aria-required="true"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="auth__error-message"
                />
              </div>
              <div className="auth__group">
                <label htmlFor="password" className="auth__label">
                  Password
                </label>
                <div className="auth__password-input">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="auth__input"
                    aria-required="true"
                  />
                  <button
                    type="button"
                    className="auth__password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="auth__error-message"
                />
              </div>
              <div className="auth__group">
                <label htmlFor="confirmPassword" className="auth__label">
                  Confirm Password
                </label>
                <div className="auth__password-input">
                  <Field
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="auth__input"
                    aria-required="true"
                  />
                  <button
                    type="button"
                    className="auth__password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className="auth__error-message"
                />
              </div>
              <div className="auth__group">
                <label htmlFor="role" className="auth__label">
                  Role
                </label>
                <Field
                  as="select"
                  id="role"
                  name="role"
                  className="auth__input"
                  aria-required="true"
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="span"
                  className="auth__error-message"
                />
              </div>
              <button type="submit" className="auth__button" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
              <p className="auth__text">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;