import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';
import '../App.css';

function HomePage() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentRole = localStorage.getItem('role');
    const currentUser = localStorage.getItem('username');

    if (!currentRole || !currentUser) {
      navigate('/');
    } else {
      setRole(currentRole.toUpperCase());
      setUsername(currentUser);
    }
  }, [navigate]);

  const handleSearch = async () => {
    const trimmedId = searchId.trim();
    if (!trimmedId) {
      setError('Please enter a student ID.');
      return;
    }

    try {
      const response = await StudentService.getStudentById(trimmedId);
      if (response?.data) {
        setError('');
        navigate(`/getstudent/${trimmedId}`);
      } else {
        setError('Student not found.');
      }
    } catch (err) {
      if (err.response?.status === 404) setError('Student not found.');
      else if ([401, 403].includes(err.response?.status)) setError('Unauthorized to search.');
      else if (err.message === 'Network Error') setError('Backend server is not reachable.');
      else setError('Failed to fetch student.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatRole = (role) =>
  role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() : '';


  return (
    <div className="home-container">
      {/* Sticky Navbar */}
      <nav id="navbar" className="navbar sticky">
        <div className="navbar-left">
          <div className="profile-info">
            <span className="profile-icon">👤</span>
            <span className="profile-name">{username}</span>
            <span className="role-badge">{formatRole(role)}</span>
          </div>

        </div>

        <div className="navbar-center">
          <button className="nav-link" onClick={() => scrollToSection('home')}>Home</button>
          <button className="nav-link" onClick={() => scrollToSection('services')}>Services</button>
          <button className="nav-link" onClick={() => scrollToSection('about')}>About</button>
          <button className="nav-link" onClick={() => scrollToSection('contact')}>Contact</button>
        </div>

        <div className="navbar-right">
          <input
            type="text"
            placeholder="Search Student ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="search-input"
          />
          <button className="btn-search" onClick={handleSearch}>🔍</button>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Error Toast */}
      {error && <div className="error-toast">{error}</div>}

      {/* Home Section */}
      <section id="home" className="section home-section">
        <h1>🎓 Student Management System</h1>
        <p className="tagline">Easily manage student data, courses, and profiles in one place.</p>

      </section>

      {/* Services Section */}
      <section id="services" className="section services-section">
        <h2>🛠️ Services</h2>
        <div className="actions text-center">
          {role === 'ADMIN' && (
            <Link to="/addstudent" className="action-button">➕ Add Student</Link>
          )}
          {(role === 'ADMIN' || role === 'USER') && (
            <Link to="/students" className="action-button">📋 View Students</Link>
          )}
        </div>

        <ul>
          <li>🔍 Search students by ID</li>
          <li>📝 Add, Edit, and Delete student records (Admin only)</li>
          <li>📚 Manage student courses and fees</li>
          <li>🧾 View detailed student profiles</li>
        </ul>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <h2>ℹ️ About</h2>
        <p>This Student Management System is built using React for the frontend and Spring Boot for the backend. It supports role-based access (Admin/User) for securely managing student data.</p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <h2>📞 Contact</h2>
        <p>If you have any questions or suggestions, feel free to reach out:</p>
        <p><strong>Email:</strong> support@studentms.com</p>
        <p><strong>Phone:</strong> +91-9876543210</p>
      </section>
    </div>
  );
}

export default HomePage;
