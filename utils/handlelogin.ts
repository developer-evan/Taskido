import { axiosInstance } from "@/lib/axiosInstance";
import config from "@/lib/config";
import { decodeAuthToken } from "@/lib/decodeToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { isAxiosError } from "axios";

// Define the data structure
type LoginData = {
  email: string;
  password: string;
};

// Define the response structure
type LoginResponse = {
  token: string;
};

export async function handlelogin(
  email: string,
  password: string
): Promise<{ success: boolean; token?: string; error?: string }> {
  const data: LoginData = {
    email,
    password,
  };

  try {
    const response = await axiosInstance.post<LoginResponse>(
      `${config.apiUrl}/auth/login`,
      data,
    );

    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    const { token } = response.data;
    console.log("Access Token:", token);

    // Store the access token in AsyncStorage
    await AsyncStorage.setItem("session_token", token);
    decodeAuthToken(token);

    return { success: true, token }; // Indicate success and return the token
  } catch (error:any) {
    // Handle errors based on the error response from the server
    if (isAxiosError(error) && error.response) {
      // If the error response contains a message
      const errorMessage = error.response.data?.message || "Login failed. Please check your credentials.";
      console.error("Login error:", errorMessage);
      return { success: false, error: errorMessage }; // Indicate failure and return the error message
    }

    // For unexpected errors
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred." }; // Handle unexpected errors
  }
}
