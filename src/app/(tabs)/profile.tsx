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
    email: 'krish@ufl.com',
    image: 'https://example.com/profile.jpg', 
  };

  const handleSignOut = () => {
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfoSection}>
        <Avatar.Image source={{ uri: user.image }} size={100} />
        <Title style={styles.title}>{user.name}</Title>
        <Caption style={styles.caption}>{user.username}</Caption>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.row}>
          <Ionicons name="mail-outline" color="#777777" size={20} />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="location-outline" color="#777777" size={20} />
          <Text style={styles.infoText}>Gainesville, FL</Text>
        </View>
      </View>

      <Divider style={{ marginVertical: 20 }} />

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
    backgroundColor: '#fff',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    marginBottom: 20,
  },
  title: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#777777',
  },
  infoSection: {
    paddingHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  infoText: {
    color: '#777777',
    marginLeft: 20,
    fontSize: 16,
  },
  menuWrapper: {
    paddingHorizontal: 30,
  },
  menuItem: {
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonContent: {
    flexDirection: 'row-reverse',
  },
});
