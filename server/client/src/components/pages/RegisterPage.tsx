//src/components/pages/RegisterPage.tsx
// src/components/pages/RegisterPage.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/auth/authSlice';
import type { RootState, AppDispatch } from '../../features/store';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('employee');

  // Use a typed dispatch so that async thunk actions are accepted
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password, role }));
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit} aria-label="Registration Form">
        <h2 className="auth__title">Register</h2>
        {error && <div className="auth__error" role="alert">{error}</div>}
        <div className="auth__group">
          <label htmlFor="name" className="auth__label">Name</label>
          <input
            type="text"
            id="name"
            className="auth__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div className="auth__group">
          <label htmlFor="email" className="auth__label">Email</label>
          <input
            type="email"
            id="email"
            className="auth__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div className="auth__group">
          <label htmlFor="password" className="auth__label">Password</label>
          <input
            type="password"
            id="password"
            className="auth__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div className="auth__group">
          <label htmlFor="role" className="auth__label">Role</label>
          <select
            id="role"
            className="auth__input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            aria-required="true"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="auth__button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="auth__text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

