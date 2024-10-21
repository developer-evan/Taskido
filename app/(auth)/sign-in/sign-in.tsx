import React, { useState } from 'react';
import axios from 'axios';
import { Text, View, Input } from 'tamagui';
import { TouchableOpacity, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);

    setLoading(true);
    try {
      console.log('Sending login request...');
      const response = await axios.post('http://192.168.100.114:8000/api/auth/login', {
        email,
        password,
      });

      console.log(response, 'Login response');

      // Check for successful response status
      if (response.status === 200) {
        // Alert.alert('Success', 'Login successful');
        ToastAndroid.show('Login successful', ToastAndroid.SHORT);
        router.push('/(tabs)');
      } else {
        // Alert.alert('Error', response.data?.message || 'Login failed');
        // console.log('Login failed:', response.data?.message);
        ToastAndroid.show(response.data?.message || 'Login failed', ToastAndroid.LONG);
      }
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <Input
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
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
