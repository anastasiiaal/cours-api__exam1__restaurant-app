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

  async register(name, email, password) {
    try {
      const response = await axiosInstance.post("/register", {
        name,
        email,
        password,
      });
      console.log("Register response:", response.data);
      return response.data; // contient `token` et `user`
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      throw error.response?.data || { message: "Registration failed" };
    }
  }
}

export default new AuthService();
