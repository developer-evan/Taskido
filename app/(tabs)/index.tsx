import { View, Text, Image, Input, ScrollView } from "tamagui";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TextProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import Tasks from "@/components/home-screen/tasks-component";
import { Task } from "@/types";
import useAuthInfo from "@/hooks/useAuthInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/utils/getUserDetails";
import { getUserProfile } from "@/utils/getProfile";
import { Colors } from "@/constants/Colors";
import { LogOut } from "@tamagui/lucide-icons";
import { fetchUserTasks } from "@/utils/getTasks";

const Home = () => {
  const headerHeight = useHeaderHeight();
  const tasks: Task[] = []; // Define the tasks variable
  const authInfo = useAuthInfo();
  const router = useRouter();

  const [filter, setFilter] = useState("All");

  const UserData = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserProfile(),
    // enabled: !!id,
  });
  // State for filter

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchUserTasks(),
  });

  const getStatusStyle = (completed: boolean): TextProps["style"] => ({
    backgroundColor: completed ? "#2e8b57" : "#f08080",
    color: "#fff",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  });

  const totalTasks = data?.length ?? 0;
  const completedTasksCount =
    data?.filter((task: { completed: any }) => task.completed).length ?? 0;
  const incompleteTasksCount = totalTasks - completedTasksCount;

  const filteredTasks = (data ?? []).filter((task: { completed: any }) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return true; // For "All" filter, return all tasks
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#f08080" />;
  }

  if (isError) {
    return (
      <View>
        <Text style={{ color: "red" }}>Error: {error.message}</Text>
      </View>
    );
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        "user_id",
        "username",
        "session_token",
        "email",
      ]);
      console.log("User logged out successfully.");
      router.push("/(auth)/sign-in/sign-in" as any); // Navigate back to the login screen
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  if (UserData.isPending) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerTransparent: false,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: 20 }}>
              <Image
                // source={{
                //   uri: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&uid=R57475211&ga=GA1.1.1492282832.1719819828&semt=ais_hybrid",
                // }}
                source={{ uri: UserData.data.user.profilePicture }}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 20,
                  borderColor: Colors.light.tint,
                  borderWidth: 1,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 20,
                backgroundColor: "white",
                borderRadius: 18,
                borderColor: Colors.light.tint,
                borderWidth: 1,
                padding: 8,
                shadowColor: "#171717",
                shadowOffset: { width: 2, height: 4 },
                shadowRadius: 3,
                shadowOpacity: 0.2,
              }}
              onPress={handleLogout}
            >
              {/* <Ionicons name="log-out" size={28} color="black" /> */}
              <LogOut size={18} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            // marginTop: 20,
          }}
        >
          <Text style={styles.headingText}>Welcome back</Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              // textTransform: "capitalize",
              marginTop: 10,
              color: Colors.light.tint,
            }}
          >
            {UserData.data?.user.username}
          </Text>
        </View>
        <Text style={styles.headingText}>Taskido personal task manager.</Text>
        <View style={styles.searchSection}>
          <View style={styles.seachBar}>
            <Ionicons
              name="search"
              size={18}
              color="black"
              style={{ marginRight: 5 }}
            />
            <TextInput placeholder="Search for tasks" />
          </View>
          <TouchableOpacity onPress={() => {}} style={styles.filterBtn}>
            <Ionicons name="options" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headingText}>Today's tasks</Text>
        <View>
          <Tasks tasks={tasks} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: 10,
  },
  searchSection: {
    flexDirection: "row",
    marginVertical: 20,
  },
  seachBar: {
    flexDirection: "row",
    padding: 8,
    flex: 1,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  filterBtn: {
    backgroundColor: Colors.light.tint,
    padding: 6,
    borderRadius: 10,
    marginLeft: 10,
  },
});
