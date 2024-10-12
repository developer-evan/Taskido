import { View, Text, Image, Input, ScrollView } from "tamagui";
import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import Tasks from "@/components/home-screen/tasks-component";
import { Task } from "@/types";


const Home = () => {
  const headerHeight = useHeaderHeight();  
  const tasks: Task[] = []; // Define the tasks variable

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerTransparent: false,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: 20 }}>
              <Image
                source={{
                  uri: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&uid=R57475211&ga=GA1.1.1492282832.1719819828&semt=ais_hybrid",
                }}
                style={{ width: 40, height: 40, borderRadius: 10 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginRight: 20,
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
                shadowColor: "#171717",
                shadowOffset: { width: 2, height: 4 },
                shadowRadius: 3,
                shadowOpacity: 0.2,
              }}
            >
              <Ionicons name="notifications" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={[styles.container,
        //  { paddingTop: headerHeigt }
         ]}>
        <Text style={styles.headingText}>Taskido personal task manager.</Text>
        <View style={styles.searchSection}>
          <View style={styles.seachBar}>
            <Ionicons
              name="search"
              size={18}
              color="black"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder="Search for tasks"
              // style={{ padding: 10, borderRadius: 10 }}
            />
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
    fontSize: 26,
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
    backgroundColor: "#ff7f50",
    padding: 6,
    borderRadius: 10,
    marginLeft: 10,
  },
});
