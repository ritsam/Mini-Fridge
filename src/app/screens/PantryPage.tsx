import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PantryPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantry/Inventory List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 }
});
