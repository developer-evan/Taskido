import { axiosInstance } from "@/lib/axiosInstance";
import config from "@/lib/config";

// Define the data structure for registration
type SignUpData = {
  email: string;
  password: string;
  username: string;
};

// Define the response structure
type SignUpResponse = {
  message: string;
};

export async function handleSignUp(
  email: string,
  password: string,
  username: string
): Promise<string | undefined> {
  const data: SignUpData = {
    email,
    password,
    username,
  };

  //   if (password !== confirmPassword) {
  //     throw new Error("Passwords do not match");
  //   }

  try {
    const response = await axiosInstance.post<SignUpResponse>(
      `${config.apiUrl}/auth/register`,
      data
    );
    console.log("Sign-up response:", response.data);
    return response.data.message;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error;
  }
}
