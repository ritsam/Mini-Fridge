// profile.tsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Title, Caption, Text, Button, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const user = {
    name: 'Krish Talati',
    username: '@krishtalati',
    email: 'krishtalati@ufl.edu',
    image: 'https://i.postimg.cc/8zch8CWp/Florida-Gators-gator-logo-svg.png', // Use a valid image URL
  };

  const handleSignOut = () => {
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{ uri: user.image }}
            size={100}
            style={styles.avatar}
          />
          <Title style={styles.title}>{user.name}</Title>
          <Caption style={styles.caption}>{user.username}</Caption>
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.row}>
          <Ionicons name="mail-outline" color="#6200ee" size={24} />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="location-outline" color="#6200ee" size={24} />
          <Text style={styles.infoText}>Gainesville, FL</Text>
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.menuWrapper}>
        <Button
          icon="exit-to-app"
          mode="contained"
          contentStyle={styles.buttonContent}
          style={styles.menuItem}
          onPress={handleSignOut}
        >
          Sign Out
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#6200ee',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoSection: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
  },
  caption: {
    fontSize: 16,
    lineHeight: 16,
    color: '#ddd',
  },
  infoSection: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'center',
  },
  infoText: {
    color: '#333',
    marginLeft: 20,
    fontSize: 18,
  },
  divider: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  menuWrapper: {
    paddingHorizontal: 30,
    marginTop: 10,
  },
  menuItem: {
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonContent: {
    height: 50,
    alignItems: 'center',
  },
});
