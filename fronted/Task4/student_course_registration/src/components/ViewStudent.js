// src/components/ViewStudent.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';
import '../App.css';

function ViewStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('Invalid student ID');
      return;
    }

    StudentService.getStudentById(id)
      .then((res) => {
        if (res.data) {
          setStudent(res.data);
          setError('');
        } else {
          setError('No student found');
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 404) {
          setError('Student not found.');
        } else if (err.response?.status === 403 || err.response?.status === 401) {
          setError('Unauthorized to view student.');
        } else {
          setError('Failed to fetch student. Please check your network.');
        }
      });
  }, [id]);

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  if (!student) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="profile-view-card">
        <h2 className="text-center mb-4">👤 Student Profile</h2>
        <div className="profile-grid">
          <div className="label">ID:</div>
          <div className="value">{student.id}</div>

          <div className="label">Name:</div>
          <div className="value">{student.name}</div>

          <div className="label">Email:</div>
          <div className="value">{student.email}</div>

          <div className="label">Mobile No:</div>
          <div className="value">{student.mobileNo}</div>

          <div className="label">Gender:</div>
          <div className="value">{student.gender}</div>

          <div className="label">Courses:</div>
          <div className="value">
            <ul className="course-list">
              {student.courses.map((course, index) => (
                <li key={index}>
                  📘 {course.course_name} — ₹{course.course_fees}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-outline-primary px-4" onClick={() => navigate('/students')}>
            ⬅️ Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewStudent;
