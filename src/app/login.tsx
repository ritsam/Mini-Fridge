import React, { useState, useEffect } from 'react';
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
      <Title style={styles.title}>Welcome to MiniFridge</Title>
      <TypingText />
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
      <View style={styles.footer}>
        <Text style={styles.footerText}>New User? </Text>
        <Link href="/signup" asChild>
          <Text style={styles.link}>Sign up here</Text>
        </Link>
      </View>
    </View>
  );
}

function TypingText() {
  const words = ['apples', 'bananas', 'carrots', 'milk', 'bread'];
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const typingSpeed = 150; 

  useEffect(() => {
    let timeout;
    const currentWord = words[currentWordIndex];
    const fullText = 'Add ' + currentWord;

    if (!isDeleting) {
      if (charIndex <= fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.substring(0, charIndex));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        // Wait before starting to delete
        timeout = setTimeout(() => {
          setIsDeleting(true);
          setCharIndex(fullText.length - 1);
        }, 1000);
      }
    } else {
      if (charIndex >= 0) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.substring(0, charIndex));
          setCharIndex(charIndex - 1);
        }, typingSpeed / 2);
      } else {
        // Move to next word
        setIsDeleting(false);
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
        setCharIndex(0);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting]);

  return (
    <Text style={styles.typingText}>
      {displayText}
      <Text style={styles.cursor}>|</Text>
    </Text>
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
    marginBottom: 10, 
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  typingText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  cursor: {
    fontSize: 24,
    color: '#6200ee',
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
