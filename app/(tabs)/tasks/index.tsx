import { View, Text, Image, ScrollView } from "tamagui";
import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tasks } from "@/data/tasks";
import Tasks from "@/components/home-screen/tasks-component";
import { useHeaderHeight } from "@react-navigation/elements";

const TaskScreen = () => {
  const headerHeight = useHeaderHeight();

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "Tasks",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: 5 }}>
              <Ionicons name="list" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={{ paddingTop: headerHeight }}>
        {/* <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#f2f2f2",
          }}
        >
          Tasks
        </Text> */}
        <Tasks tasks={tasks} />
      </View>
    </ScrollView>
  );
};

export default TaskScreen;
