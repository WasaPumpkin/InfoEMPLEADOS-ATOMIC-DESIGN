//src/components/templates/Layout.tsx
import React from 'react';
import Header from '../organisms/Header';

interface LayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void; // Add toggleTheme prop
}

const Layout: React.FC<LayoutProps> = ({ children, toggleTheme }) => {
  return (
    <div className="layout">
      <Header toggleTheme={toggleTheme} /> 
      <main className="layout__main">{children}</main>
    </div>
  );
};

export default Layout;