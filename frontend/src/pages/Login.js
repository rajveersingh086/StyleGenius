// src/pages/Login.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/Toast';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setIsAuthenticated }) {
  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email?.trim() || !password?.trim()) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();

      if (!response.ok) {
        return handleError(result?.message || "Login failed");
      }

      if (result?.success) {
        // save token and user so static page or future visits can verify auth
        if (result.jwtToken) localStorage.setItem("token", result.jwtToken);
        if (result.name) localStorage.setItem("loggedInUser", result.name);

        // show success toast
        handleSuccess(result.message || "Logged in successfully");

        // DEBUG: confirm this branch ran
        console.log("Login success — redirecting to /mypage.html");

        // Immediately load your static HTML page from public/
        // replace() avoids adding login page to history
        window.location.replace("/mypage.html");
        return; // important — prevents further React redirects
      }

      if (result?.error?.details?.length) {
        const details = result.error.details[0].message;
        return handleError(details);
      }

      handleError(result?.message || "Login failed");
    } catch (err) {
      handleError(err?.message || "Something went wrong");
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email...'
            value={loginInfo.email}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password...'
            value={loginInfo.password}
          />
        </div>

        <button type='submit'>Login</button>

        <span>
          Don't have an account? <Link to='/signup'>Signup</Link>
        </span>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Login;
