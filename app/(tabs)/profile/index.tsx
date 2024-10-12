import { Text, View } from "tamagui";
import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>ProfileS</Text>
      <Link href="/profile/edit-profile">
      edit profile
      </Link>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});
