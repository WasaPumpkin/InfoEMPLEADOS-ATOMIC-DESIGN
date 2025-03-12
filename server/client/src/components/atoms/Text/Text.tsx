// src/components/atoms/Text/Text.tsx
// src/components/atoms/Text.tsx
import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, className }) => {
  return <p className={`text ${className}`}>{children}</p>;
};

export default Text;