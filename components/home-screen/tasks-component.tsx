import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import {
  View,
  Text,
  TextStyle,
  Card,
  YStack,
  Separator,
  TextProps,
} from "tamagui";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUserTasks } from "@/utils/getTasks";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TasksProps {
  tasks: Task[];
}

const Tasks = ({ tasks }: TasksProps) => {
  const router = useRouter();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchUserTasks,
  });

  // const getStatusStyle = (completed: boolean): TextStyle => ({
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

  return (
    <View style={styles.container}>
      {(data ?? []).length > 0 ? (
        data?.map((task) => (
          <TouchableOpacity
            key={task._id}
            onPress={() => router.push(`/(screens)/task-details/${task._id}`)}
          >
            <YStack space>
              <Card key={task._id} style={styles.card}>
                <Text style={styles.title}>{task.title}</Text>
                {/* <Text
                  style={{
                    marginBottom: 10,
                  }}
                >
                  {task.description}
                </Text> */}
                <Text
                  numberOfLines={1}
                  style={{
                    marginBottom: 10,
                  }}
                >
                  {task.description}
                </Text>
                <Separator />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  <View style={styles.statusContainer}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={getStatusStyle(task.completed)}>
                      {task.completed ? "Completed" : "Not Completed"}
                    </Text>
                  </View>
                  <View style={styles.dueDateContainer}>
                    <Text style={styles.label}>Due date:</Text>
                    <Text style={styles.dueDate}>
                      {new Date(task.createdAt).toDateString()}
                    </Text>
                  </View>
                </View>
              </Card>
            </YStack>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No tasks available</Text>
      )}
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
  },
  card: {
    width: 320,
    height: "auto",
    borderRadius: 15,
    padding: 20,
    margin: 15,
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statusContainer: {
    justifyContent: "center",
    marginTop: "auto",
  },
  label: {
    fontSize: 14,
  },
  dueDateContainer: {
    marginTop: 10,
  },
  dueDate: {
    fontSize: 14,
    color: "#2e8b57", // sea green color for due date
  },
});
