// src/services/AuthService.js
import axios from 'axios';

const AUTH_API_BASE_URL = 'http://localhost:8080/studentAuth';

class AuthService {

   saveRoles(data) {
    return axios.post(`${AUTH_API_BASE_URL}/saveRoles`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }


  // Login API call with token handling
login(username, password) {
  return axios.post(`${AUTH_API_BASE_URL}/signin`, {
    username,
    password,
  }).then((response) => {
    const data = response.data;

    // 🔍 Debug: check response content
    console.log('Login Response:', data);

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // 💡 Save token (optional)
    localStorage.setItem('authToken', btoa(`${username}:${password}`));

    // ✅ Save role (this is the fix!)
    if (data.role) {
      localStorage.setItem('role', data.role.toUpperCase());
    } else {
      console.warn('⚠️ Role not returned from backend');
      localStorage.setItem('role', 'UNDEFINED');
    }

    return data;
  });
}


  logout() {
    localStorage.clear();
    window.location.href = '/';
  }

  getRole() {
    return localStorage.getItem('role')?.toUpperCase();
  }

  isAdmin() {
    return this.getRole() === 'ADMIN';
  }

  isLoggedIn() {
    return !!localStorage.getItem('role');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }


}
const AuthInstance = new AuthService();
export default AuthInstance;
