import {
  View,
  Text,
  ScrollView,
  XStack,
  YStack,
  Card,
  Button,
  Separator,
} from "tamagui";
import React from "react";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { tasks } from "@/data/tasks";
import { StyleSheet } from "react-native";

const TaskDetail = () => {
  const { id } = useLocalSearchParams();
  const task = tasks.find((task) => task.id === Number(id));

  const getStatusStyle = (status: any) => ({
    backgroundColor:
      status === "completed"
        ? "#2e8b57"
        : status === "progress"
        ? "purple"
        : "#f08080",
    color: "#fff",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  });

  if (!task) {
    return (
      <YStack f={1} ai="center" jc="center">
        <Text color="red" fontSize={18} fontWeight="bold">
          Task not found
        </Text>
      </YStack>
    );
  }

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerTitle: "Task Details",
          // headerStyle: { backgroundColor: "#1E90FF" },
          // headerTitleStyle: { color: "#fff" },
        }}
      />

      <YStack space>
        <Card key={task.id} style={styles.card}>
          <Text style={styles.title}>{task.title}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View style={styles.statusContainer}>
              <Text style={styles.label}>Status:</Text>
              <Text style={getStatusStyle(task.status)}>{task.status}</Text>
            </View>
            <View style={styles.dueDateContainer}>
              <Text style={styles.label}>Due date:</Text>
              <Text style={styles.dueDate}>
                {new Date(task.dueDate).toDateString()}
              </Text>
            </View>
          </View>
          {/* description  */}
          <Separator />
          <Text>{task.description}</Text>
        </Card>
      </YStack>
    </ScrollView>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  card: {
    width: 320,
    height: 180,
    borderRadius: 15,
    padding: 20,
    margin: 15,
    // backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: Colors.light.tint,
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "#333",
    marginBottom: 10,
  },
  statusContainer: {
    // flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
  },
  label: {
    fontSize: 14,
    // color: "#666",
  },
  dueDateContainer: {
    marginTop: 10,
  },
  dueDate: {
    fontSize: 14,
    color: "#2e8b57", // sea green color for due date
  },
});
