// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import ViewStudent from './components/ViewStudent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   
      <div className="container mt-3">
        <Routes>
        
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
          <Route path="/view-student/:id" element={<ViewStudent />} />
          <Route path="/get-student/:id" element={<ViewStudent />} />

        </Routes>
      </div>
   
  );
}

export default App;
