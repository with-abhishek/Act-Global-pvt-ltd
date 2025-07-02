// src/components/StudentList.js
import React, { useEffect, useState } from 'react';
import StudentService from '../services/StudentService';
import { useNavigate } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    StudentService.getAllStudents()
      .then(response => setStudents(response.data))
      .catch(error => console.error(error));
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      StudentService.deleteStudent(id)
        .then(() => loadStudents());
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-center text-danger text-size-b ">Student List</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(stu => (
            <tr key={stu.id}>
              <td>{stu.id}</td>
              <td>{stu.name}</td>
              <td>{stu.email}</td>
              <td>{stu.mobileNo}</td>
              <td>{stu.gender}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2"
                  onClick={() => navigate(`/edit-student/${stu.id}`)}>
                 ✏️ Edit
                </button>
                <button className="btn btn-danger btn-sm me-2"
                  onClick={() => deleteStudent(stu.id)}>
                  🗑️ Delete
                </button>
                <button className="btn btn-secondary btn-sm"
                  onClick={() => navigate(`/view-student/${stu.id}`)}>
                  👁️ View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
