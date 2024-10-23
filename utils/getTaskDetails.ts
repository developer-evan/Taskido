import { axiosInstance } from "@/lib/axiosInstance";
import config from "@/lib/config";
import { Task } from "@/types";

export async function getTaskDetails(id: string | string[]): Promise<Task> {
  try {
    const response = await axiosInstance.get(
      `${config.apiUrl}/tasks/getTask/${id}`
    );
    return response.data as Task;
  } catch (error: any) {
    // Check if it's an Axios error or a generic error
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
