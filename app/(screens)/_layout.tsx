import { Stack } from "expo-router";

export default function TaskDetailsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="task-details/[id]"
        options={{ headerShown: true, headerTitle: "Task Details" }}
      />
      <Stack.Screen
        name="edit-task/[id]"
        options={{ headerTitle: "Edit Task" }}
      />
      {/* edit-profile  */}
      <Stack.Screen
        name="edit-profile/edit-profile"
        options={{ headerShown: true, title: "Edit Profile" }}
      />
    </Stack>
  );
}
