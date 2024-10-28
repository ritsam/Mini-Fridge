import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile & Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 }
});
