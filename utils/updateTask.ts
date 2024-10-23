import { axiosInstance } from "@/lib/axiosInstance";
import config from "@/lib/config";

interface Task {
  id: string | string[];
  title: string;
  description: string;
  completed: boolean;
}

const updateTask = async (id: string | string[], updatedTask: any) => {
  try {
    const response = await axiosInstance.patch(
      `${config.apiUrl}/tasks/updateTask/${id}`,
      updatedTask
    );
    console.log("Task updated successfully:", response.data);
  } catch (error: any) {
    console.error(
      "Error updating task:",
      error.response?.data || error.message
    );
  }
};
export default updateTask;
