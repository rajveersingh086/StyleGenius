// src/pages/Signup.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/Toast';
import 'react-toastify/dist/ReactToastify.css';

function Signup({ setIsAuthenticated }) {
  const [signupInfo, setSignupInfo] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json();

      if (!response.ok) {
        return handleError(result?.message || "Signup failed");
      }

      if (result?.success) {
        if (result.jwtToken) localStorage.setItem("token", result.jwtToken);
        if (result.name) localStorage.setItem("loggedInUser", result.name);

        setIsAuthenticated?.(true);
        handleSuccess(result.message || "Signup successful!");

        // debug log so you can verify this branch runs
        console.log("Signup success — redirecting to /mypage.html");

        // full-page redirect to public/mypage.html
        setTimeout(() => {
          window.location.href = "/mypage.html";
        }, 700);

        return;
      }

      if (result?.error?.details?.length) {
        const details = result.error.details[0].message;
        return handleError(details);
      }

      handleError(result?.message || "Signup failed");
    } catch (err) {
      handleError(err?.message || "Something went wrong");
    }
  };

  return (
    <div className='container'>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleChange}
            type='text'
            id='name'
            name='name'
            autoFocus
            placeholder='Enter your name...'
            value={signupInfo.name}
          />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email...'
            value={signupInfo.email}
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
            value={signupInfo.password}
          />
        </div>

        <button type='submit'>Signup</button>

        <span>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Signup;
