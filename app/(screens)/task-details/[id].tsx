import {
  View,
  Text,
  ScrollView,
  XStack,
  YStack,
  Card,
  Button,
  Separator,
  TextStyle,
  TextProps,
  Dialog,
  Unspaced,
} from "tamagui";
import React from "react";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { tasks } from "@/data/tasks";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { getTaskDetails } from "@/utils/getTaskDetails";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Task } from "@/types";
import { deleteTask } from "@/utils/deleteTaskData";
import { Colors } from "@/constants/Colors";
import { Pen, Trash, X } from "@tamagui/lucide-icons";
import { set } from "react-hook-form";
import useAuthInfo from "@/hooks/useAuthInfo";

const TaskDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const authInfo = useAuthInfo();

  const TaskData = useQuery({
    queryKey: ["user", id],
    queryFn: () => getTaskDetails(id, authInfo?.token?? "", authInfo?.user_id?? ""),
  });

  const { data: task, isPending, error } = TaskData;
  console.log(task, "ruto fala sana ");

  // delete tasks logic here
  // use this endpoint deleteTask/{id} to delete a task
  // use the deleteTask function from the utils folder
  // use the useMutation hook to delete the task
  // use the onSuccess and onError callbacks to handle the response
  // invalidate the tasks query after deleting the task
  // use the router to navigate back to the tasks screen
  const deleteTaskData = useMutation({
    mutationFn: async (id: string | string[]) => {
      return deleteTask(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      ToastAndroid.show("Task deleted successfully", ToastAndroid.SHORT);
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

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  // const getStatusStyle = (completed: boolean): TextStyle => ({
  // const getStatusStyle = (completed: boolean): StyleProp<TextStyle> => ({
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

  if (isPending) {
    return (
      <YStack f={1} ai="center" jc="center">
        <ActivityIndicator size="large" color="#f08080" />
      </YStack>
    );
  }

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
      <Stack.Screen />

      <YStack space>
        {/* Ensure that the task._id is used as a key to make it unique */}
        <Card key={task._id} style={styles.card}>
          <Text style={styles.title}>{task.task?.title}</Text>
          <Text style={{ marginBottom: 10 }}>{task.task?.description}</Text>
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
              <Text style={getStatusStyle(task.task?.completed)}>
                {task.task?.completed ? "Completed" : "Not Completed"}
              </Text>
            </View>
            <View style={styles.dueDateContainer}>
              <Text style={styles.label}>Due date:</Text>
              <Text style={styles.dueDate}>
                {new Date(task.task?.createdAt).toDateString()}
              </Text>
            </View>
          </View>
        </Card>        
      </YStack>

      <YStack
        space
        style={{
          display: "flex",
          flexDirection: "row",
          width: 320,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <Button
          onPress={() => {
            router.push(`/(screens)/edit-task/${id}`);
          }}
          style={{
            width: "45%",
            marginLeft: 10,
            backgroundColor: Colors.light.tint,
            color: Colors.light.background,
          }}
          icon={Pen}
        >
          Edit Task
        </Button>
        <Button
          onPress={handleDeleteClick}
          style={{
            width: "45%",
            backgroundColor: "#f08080",
            color: Colors.light.background,
          }}
          icon={Trash}
        >
          Delete
        </Button>
      </YStack>

      {isDeleteModalOpen && (
        <Dialog
          open={isDeleteModalOpen}
          onOpenChange={() => setIsDeleteModalOpen(false)}
        >
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>Delete Task</Dialog.Title>
              <Dialog.Description>
                Are you sure you want to delete this task?
              </Dialog.Description>
              <XStack>
                <Button
                  onPress={() => {
                    deleteTaskData.mutate(id);
                    setIsDeleteModalOpen(false);
                  }}
                  style={{
                    width: "100%",
                    marginTop: 10,
                    backgroundColor: "#f08080",
                    color: Colors.light.background,
                  }}
                >
                  {deleteTaskData.isPending ? "Deleting..." : "Delete"}
                </Button>
              </XStack>
              <Unspaced>
                <Dialog.Close asChild>
                  <Button
                    position="absolute"
                    top="$3"
                    right="$3"
                    size="$2"
                    circular
                    icon={X}
                  />
                </Dialog.Close>
              </Unspaced>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      )}
    </ScrollView>
  );
};

export default TaskDetail;

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
