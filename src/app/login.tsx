import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Title, Button } from 'react-native-paper';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Welcome Back!</Title>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#777777"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#777777"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button mode="contained" style={styles.button} onPress={handleLogin}>
        Login
      </Button>

      {/* Add the "Sign Up" link */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>New User? </Text>
        <Link href="/signup" asChild>
          <Text style={styles.link}>Sign up here</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#777777',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#777777',
  },
  link: {
    fontSize: 16,
    color: '#6200ee',
  },
});
