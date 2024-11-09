import { axiosInstance } from "@/lib/axiosInstance";
import config from "@/lib/config";

export const deleteTask = async (id: string | string[]): Promise<void> => {
  try {
    const response = await axiosInstance.delete(
      `${config.apiUrl}/tasks/deleteTask/${id}`
    );
    console.log("Task deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
