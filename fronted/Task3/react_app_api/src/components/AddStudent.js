import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';
import '../App.css';

function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: '',
    email: '',
    mobileNo: '',
    gender: '',
    courses: [{ course_name: '', course_fees: '' }]
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCourses = [...student.courses];
    updatedCourses[index][name] = value;
    setStudent({ ...student, courses: updatedCourses });
  };

  const addCourse = () => {
    setStudent({
      ...student,
      courses: [...student.courses, { course_name: '', course_fees: '' }]
    });
  };

  const removeCourse = (index) => {
    const updatedCourses = student.courses.filter((_, i) => i !== index);
    setStudent({ ...student, courses: updatedCourses });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...student,
      courses: student.courses.map(course => ({
        ...course,
        course_fees: parseFloat(course.course_fees)
      }))
    };

    StudentService.addStudent(payload)
      .then(() => {
        alert('✅ Student record successfully submitted!');
        navigate('/students');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg rounded-4 p-4 bg-white">
        <h2 className="text-center mb-4">📝 Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Name</label>
              <input
                name="name"
                value={student.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Email</label>
              <input
                name="email"
                type="email"
                value={student.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Mobile No</label>
              <input
                name="mobileNo"
                value={student.mobileNo}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Gender</label>
              <select
                name="gender"
                value={student.gender}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select</option>
                <option value="Male">👦 Male</option>
                <option value="Female">👧 Female</option>
              </select>
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="mb-3">📘 Courses</h5>
          {student.courses.map((course, index) => (
            <div key={index} className="row g-3 align-items-center mb-3">
              <div className="col-md-5">
                <input
                  name="course_name"
                  placeholder="Course Name"
                  value={course.course_name}
                  onChange={(e) => handleCourseChange(index, e)}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  name="course_fees"
                  type="number"
                  placeholder="Course Fees"
                  value={course.course_fees}
                  onChange={(e) => handleCourseChange(index, e)}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-3 text-md-start text-center">
                <button
                  type="button"
                  className="btn btn-outline-danger me-2"
                  onClick={() => removeCourse(index)}
                  disabled={student.courses.length === 1}
                >
                  ❌ Remove
                </button>
                {index === student.courses.length - 1 && (
                  <button type="button" className="btn btn-outline-success" onClick={addCourse}>
                    ➕ Add
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success px-5 me-2">
              💾 Save Student
            </button>
            <button type="button" className="btn btn-secondary px-5" onClick={() => navigate('/')}>
              ⬅️ Back to home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
