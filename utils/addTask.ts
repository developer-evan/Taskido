import axios from "axios";

type TaskFormData = {
  title: string;
  description: string;
};

export const AddNewTask = async (newTask: TaskFormData) => {
  try {
    const response = await axios.post(
      "http://192.168.100.114:8000/createTask",
      newTask,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
