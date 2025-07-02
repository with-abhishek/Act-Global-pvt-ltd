// src/services/StudentService.js
import axiosInstance from './AxiosInstance';
import AuthInstance from './AuthService';

const BASE_URL = 'http://localhost:8080/studentAPI';

class StudentService {
  getAllStudents() {
    return axiosInstance.get(`${BASE_URL}/getAll`);
  }

  getStudentById(id) {
    return axiosInstance.get(`${BASE_URL}/getStudent`, { params: { id } });
  }

  addStudent(student) {
    if (!AuthInstance.isAdmin()) {
      return Promise.reject({ message: 'Unauthorized: Admin access required.' });
    }
    return axiosInstance.post(`${BASE_URL}/addStudent`, student);
  }

  deleteStudent(id) {
    if (!AuthInstance.isAdmin()) {
      return Promise.reject({ message: 'Unauthorized: Admin access required.' });
    }
    return axiosInstance.delete(`${BASE_URL}/deleteStudent`, { params: { id } });
  }

 updateStudent(id, student) {
  if (!AuthInstance.isAdmin()) {
    return Promise.reject({ message: 'Unauthorized: Admin access required.' });
  }
    return axiosInstance.put(`${BASE_URL}/updateStudent?id=${id}`, student);
}

};

const instance = new StudentService();
export default instance;
