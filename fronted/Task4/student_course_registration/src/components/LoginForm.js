// src/pages/LoginForm.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthInstance from '../services/AuthService';
import '../App.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Clear session and reset inputs when login page loads
  useEffect(() => {
    localStorage.clear(); // logout
    setUsername('');
    setPassword('');
    setError('');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await AuthInstance.login(username, password);
      console.log('✅ Login Success:', data);
      navigate('/HomePage');
    } catch (err) {
      console.error('❌ Login error:', err);
      if (err.message === 'Login failed' || err.response?.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form" autoComplete="off">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          autoComplete="new-username" // ✅ prevent autofill
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="new-password" // ✅ prevent autofill
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="error-message">{error}</p>}

        <p className="auth-footer">
          Not a member?{' '}
          <Link to="/register" className="register-link">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
