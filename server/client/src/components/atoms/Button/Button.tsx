//src/components/atoms/Button/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick?: () => void; // Make optional for buttons with type="submit"
  disabled?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset'; // Add type prop
  className?: string; // Add className prop
  ariaLabel?: string; // Add ariaLabel prop
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  style,
  type = 'button', // Default to 'button'
  className,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      type={type} // Pass type to the button element
      className={className} // Pass className to the button element
      aria-label={ariaLabel} // Pass ariaLabel to the button element
    >
      {children}
    </button>
  );
};

export default Button;

