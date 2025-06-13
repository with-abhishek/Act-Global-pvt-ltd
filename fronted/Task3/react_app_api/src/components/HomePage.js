// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function HomePage() {
  return (
    <div className="home-container">
      <h1>Student Management System</h1>
      <p>Organize student records with ease.</p>
      <div className="home-buttons">
        <Link to="/add-student" className="btn btn-light">➕ Add Student</Link>
        <Link to="/students" className="btn btn-light">📋 View Students</Link>
      </div>
    </div>
  );
}

export default HomePage;
