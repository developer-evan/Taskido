import { Task } from "@/types";
import axios from "axios";

export const fetchUserTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get("http://192.168.100.114:8000/getTasks");
    console.log("API Response:", response.data); // Log response
    const data = response.data as { tasks: Task[] };
    return data.tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
