// src/components/templates/MainLayout.tsx
import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void; // Add toggleTheme prop
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, toggleTheme }) => {
  return (
    <div className="main-layout">
      <Header toggleTheme={toggleTheme} /> 
      <main className="main-layout__main">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;