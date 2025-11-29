import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import useAuthStore from './store/useAuthStore';

// A Helper Component to Protect the Dashboard
// If you don't have a token, it kicks you out!
const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* If someone goes to home "/", send them to Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* The Login Page */}
        <Route path="/login" element={<Login />} />
        
        {/* The Dashboard (Protected!) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;