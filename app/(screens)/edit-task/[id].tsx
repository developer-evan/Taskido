import React, { useState } from "react";
import { StyleSheet, ToastAndroid } from "react-native";
import { ScrollView, Text, Input, View, Button, Label, Switch } from "tamagui";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskDetails } from "@/utils/getTaskDetails";
import updateTask from "@/utils/updateTask";
import { Colors } from "@/constants/Colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useAuthInfo from "@/hooks/useAuthInfo";

const EditTask = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const authInfo = useAuthInfo();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const { data: task, isPending } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskDetails(id),
  });

  const [localTask, setLocalTask] = useState({
    title: task?.task?.title || "",
    description: task?.task?.description || "",
    dueDate: task?.task?.dueDate || "",
    completed: task?.task?.completed || false,
  });

  if (task && !localTask.title && !localTask.description) {
    setLocalTask({
      title: task.task.title || "",
      description: task.task.description || "",
      dueDate: task.task.dueDate || "",
      completed: task.task.completed || false,
    });
  }

  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask: any) => {
      return updateTask(id, updatedTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      ToastAndroid.show("Task updated successfully", ToastAndroid.LONG);
      router.push("/tasks");
    },
    onError: (error: any) => {
      ToastAndroid.show(
        error?.response?.data?.message || "Something went wrong",
        ToastAndroid.LONG
      );
    },
  });

  const handleInputChange = (key: string, value: string) => {
    setLocalTask((prevTask) => ({
      ...prevTask,
      [key]: value,
    }));
  };

  const handleCompletedToggle = () => {
    setLocalTask((prevTask) => ({
      ...prevTask,
      completed: !prevTask.completed,
    }));
  };

  const handleSubmit = () => {
    const updatedTask = {
      title: localTask.title,
      description: localTask.description,
      dueDate: localTask.dueDate,
      completed: localTask.completed,
    };
    updateTaskMutation.mutate(updatedTask);
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
      <Text style={styles.header}>Update Task</Text>
      <Label>Task Title</Label>
      <Input
        style={styles.input}
        value={localTask.title}
        onChangeText={(value) => handleInputChange("title", value)}
        placeholder="Task Title"
      />
      <Label>Task Description</Label>
      <Input
        style={styles.input}
        value={localTask.description}
        onChangeText={(value) => handleInputChange("description", value)}
        placeholder="Task Description"
        multiline
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setLocalTask((prevTask) => ({
            ...prevTask,
            dueDate: date.toISOString(), // or use date.toDateString() if preferred
          }));
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
      />

      <Label>Task Due Date</Label>
      <Button onPress={showDatePicker} style={styles.input}>
        {localTask.dueDate
          ? new Date(localTask.dueDate).toDateString()
          : "Select Due Date"}
      </Button>

      <Label>Task Status</Label>
      <View style={styles.checkboxContainer}>
        <Text onPress={handleCompletedToggle}>
          {localTask.completed ? "Completed" : "Not Completed"}
        </Text>

        <Switch
          onCheckedChange={handleCompletedToggle}
          checked={localTask.completed}
          style={{
            backgroundColor: localTask.completed ? Colors.light.tint : "#ccc",

            color: "#fff",
          }}
          size="$4"
        >
          {/* <Text>{localTask.completed ? "Yes" : "No"}</Text> */}
          <Switch.Thumb animation="bouncy" />
        </Switch>

        <Button
          onPress={handleCompletedToggle}
          style={{
            backgroundColor: localTask.completed ? Colors.light.tint : "#ccc",
            padding: 10,
            borderRadius: 5,
            marginLeft: 10,
            color: "#fff",
            display: "none",
          }}
        >
          {localTask.completed ? "Yes" : "No"}
        </Button>
      </View>

      <Button
        onPress={handleSubmit}
        disabled={updateTaskMutation.isPending}
        style={{
          backgroundColor: Colors.light.tint,
          padding: 10,
          borderRadius: 5,
          fontWeight: "bold",
          width: "100%",
          alignItems: "center",
          color: "#fff",
        }}
      >
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
  },
  header: {
    fontSize: 18,
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
