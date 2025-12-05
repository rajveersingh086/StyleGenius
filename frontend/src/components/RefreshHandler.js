// src/components/RefreshHandler.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        // mark user authenticated
        setIsAuthenticated?.(true);

        // if user is on root, login, or signup, redirect them to the app's home
        // but do NOT redirect away from static pages like /mypage.html
        const path = window.location.pathname;

        const authPages = ['/', '/login', '/signup'];
        const isAuthPage = authPages.includes(path);
        const isStaticMypage = path === '/mypage.html';

        if (isAuthPage && !isStaticMypage) {
          navigate('/home', { replace: true });
        }
      }
    } catch (err) {
      // optional: log or handle any localStorage errors
      // console.error('RefreshHandler error:', err);
    }
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default RefreshHandler;
