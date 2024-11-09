import { axiosInstance } from "@/lib/axiosInstance";
import config from "@/lib/config";

export async function getUserProfile(): Promise<any> {
  try {
    const response = await axiosInstance.get(`${config.apiUrl}/profile`);
    return response.data as any;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `Error ${error.response.status}: ${error.response.data.message}`
      );
    } else if (error.request) {
      throw new Error("No response from server. Please check your connection.");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
}
