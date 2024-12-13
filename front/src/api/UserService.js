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

    async getRestaurantWithDishes(id) {
        try {
            const response = await axiosInstance.get(`/user/restaurants/${id}`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching restaurant with dishes:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Failed to fetch restaurant and dishes");
        }
    }
}

export default new UserService();
