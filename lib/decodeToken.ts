import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

/**
 * Function to handle an authentication token, decode it, and store user data in AsyncStorage
 * @param {string} token - The JWT access token
 */
export function decodeAuthToken(token: string) {
  try {
    const decoded: any = jwtDecode(token);
    console.log("Decoded token:", decoded);
    const user_id = decoded.userId;
    // const roles = decoded.roles;
    const email = decoded.email;

    // Store the decoded data in AsyncStorage
    AsyncStorage.setItem("user_id", user_id);
    // AsyncStorage.setItem("roles", JSON.stringify(roles));
    // AsyncStorage.setItem("username", username);
    AsyncStorage.setItem("user_id", user_id);

    console.log("Stored user data in AsyncStorage:", {
      user_id,
      //   roles,
      email,
    });
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error;
  }
}
