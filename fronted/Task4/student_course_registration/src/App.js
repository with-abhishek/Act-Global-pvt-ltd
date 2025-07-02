// src/App.js
import React from 'react';
import {Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import ViewStudent from './components/ViewStudent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
   
      <div className="container mt-3">
        <Routes>
        
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/editstudent/:id" element={<EditStudent />} />
          <Route path="/getstudent/:id" element={<ViewStudent />} />

        </Routes>
      </div>
   
  );
}

export default App;
