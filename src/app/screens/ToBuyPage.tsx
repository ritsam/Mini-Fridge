import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ToBuyPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>To Buy List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 }
});
