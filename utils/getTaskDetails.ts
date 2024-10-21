import { Task } from "@/types";
import axios from "axios";

export async function getTaskDetails(id: string | string[],
  token:string,
  user_id:string

): Promise<Task> {
  try {
    const response = await axios.get(
      `http://192.168.100.114:8000/api/tasks/getTask/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data as Task;
  } catch (error: any) {
    // Check if it's an Axios error or a generic error
    if (error.response) {
      throw new Error(
        `Error ${error.response.status}: ${error.response.data.message}`
      );
    } else if (error.request) {
      throw new Error("No response from server. Please check your connection.");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
}
