import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthInfo = {
  user_id?: string;
  username?: string;
  token?: string;
  email?: string;
};
/**
 * Custom hook to get authentication information from AsyncStorage
 * @returns {AuthInfo} - An object containing user_id, username, and token or undefined if they do not exist
 */
function useAuthInfo(): AuthInfo {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    user_id: undefined,
    // username: undefined,
    token: undefined,
    email: undefined,
  });

  useEffect(() => {
    const fetchAuthInfo = async () => {
      try {
        const user_id = await AsyncStorage.getItem("user_id");
        const email = await AsyncStorage.getItem("email");
        const username = await AsyncStorage.getItem("username");
        const token = await AsyncStorage.getItem("session_token");

        setAuthInfo({
          user_id: user_id || undefined,
          username: username || undefined,
          token: token || undefined,
          email: email || undefined,
        });
      } catch (error) {
        console.error("Failed to load authentication info:", error);
      }
    };

    fetchAuthInfo();
  }, []);

  return authInfo;
}



export default useAuthInfo;
