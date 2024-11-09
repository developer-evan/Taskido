import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/utils/getProfile";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Image, Text } from "tamagui";
import { Pen } from "@tamagui/lucide-icons";

const Profile = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load profile data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
        gap: 20,
      }}

      >
      <Image
        source={{ uri: user.user.profilePicture }}
        style={styles.profileImage}
      />
      <View>
      <Text style={styles.name}>{user.user.username}</Text>
      <Text style={styles.role}>
        {user.user.role ? user.user.role : "Not available"}
      </Text>
      </View>
      </View>

      <View style={styles.detailContainer}>
        <MaterialIcons
          name="email"
          size={24}
          color="#6c757d"
          style={styles.icon}
        />
        <Text style={styles.detailText}>{user.user.email}</Text>
      </View>

      <View style={styles.detailContainer}>
        <FontAwesome
          name="phone"
          size={24}
          color="#6c757d"
          style={styles.icon}
        />
        <Text style={styles.detailText}>
          {user.user.phone ? user.user.phone : "Not available"}
        </Text>
      </View>

      <View style={styles.detailContainer}>
        <FontAwesome
          name="globe"
          size={24}
          color="#6c757d"
          style={styles.icon}
        />
        <Text style={styles.detailText}>
          {user.user.website ? user.user.website : "Not available"}
        </Text>
      </View>

      <View style={styles.detailContainer}>
        <MaterialIcons
          name="location-on"
          size={24}
          color="#6c757d"
          style={styles.icon}
        />
        <Text style={styles.detailText}>
          {user.user.address ? user.user.address : "Not available"}
        </Text>
        </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#6B21A8",
          width: "100%",
          padding: 12,
          borderRadius: 10,
          marginVertical: 6,
          justifyContent: "center",
        }}
      >
        <Pen size={18} color="white" style={styles.icon} />
        <Text style={[styles.detailText, { color: "white" }]}>
          Edit Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    // backgroundColor: "#F7F7F7",
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#A78BFA",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#A78BFA",
    // marginBottom: 8,
  },
  role: {
    fontSize: 18,
    color: "#6c757d",
    marginBottom: 20,
    fontStyle: "italic",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.15,
    // shadowRadius: 8,
    // elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#1E90FF",
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#d9534f",
  },
});
