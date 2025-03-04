//src/components/pages/LoginPage.tsx
// src/components/pages/LoginPage.tsx
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { loginUser } from '../../features/auth/authSlice';
// import type { RootState, AppDispatch } from '../../features/store';

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
  
//   // Use typed dispatch so async thunks are recognized correctly
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
//     dispatch(loginUser({ email, password }));
//   };

//   return (
//     <div className="auth">
//       <form className="auth__form" onSubmit={handleSubmit} aria-label="Login Form">
//         <h2 className="auth__title">Login</h2>
//         {error && (
//           <div className="auth__error" role="alert">
//             {error}
//           </div>
//         )}
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
//         <button type="submit" className="auth__button" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//         <p className="auth__text">
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { loginUser } from '../../features/auth/authSlice';
// import type { RootState, AppDispatch } from '../../features/store';

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { userInfo, loading, error } = useSelector(
//     (state: RootState) => state.auth
//   );

//   useEffect(() => {
//     if (userInfo) {
//       navigate('/');
//     }
//   }, [userInfo, navigate]);

//   const validateForm = () => {
//     const errors: { [key: string]: string } = {};
//     if (!email) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = 'Email address is invalid';
//     }
//     if (!password) {
//       errors.password = 'Password is required';
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       dispatch(loginUser({ email, password }));
//     }
//   };

//   return (
//     <div className="auth">
//       <form
//         className="auth__form"
//         onSubmit={handleSubmit}
//         aria-label="Login Form"
//       >
//         <h2 className="auth__title">Login</h2>
//         {error && (
//           <div className="auth__error" role="alert">
//             {error}
//           </div>
//         )}
//         <div className="auth__group">
//           <label htmlFor="email" className="auth__label">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             className="auth__input"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             aria-required="true"
//           />
//           {formErrors.email && (
//             <span className="auth__error-message">{formErrors.email}</span>
//           )}
//         </div>
//         <div className="auth__group">
//           <label htmlFor="password" className="auth__label">
//             Password
//           </label>
//           <input
//             type={showPassword ? 'text' : 'password'}
//             id="password"
//             className="auth__input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             aria-required="true"
//           />
//           <button
//             type="button"
//             className="auth__password-toggle"
//             onClick={() => setShowPassword(!showPassword)}
//             aria-label={showPassword ? 'Hide password' : 'Show password'}
//           >
//             {showPassword ? '🙈' : '👁️'}
//           </button>
//           {formErrors.password && (
//             <span className="auth__error-message">{formErrors.password}</span>
//           )}
//         </div>
//         <button type="submit" className="auth__button" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//         <p className="auth__text">
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/auth/authSlice';
import type { RootState, AppDispatch } from '../../features/store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/Logo.png';

// Yup validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
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
        <img src={logo}alt="Logo" />
      </div>
      <div className="auth-form-container">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            dispatch(loginUser(values));
          }}
        >
          {() => (
            <Form className="auth__form" aria-label="Login Form">
              <h2 className="auth__title">Login</h2>
              {error && (
                <div className="auth__error" role="alert">
                  {error}
                </div>
              )}
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
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="auth__error-message"
                />
              </div>
              <button
                type="submit"
                className="auth__button"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <p className="auth__text">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;