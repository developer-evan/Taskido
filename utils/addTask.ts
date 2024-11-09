import { axiosInstance } from "@/lib/axiosInstance";
import config from "@/lib/config";

type TaskFormData = {
  title: string;
  description: string;
};

export const AddNewTask = async (newTask: TaskFormData,
 
): Promise<TaskFormData> => {
  try {
       const response = await axiosInstance.post(
      `${config.apiUrl}/tasks/createTask`,
      newTask,
    );
    return response.data as TaskFormData;
  } catch (error) {
    throw error;
  }
};
