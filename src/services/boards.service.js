import axios from "axios";

class BoardsService {
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

  post = (requestBody) => {
    return this.api.post("/boards", requestBody);
  };

  delete = (id) => {
    console.log("deleted used");
    return this.api.delete(`/boards/${id}`);
  };
}

const boardsService = new BoardsService();

export default boardsService;
