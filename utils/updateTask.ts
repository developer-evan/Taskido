import axios from "axios";

interface Task {
  id: string | string[];
  title: string;
  description: string;
  completed: boolean;
}

const updateTask = async (id: string | string[], updatedTask: any,
  token:string,
  user_id:string
) => {
  try {
    const response = await axios.patch(
      `http://192.168.100.114:8000/api/tasks/updateTask/${id}`,
      updatedTask,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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
