// grocery-list.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GroceryListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Grocery List Screen</Text>
      {/* Add your grocery list components here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 24,
  },
});
