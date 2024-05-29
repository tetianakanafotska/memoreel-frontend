import axios from "axios";

class AssetsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  post = (requestBody) => {
    return this.api.post("/assets", requestBody);
  };

  put = (id, requestBody) => {
    return this.api.put(`/assets/${id}`, requestBody);
  };

  delete = (id) => {
    return this.api.delete(`/assets/${id}`);
  };
}

const assetsService = new AssetsService();

export default assetsService;
