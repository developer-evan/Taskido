import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { View, Text, TextStyle, Card } from "tamagui";
import { Task } from "@/data/tasks";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

const Tasks = ({ tasks }: { tasks: Task[] }) => {
  const router = useRouter();
  const getStatusStyle = (status: any): TextStyle => ({
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
  return (
    <View style={styles.container}>
      {tasks.map((task) => (
        <TouchableOpacity
          key={task.id}
          onPress={() => router.push(`/(screens)/task-details/${task.id}` as any)}
        >
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
          </Card>
        </TouchableOpacity>
      ))}
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
