import React, { useState } from "react";
import { StyleSheet, ToastAndroid } from "react-native";
import { ScrollView, Text, Input, View, Button } from "tamagui";

import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskDetails } from "@/utils/getTaskDetails";
import updateTask from "@/utils/updateTask";
// import { updateTask } from "@/utils/updateTask"; // Assume this function is created for updating the task in the backend

const EditTask = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch the task details for the selected task
  const { data: task, isPending } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskDetails(id),
  });

  // Local state for the task's title and description
  const [title, setTitle] = useState(task?.task?.title || "");
  const [description, setDescription] = useState(task?.task?.description || "");
  const [completed, setCompleted] = useState(task?.task?.completed || false);

  // Mutation for updating the task
  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask: any) => {
      return updateTask(id, updatedTask); // API call to update the task
    },
    onSuccess: () => {
      // // // id
      queryClient.invalidateQueries({ queryKey: ["task"] });
      ToastAndroid.show("Task updated successfully", ToastAndroid.LONG);
      router.push("/tasks"); // Redirect back to tasks list after success
    },
    onError: (error: any) => {
      ToastAndroid.show(
        error?.response?.data?.message || "Something went wrong",
        ToastAndroid.LONG
      );
    },
  });

  const handleSubmit = () => {
    const updatedTask = {
      title,
      description,
      completed,
    };

    updateTaskMutation.mutate(updatedTask); // Trigger the update
  };

  if (isPending || !task) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Task Details",
          // headerStyle: { backgroundColor: "#1E90FF" },
          // headerTitleStyle: { color: "#fff" },
        }}
      />
      <Text style={styles.header}>Edit Task</Text>
      <Input
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Task Title"
      />
      <Input
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Task Description"
        multiline
      />
      <View style={styles.checkboxContainer}>
        <Text>Completed:</Text>
        {/* <Button
          title={completed ? "Yes" : "No"}
          onPress={() => setCompleted(!completed)}
        /> */}
        <Button onPress={() => setCompleted(!completed)}>
          {completed ? "Yes" : "No"}
        </Button>
      </View>

      {/* <Button title="Save Changes" onPress={handleSubmit} /> */}
      <Button onPress={handleSubmit} disabled={updateTaskMutation.isPending}>
        {updateTaskMutation.isPending ? "Updating..." : "Save Changes"}
      </Button>
    </ScrollView>
  );
};

export default EditTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
