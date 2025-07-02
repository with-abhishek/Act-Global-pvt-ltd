// src/pages/RegisterForm.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthInstance from '../services/AuthService';
import '../App.css';

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: ''
  });

  const [error, setError] = useState('');

  // Reset form when component loads
  useEffect(() => {
    localStorage.clear();
    setFormData({
      username: '',
      password: '',
      email: '',
      role: ''
    });
    setError('');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log("📤 Registering:", formData);
      await AuthInstance.saveRoles(formData);
      alert('✅ Successfully registered!');
      navigate('/');
    } catch (err) {
      console.error('❌ Registration error:', err);
      if (
        err.response?.status === 409 ||
        err.response?.data?.message?.includes('exists')
      ) {
        setError('❌ Username or email already exists.');
      } else {
        setError('❌ Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRegister} className="login-form" autoComplete="off">
        <h2>Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role (e.g. USER or ADMIN)"
          value={formData.role}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/" className="register-link">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
