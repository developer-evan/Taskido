import { decodeAuthToken } from "@/lib/decodeToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Define the data structure
type LoginData = {
  //   username: string;
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
): Promise<string | undefined> {
 

  const data: LoginData = {
    email,
    password,
  };

  try {
    const response = await axios.post<LoginResponse>(
      `http://192.168.100.114:8000/api/auth/login`,
      data,
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
  
    const { token } = response.data;
    console.log("Access Token:", token);
  
    // Store the access token in sessionStorage
    // sessionStorage.setItem("session_token", token);
    AsyncStorage.setItem("session_token", token);
    decodeAuthToken(token);
    return token;
  } catch (error) {
    // Existing error handling
  }
}  


