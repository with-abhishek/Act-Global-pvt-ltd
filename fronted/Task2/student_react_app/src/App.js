import React, { useState } from 'react';
import data from './data/initialData.json';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import CourseForm from './components/CourseForm';
import './App.css';


function App() {
  const [students, setStudents] = useState(data.students);
  const [courses, setCourses] = useState(data.courses);

  const addStudent = (student) => {
    student.id = Date.now();
    setStudents([...students, student]);
  };

  const updateStudent = (updated) => {
    setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const addCourse = (course) => {
    course.id = Date.now();
    setCourses([...courses, course]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Management</h2>
      <StudentForm addStudent={addStudent} courses={courses} />
      <StudentTable
        students={students}
        courses={courses}
        updateStudent={updateStudent}
        deleteStudent={deleteStudent}
      />
      <hr />
      <h2>Add Course</h2>
      <CourseForm addCourse={addCourse} />
    </div>
  );
}

export default App;
