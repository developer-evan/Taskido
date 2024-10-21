import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in/sign-in" options={{ headerShown: false }} />
        {/* <Stack.Screen name="sign-up/sign-up" options={{ headerShown: false }} /> */}
      </Stack>
      <StatusBar backgroundColor="#161622" barStyle="light-content" />
    </>
  );
};

export default AuthLayout;
