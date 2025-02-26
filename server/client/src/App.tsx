// src/App.tsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/organisms/Header/Header';
// import Dashboard from './components/pages/Dashboard/Dashboard';
// import Login from './components/pages/LoginPage';
// import Register from './components/pages/RegisterPage';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div className="app">
//         <Header />
//         <main className="app__main">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Routes>
//         </main>
//         <ToastContainer />
//       </div>
//     </Router>
//   );
// };

// export default App;

// src/App.tsx
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/LoginPage';
import Register from './components/pages/RegisterPage';
import Layout from './components/templates/Layout'; // Import Layout or MainLayout

// Import your CSS files
import './styles/main.css';
import './styles/themes/dark.css';
import './styles/themes/light.css';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light'; // Default to light theme
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Save to localStorage
      return newTheme;
    });
  };

  return (
    <Router>
      <div className="app" data-theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout toggleTheme={toggleTheme}>
                {' '}
                {/* Pass toggleTheme to Layout */}
                <Dashboard /> {/* Remove toggleTheme here */}
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;