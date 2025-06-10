import React, { useState } from 'react';

const StudentForm = ({ addStudent, courses }) => {
  const [student, setStudent] = useState({ name: '', age: '', courseId: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent({ ...student, age: Number(student.age), courseId: Number(student.courseId) });
    setStudent({ name: '', age: '', courseId: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={student.name} onChange={handleChange} placeholder="Name" required />
      <input name="age" type="number" value={student.age} onChange={handleChange} placeholder="Age" required />
      <select name="courseId" value={student.courseId} onChange={handleChange} required>
        <option value="">Select Course</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>{course.name}</option>
        ))}
      </select>
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
