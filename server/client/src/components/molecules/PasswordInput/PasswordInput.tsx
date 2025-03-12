//src/components/molecules/PasswordInput/PasswordInput.tsx
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field } from 'formik'; // Import Field from Formik
import React, { useState } from 'react';
import Button from '../../atoms/Button/Button';
import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';

interface PasswordInputProps {
  label: string;
  id: string;
  name: string;
  error?: string;
  ariaRequired?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  id,
  name,
  error,
  ariaRequired,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth__group">
      <label htmlFor={id} className="auth__label">
        {label}
      </label>
      <div className="auth__password-input">
        <Field
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={name}
          className="auth__input"
          aria-required={ariaRequired}
        />
        <Button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="auth__password-toggle"
          ariaLabel={showPassword ? 'Hide password' : 'Show password'}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </Button>
      </div>
      {error && (
        <ErrorMessage message={error} className="auth__error-message" />
      )}
    </div>
  );
};

export default PasswordInput;
