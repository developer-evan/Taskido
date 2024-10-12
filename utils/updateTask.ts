import axios from "axios";

interface Task {
  id: string | string[];
  title: string;
  description: string;
  completed: boolean;
}

const updateTask = async (id: string | string[], updatedTask: any) => {
  try {
    const response = await axios.patch(
      `http://192.168.100.114:8000/updateTask/${id}`,
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
