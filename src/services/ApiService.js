import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
    getUsers() {
        return axios.get(`${API_BASE_URL}/users`);
    }

    getUserById(id) {
        return axios.get(`${API_BASE_URL}/users/${id}`);
    }

    addUser(user) {
        return axios.post(`${API_BASE_URL}/users`, user);
    }

    updateUser(user) {
        return axios.put(`${API_BASE_URL}/users`, user);
    }

    deleteUser(id) {
        return axios.delete(`${API_BASE_URL}/users/${id}`);
    }
}

// สร้างตัวแปรสำหรับอินสแตนซ์ของ ApiService
const apiServiceInstance = new ApiService();

// ส่งออกอินสแตนซ์ที่สร้างขึ้น
export default apiServiceInstance;