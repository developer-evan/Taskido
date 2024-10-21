import React from "react";
import { Button, Text, View } from "tamagui";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const SplashS = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Splash</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/sign-in/sign-in" as any)}
      >
        <Text style={styles.buttonText}>Click me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
