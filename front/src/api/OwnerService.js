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
}

export default new OwnerService();
