import axios from "axios";
import { Task } from "@/types";
import AxiosError from "axios";
import { axiosInstance } from "@/lib/axiosInstance";
import config from "@/lib/config";

export const fetchUserTasks = async (): Promise<Task[]> => {
  try {
    // const headers = { Authorization: `Bearer ${token}` };
    const response = await axiosInstance.get(
      `${config.apiUrl}/tasks/getTasks`
      // { headers }
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
        "Axios error while fetching tasks:"
        // error?.response?.data || error?.message
      );
    } else {
      console.error("Unexpected error while fetching tasks:", error);
    }
    throw error; // Rethrow error for further handling
  }
};
