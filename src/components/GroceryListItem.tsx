// GroceryListItem.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const GroceryListItem = ({ item, onSwipeLeft }) => {
  const renderLeftActions = () => (
    <View style={styles.leftAction}>
      <Text style={styles.actionText}>Delete</Text>
    </View>
  );

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      onSwipeableLeftOpen={() => onSwipeLeft(item)}
    >
      <View style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.foodLabel}>{item.label}</Text>
          <Text style={styles.foodDetails}>{item.kcal} cal</Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    elevation: 1,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  leftAction: {
    backgroundColor: '#f44336', // red
    justifyContent: 'center',
    flex: 1,
    borderRadius: 10,
  },
  actionText: {
    color: 'white',
    padding: 20,
    fontWeight: '600',
  },
  foodLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  foodDetails: {
    color: 'dimgray',
    fontSize: 14,
    marginTop: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});

export default GroceryListItem;
