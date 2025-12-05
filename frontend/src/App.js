// src/App.js
import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Outfit from './pages/Outfit';
import MypageViewer from './pages/MypageViewer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import RefreshHandler from './components/RefreshHandler'; // adjust if needed

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PrivateRoute expects children and returns them if authenticated
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <div className="App">
      {/* Ensure RefreshHandler is mounted so it can restore auth state on page load */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        {/* Redirect root "/" to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Pass setIsAuthenticated so Login/Signup can notify App on success */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protect /outfit and /home using the PrivateRoute wrapper */}
        <Route
          path="/outfit"
          element={
            <PrivateRoute>
              <Outfit />
            </PrivateRoute>
          }
        />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
