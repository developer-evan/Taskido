import { Link, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Button } from "tamagui";

const Settings = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <TouchableOpacity
        onPress={() => router.push(`/(screens)/tasko/tasko` as any)}
      >
        <Text>Go to Tasko</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
};
