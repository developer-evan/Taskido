import React, { useState } from 'react';
import { Text, View, Input } from 'tamagui';
import { TouchableOpacity, StyleSheet, GestureResponderEvent, ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { handlelogin } from '@/utils/handlelogin';

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  // Configure the mutation with onSuccess and onError callbacks
  const loginMutation = useMutation({
    mutationFn: async () => handlelogin(values.email, values.password),
    onSuccess: (data) => {
      // Navigate to the tabs on successful login
      router.push('/(tabs)');
    },
    onError: (error) => {
      // Show a toast notification on error
      ToastAndroid.show('Login failed. Please try again.', ToastAndroid.SHORT);
      console.error('Login failed:', error);
    },
  });

  const handleSubmit = (e: GestureResponderEvent) => {
    e.preventDefault();
    // Trigger the mutation
    loginMutation.mutate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <Input
        style={styles.input}
        placeholder="E-mail"
        value={values.email}
        onChangeText={(text) => setValues({ ...values, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        style={styles.input}
        placeholder="Password"
        value={values.password}
        onChangeText={(text) => setValues({ ...values, password: text })}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loginMutation.isPending}>
        <Text style={styles.buttonText}>{loginMutation.isPending ? 'Signing in...' : 'Sign in'}</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don't have an account? <Text style={styles.link}>Register here</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
  link: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default SignIn;
