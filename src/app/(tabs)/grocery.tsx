// grocery.tsx
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import GroceryListItem from '../../components/GroceryListItem'; // Adjust the path

const QUERY_GROCERY_LIST = gql`
  query groceryListForUser($user_id: String!) {
    groceryListForUser(user_id: $user_id) {
      id
      user_id
      label
      kcal
      image
      food_id
    }
  }
`;

const DELETE_GROCERY_ITEM = gql`
  mutation deleteGroceryItemById($id: Int!) {
    deleteGroceryItemById(id: $id) {
      id
    }
  }
`;

export default function GroceryListScreen() {
  const user_id = 'krish'; // Replace with dynamic user ID if necessary
  const { data, loading, error, refetch } = useQuery(QUERY_GROCERY_LIST, {
    variables: { user_id },
  });

  const [deleteGroceryItem] = useMutation(DELETE_GROCERY_ITEM);
  const [refreshing, setRefreshing] = useState(false);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Failed to fetch data: {error.message}</Text>;

  const handleSwipeLeft = async (item) => {
    try {
      await deleteGroceryItem({ variables: { id: item.id } });
      refetch(); // Refresh the list
    } catch (err) {
      console.error('Error deleting grocery item:', err);
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>My Grocery List</Text>
      <FlatList
        data={data.groceryListForUser}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => (
          <GroceryListItem item={item} onSwipeLeft={handleSwipeLeft} />
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'dimgray',
    marginBottom: 10,
  },
});
