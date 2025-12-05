import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils/Toast'; // adjust path if needed
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]); // array

  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('loggedInUser') || localStorage.getItem('LoggedInUser');
    setLoggedInUser(name || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logged out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 800);
  };

  const fetchProducts = async () => {
    try {
      const url = 'https://style-genius-api.vercel.app/products';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        return handleError(errBody.message || 'Failed to fetch products');
      }

      const result = await response.json();
      // assume result is an array; adapt if your API wraps it { data: [...] }
      setProducts(Array.isArray(result) ? result : result.data || []);
    } catch (err) {
      handleError(err.message || 'Something went wrong while fetching products');
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  return (
    <div className="container">
      <h1>Welcome{loggedInUser ? `, ${loggedInUser}` : ''}</h1>
      <button onClick={handleLogout}>Logout</button>

      <div style={{ marginTop: 20 }}>
        {products && products.length ? (
          <ul>
            {products.map((item, index) => (
              <li key={item.id ?? index} style={{ marginBottom: 8 }}>
                <strong>{item.name}</strong>: {item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available.</p>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Home;
