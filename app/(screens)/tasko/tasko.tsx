import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// import { useQuery } from 'react-query';

const fetchUsers = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data;
};

const TaskoScreen = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => fetchUsers(),
  });

  console.log(data, "ruto ni mbwa");

  //   if (isLoading) return <Text>Loading...</Text>;
  //   if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.email}>{item.phone}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#555",
  },
});

export default TaskoScreen;
