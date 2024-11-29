import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const FoodLogListItem = ({ item, onSwipeLeft, onSwipeRight }) => {
  const renderLeftActions = () => (
    <TouchableOpacity style={styles.leftAction} onPress={() => onSwipeLeft(item)}>
      <Text style={styles.actionText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderRightActions = () => (
    <TouchableOpacity style={styles.rightAction} onPress={() => onSwipeRight(item)}>
      <Text style={styles.actionText}>Add to Grocery</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      <View style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flex: 1, gap: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.label}</Text>
          <Text style={{ color: 'dimgray' }}>{item.kcal} cal</Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f8',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    flex: 1,
  },
  rightAction: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  actionText: {
    color: 'white',
    padding: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default FoodLogListItem;
