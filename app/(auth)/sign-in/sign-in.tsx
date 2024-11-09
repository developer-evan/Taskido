import React, { useState } from "react";
import { Text, View, Input, Button } from "tamagui";
import { TouchableOpacity, StyleSheet, ToastAndroid } from "react-native";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { handlelogin } from "@/utils/handlelogin"; // Ensure handlelogin properly handles errors
import { Colors } from "@/constants/Colors";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Use React Hook Form for managing form state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  // Configure the mutation with onSuccess and onError callbacks
  // const loginMutation = useMutation({
  //   mutationFn: async (data: SignInFormData) => handlelogin(data.email, data.password),
  //   onSuccess: (response) => {
  //     if (response === '200') {
  //       router.push('/(tabs)');
  //     } else {
  //       ToastAndroid.show('Invalid credentials, please try again.', ToastAndroid.SHORT);
  //     }
  //   },
  //   onError: (error) => {
  //     // Show a toast notification on error
  //     ToastAndroid.show('Login failed. Please try again.', ToastAndroid.SHORT);
  //     console.error('Login failed:', error);
  //   },
  // });
  const loginMutation = useMutation({
    mutationFn: async (data: SignInFormData) =>
      handlelogin(data.email, data.password),
    onSuccess: (response) => {
      if (response.success) {
        router.push("/(tabs)");
      } else {
        ToastAndroid.show(
          response.error || "Invalid credentials, please try again.",
          ToastAndroid.SHORT
        );
      }
    },
    onError: (error) => {
      ToastAndroid.show("Login failed. Please try again.", ToastAndroid.SHORT);
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (data: SignInFormData) => {
    // Trigger the mutation with form data
    loginMutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        rules={{ required: "Email is required" }}
        render={({ field: { onChange, value } }) => (
          <Input
            style={styles.input}
            placeholder="E-mail"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required" }}
        render={({ field: { onChange, value } }) => (
          <Input
            style={styles.input}
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry={!showPassword}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loginMutation.isPending}>
        <Text style={styles.buttonText}>{loginMutation.isPending ? 'Signing in...' : 'Sign in'}</Text>
      </TouchableOpacity>

      {/* <Button
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing in..." : "Sign in"}
      </Button> */}

      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => router.push("/sign-up/sign-up")}
        >
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    // borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    // color: '#000',
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#888",
  },
  link: {
     color: Colors.light.tint,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default SignIn;
