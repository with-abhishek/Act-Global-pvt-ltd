// src/services/StudentService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/studentAPI';

class StudentService {
  getAllStudents() {
    return axios.get(`${BASE_URL}/getAll`);
  }

  getStudentById(id) {
    return axios.get(`${BASE_URL}/getStudent?id=${id}`);
  }

  addStudent(student) {
    return axios.post(`${BASE_URL}/addStudent`, student);
  }

  updateStudent(id, student) {
    return axios.put(`${BASE_URL}/updateStudent?id=${id}`, student);
  }

  deleteStudent(id) {
    return axios.delete(`${BASE_URL}/deleteStudent?id=${id}`);
  }
}
const instance = new StudentService();
export default instance;

// export default new StudentService();
