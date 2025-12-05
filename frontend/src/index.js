// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Toastify CSS (only import the CSS once in the app)
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');

if (!container) {
  // Helpful error message instead of an exception
  console.error(
    'Root container missing. Ensure public/index.html contains: <div id="root"></div>'
  );
} else {
  const root = ReactDOM.createRoot(container);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

// Optional: measure performance (no-op unless you pass a function)
reportWebVitals();
