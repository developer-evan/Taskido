import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { View, Text, Card, YStack, Separator, H4, TextProps } from "tamagui";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUserTasks } from "@/utils/getTasks";
import { Task } from "@/types";
import { Colors } from "@/constants/Colors";
import { act } from "react-test-renderer";

const Tasks = ({ tasks }: { tasks: Task[] }) => {
  const router = useRouter();
  const [filter, setFilter] = useState("All"); // State for filter

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchUserTasks,
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
    data?.filter((task) => task.completed).length ?? 0;
  const incompleteTasksCount = totalTasks - completedTasksCount;

  const filteredTasks = (data ?? []).filter((task) => {
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

  return (
    <View style={styles.container}>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "All" && styles.activeFilterButton,
          ]}
          onPress={() => setFilter("All")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "All" && styles.activeFilterText,
            ]}
          >
            All ({totalTasks})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "Completed" && styles.activeFilterButton,
          ]}
          onPress={() => setFilter("Completed")}
        >
          {/* <Text style={styles.filterText}>Completed</Text> */}
          <Text
            style={[
              styles.filterText,
              filter === "Completed" && styles.activeFilterText,
            ]}
          >
            Completed ({completedTasksCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "Incomplete" && styles.activeFilterButton,
          ]}
          onPress={() => setFilter("Incomplete")}
        >
          {/* <Text style={styles.filterText}>Incomplete</Text> */}
          <Text
            style={[
              styles.filterText,
              filter === "Incomplete" && styles.activeFilterText,
            ]}
          >
            Incomplete ({incompleteTasksCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TouchableOpacity
            key={task._id}
            onPress={() => router.push(`/(screens)/task-details/${task._id}`)}
          >
            <YStack space>
              <Card key={task._id} style={styles.card}>
                <Text style={styles.title}>{task.title}</Text>
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
                      {/* {new Date(task.createdAt).toDateString()} */}
                      {new Date(task.dueDate).toDateString()}
                    </Text>
                  </View>
                </View>
              </Card>
            </YStack>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noTaskText}>No tasks available</Text>
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
  filterContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#2e8b57",
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activeFilterButton: {
    backgroundColor: "#2e8b57",
  },
  activeFilterText: {
    color: "#fff",
  },

  filterText: {
    color: "#2e8b57",
    fontWeight: "600",
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
    color: "#2e8b57",
  },
  noTaskText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    color: "#888",
  },
});
