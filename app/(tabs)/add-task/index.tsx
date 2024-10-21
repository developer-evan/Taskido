import {
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React from "react";
import { View, Text, Button, Input, Label } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddNewTask } from "@/utils/addTask";
import { Colors } from "@/constants/Colors";
import { Plus } from "@tamagui/lucide-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useAuthInfo from "@/hooks/useAuthInfo";

interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
}

const AddTaskScreen = () => {
  const router = useRouter();
  const authInfo = useAuthInfo();
  const queryClient = useQueryClient();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null); // State to store selected date

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>();

  const addTask = useMutation({
    mutationFn: async (data: TaskFormData) => {
      return AddNewTask(data, authInfo.token ?? "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset();
      setSelectedDate(null); // Reset the selected date after task submission
      ToastAndroid.show("Task added successfully", ToastAndroid.SHORT);
      router.push("/tasks");
    },
    onError: (error: any) => {
      console.error("Error adding task:", error),
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

      <Label style={[styles.label]}>Due Date</Label>
      <Controller
        control={control}
        name="dueDate"
        rules={{ required: "Due date is required" }}
        render={({ field: { onChange } }) => (
          <>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                const dateString = date.toISOString();
                setSelectedDate(dateString); // Update state with selected date
                onChange(dateString);
                hideDatePicker();
              }}
              onCancel={hideDatePicker}
            />
            <Button onPress={showDatePicker} style={styles.input}>
              {selectedDate
                ? new Date(selectedDate).toDateString()
                : "Select Due Date"}
            </Button>
          </>
        )}
      />
      {errors.dueDate && (
        <Text style={styles.error}>{errors.dueDate.message}</Text>
      )}

      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={addTask.isPending}
        style={{
          backgroundColor: Colors.light.tint,
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
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
            <Plus size={20} color="#fff" />
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
    borderWidth: 1,
    borderColor: "#ccc",
  },
  textArea: {
    height: 100,
  },
  error: {
    color: "red",
    textAlign: "left",
    alignSelf: "flex-start",
  },
  selectedDateText: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
    alignSelf: "flex-start",
  },
});
