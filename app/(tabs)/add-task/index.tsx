import { StyleSheet, TextInput, Alert, ActivityIndicator, ToastAndroid } from "react-native";
import React from "react";
import { View, Text, Button, Input, Label } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddNewTask } from "@/utils/addTask";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
// import { AddTask as postNewTask } from "";  // Import the AddTask function properly

interface TaskFormData {
  title: string;
  description: string;
}

const AddTaskScreen = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>();

  const addTask = useMutation({
    mutationFn: async (data: TaskFormData) => {
      return AddNewTask(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"]});
      reset();
      // Alert.alert("Task added successfully");
      // add ccolor to the toast
      ToastAndroid.show("Task added successfully", ToastAndroid.SHORT);
      router.push("/tasks");
    },
    onError: (error: any) => {
      // Alert.alert(
      //   "Error",
      //   error?.response?.data?.message || "Something went wrong"
      // );
      ToastAndroid.show(
        error?.response?.data?.message || "Something went wrong",
        ToastAndroid.LONG
      );
    },
  });

  const onSubmit = (data: TaskFormData) => {
    addTask.mutate(data);
  };

  return (
    <View style={styles.container}>
      <Label style={[styles.label]}>Task Title</Label>
      <Controller
        control={control}
        name="title"
        rules={{ required: "Task title is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={styles.input}
            placeholder="Task Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

      <Label style={[styles.label]}>Task Description</Label>
      <Controller
        control={control}
        name="description"
        rules={{ required: "Task description is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={[styles.input, styles.textArea]}
            placeholder="Task Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
            numberOfLines={4}
          />
        )}
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description.message}</Text>
      )}

      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={addTask.isPending}
        style={{
          backgroundColor: Colors.light.tint,
          padding: 10,
          borderRadius: 5,
          width: "100%",
          alignItems: "center",
        }}
      >
        {addTask.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              fontSize: 16,
              fontWeight: "bold",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="add"
              size={20}
              color="#fff"
              style={{
                fontWeight: "bold",
              }}
            />
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 8,
              }}
            >
              Add Task
            </Text>
          </View>
        )}
      </Button>
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
  error: {
    color: "red",
    textAlign: "left",
    alignSelf: "flex-start",
  },
});
