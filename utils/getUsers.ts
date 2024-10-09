import axios from "axios";

export const fetchUsers = async () => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
