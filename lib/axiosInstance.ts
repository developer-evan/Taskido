/* eslint-disable no-constant-condition */
import axios, { AxiosError } from "axios";
import config from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router"; // Use router from expo-router for navigation

const axiosInstance = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
});

// Request Interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  async (config:any) => {
    const accessToken = await AsyncStorage.getItem("session_token");
    if (accessToken) {
      config.headers!["Authorization"] = `Bearer ${accessToken}`;
      config.headers!["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("axios response", response);
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized error (401), redirecting to login", error);
      // Use router from expo-router to redirect to login
      router.replace("/sign-in/sign-in" as any); // Replace current screen with the login screen
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
