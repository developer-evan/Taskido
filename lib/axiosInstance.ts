/* eslint-disable no-constant-condition */
import axios, { AxiosError } from "axios";
import config from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router"; 
const axiosInstance = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
});
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
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("axios response", response);
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized error (401), redirecting to login", error);
     
      router.replace("/sign-in/sign-in" as any); 
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
