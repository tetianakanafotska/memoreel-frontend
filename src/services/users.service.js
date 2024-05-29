import axios from "axios";

class UsersService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getCurrentBoard = (userId, currentDate) => {
    return this.api.get(`/users/${userId}/boards?start=${currentDate}`);
  };

  getAllBoards = (userId) => {
    return this.api.get(`/users/${userId}/boards`);
  };

  put = (id, requestBody) => {
    return this.api.put(`/users/${id}`, requestBody);
  };

  delete = (id) => {
    return this.api.delete(`/users/${id}`);
  };
}

const usersService = new UsersService();

export default usersService;
