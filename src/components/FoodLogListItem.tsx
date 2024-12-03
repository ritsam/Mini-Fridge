// FoodLogListItem.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const FoodLogListItem = ({ item, onSwipeLeft, onSwipeRight }) => {
  const renderLeftActions = () => (
    <View style={styles.leftAction}>
      <Text style={styles.actionText}>Delete</Text>
    </View>
  );

  const renderRightActions = () => (
    <View style={styles.rightAction}>
      <Text style={styles.actionText}>Add to Grocery</Text>
    </View>
  );

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      onSwipeableLeftOpen={() => onSwipeLeft(item)}
      renderRightActions={renderRightActions}
      onSwipeableRightOpen={() => onSwipeRight(item)}
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
  rightAction: {
    backgroundColor: '#4caf50', // green
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
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

export default FoodLogListItem;
