//src/components/templates/Layout/Layout.tsx
import React from 'react';
import Header from '../../organisms/Header/Header';

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
