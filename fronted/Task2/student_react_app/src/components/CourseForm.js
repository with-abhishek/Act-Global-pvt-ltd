import React, { useState } from 'react';

const CourseForm = ({ addCourse }) => {
  const [courseName, setCourseName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse({ name: courseName });
    setCourseName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="Course Name" required />
      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseForm;
