import React from "react";
import { Button, Text, View } from "tamagui";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const SplashS = () => {
  const router = useRouter();

  return (
    <LinearGradient colors={["#A18CD1", "#FBC2EB"]} style={styles.container}>
      {/* <Stack.Screen
        // name="index"
        // component={SplashS}
        options={{ headerShown: false }}
      /> */}
      <Text style={styles.title}>Welcome to Taskify</Text>
      <Text style={styles.subtitle}>Your Personal Task Manager</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/sign-in/sign-in" as any)}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SplashS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4A148C",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
