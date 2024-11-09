import React from "react";
import { Text, View, Input, Button } from "tamagui";
import { TouchableOpacity, StyleSheet, ToastAndroid } from "react-native";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { handleSignUp } from "@/utils/handleSignUp";
import { Colors } from "@/constants/Colors";

interface SignUpFormData {
  email: string;
  password: string;
  username: string;
}

const SignUp = () => {
  const router = useRouter();

  // Use React Hook Form for managing form state and validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpFormData) =>
      handleSignUp(data.email, data.password, data.username),
    onSuccess: () => {
      ToastAndroid.show("Sign-up successful!", ToastAndroid.SHORT);
      router.push("/sign-in/sign-in"); // Navigate to sign-in after successful registration
    },
    onError: (error) => {
      ToastAndroid.show(
        "Sign-up failed. Please try again.",
        ToastAndroid.SHORT
      );
      console.error("Sign-up failed:", error);
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    signUpMutation.mutate(data); // Trigger the mutation with form data
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Username Input */}
      <Controller
        control={control}
        name="username"
        rules={{ required: "Username is required" }}
        render={({ field: { onChange, value } }) => (
          <Input
            style={styles.input}
            placeholder="Username"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.username && (
        <Text style={styles.error}>{errors.username.message}</Text>
      )}

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
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}
      {/* Sign Up Button */}
      {/* <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={signUpMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {signUpMutation.isPending ? "Signing up..." : "Sign up"}
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={signUpMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {signUpMutation.isPending ? "Signing up..." : "Sign up"}
        </Text>
      </TouchableOpacity>
      {/* <Button
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={signUpMutation.isPending}
      >
        {signUpMutation.isPending ? "Signing up..." : "Sign up"}
      </Button> */}

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => router.push("/sign-in/sign-in")}
        >
          Sign in
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
    // backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    // borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    // color: "#000",
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

export default SignUp;
