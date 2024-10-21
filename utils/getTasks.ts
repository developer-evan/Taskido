import axios from "axios";
import { Task } from "@/types";

export const fetchUserTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(
      "http://192.168.100.114:8000/api/tasks/getTasks"
    );
    console.log("API Response:", response.data); // Log response

    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not Found");
    }

    const data = response.data as { tasks: Task[] };
    return data.tasks;
  } finally {
    // Do nothing
  }
};
