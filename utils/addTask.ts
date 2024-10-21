import axios from "axios";

type TaskFormData = {
  title: string;
  description: string;
};

export const AddNewTask = async (newTask: TaskFormData,
  token: string,
  // user_id: string
): Promise<TaskFormData> => {
  try {
    // headers 
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.post(
      "http://192.168.100.114:8000/api/tasks/createTask",
      newTask,
      { headers }
    );
    return response.data as TaskFormData;
  } catch (error) {
    throw error;
  }
};
