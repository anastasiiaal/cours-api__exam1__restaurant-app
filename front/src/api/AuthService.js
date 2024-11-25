import axiosInstance from "./axiosInstance";

class AuthService {
  async login(email, password) {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });
    return response.data;
  }

  async getUser() {
    const response = await axiosInstance.get("/users/@me");
    return response.data;
  }

  async register(email, password) {
    const response = await axiosInstance.post("/register", {
      email,
      password,
    });

    return response.data; // contient `token` et `user`
  }
}

export default new AuthService();
