import { View, Text, Image, ScrollView } from "tamagui";
import React from "react";
import { Link, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tasks } from "@/data/tasks";
import Tasks from "@/components/home-screen/tasks-component";
import { useHeaderHeight } from "@react-navigation/elements";
import { Task } from "@/types";

const TaskScreen = () => {
  const headerHeight = useHeaderHeight();
  const tasks: Task[] = [];

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerTransparent: false,
          headerTitle: "Tasks",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: 5 }}>
              {/* light and dark mode color  */}
              {/* <Ionicons name="list" size={24} color={}/> */}
              {/* <Ionicons name="list" size={24} color="black" /> */}
            </TouchableOpacity>
          ),
        }}
      />
      <View 
      // style={{ paddingTop: headerHeight }}
      >
        <Tasks tasks={tasks} />
      </View>
    </ScrollView>
  );
};

export default TaskScreen;
