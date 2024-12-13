import axiosInstance from "./axiosInstance";

class OwnerService {
    async fetchRestaurant() {
        try {
            const response = await axiosInstance.get("/owner/restaurant");
            return response.data;
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
            throw error.response?.data?.message || "Failed to fetch restaurant data";
        }
    }

    async getDishes() {
        try {
            const response = await axiosInstance.get("/owner/dishes");
            return response.data;
        } catch (error) {
            console.error("Error fetching dishes:", error);
            throw error;
        }
    }

    async createDish(dishData) {
        try {
            const response = await axiosInstance.post("/owner/dish/new", dishData);
            return response.data;
        } catch (error) {
            console.error("Error creating new dish:", error);
            throw error;
        }
    }
}

export default new OwnerService();
