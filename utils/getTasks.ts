import axios from "axios";
import { Task } from "@/types";
import AxiosError from "axios";

export const fetchUserTasks = async (token: string): Promise<Task[]> => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(
      "http://192.168.100.114:8000/api/tasks/getTasks",
      { headers }
    );

    console.log("API Response:", response.data); // Log response

    // Check for successful response
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch tasks: ${response.status} ${response.statusText}`
      );
    }

    const data = response.data as { tasks: Task[] };
    return data.tasks;
  } catch (error) {
    // Handle error
    if (error instanceof AxiosError) {
      console.error(
        "Axios error while fetching tasks:",
        // error?.response?.data || error?.message
      );
    } else {
      console.error("Unexpected error while fetching tasks:", error);
    }
    throw error; // Rethrow error for further handling
  }
};
