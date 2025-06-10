import React, { useState } from 'react';

const StudentTable = ({ students, courses, updateStudent, deleteStudent }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditData({ ...student });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = () => {
    updateStudent({ ...editData, age: Number(editData.age), courseId: Number(editData.courseId) });
    setEditingId(null);
  };

  const getCourseName = (id) => courses.find(c => c.id === id)?.name || 'Unknown';

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) =>
          editingId === s.id ? (
            <tr key={s.id}>
              <td><input name="name" value={editData.name} onChange={handleChange} /></td>
              <td><input name="age" type="number" value={editData.age} onChange={handleChange} /></td>
              <td>
                <select name="courseId" value={editData.courseId} onChange={handleChange}>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </td>
            </tr>
          ) : (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{getCourseName(s.courseId)}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => deleteStudent(s.id)}>Delete</button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default StudentTable;
