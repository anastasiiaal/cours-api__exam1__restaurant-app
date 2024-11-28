import axiosInstance from "./axiosInstance";

class UserService {
    async getRestaurants() {
        try {
            const response = await axiosInstance.get("/user/restaurants");
            return response.data.data;
        } catch (error) {
            console.error("Error fetching restaurants:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Failed to fetch restaurants");
        }
    }
}

export default new UserService();
