// grocery.tsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import GroceryListItem from '../../components/GroceryListItem';
import { Searchbar } from 'react-native-paper';

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

  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Ensure data is defined before proceeding
  const groceryData = data?.groceryListForUser || [];

  // Filter the data based on the search query
  const filteredData = groceryData.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#6200ee" />;
  if (error) return <Text>Failed to fetch data: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Grocery List</Text>
      <Searchbar
        placeholder="Search grocery list..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
        iconColor="#6200ee"
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <GroceryListItem item={item} onSwipeLeft={handleSwipeLeft} />
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={<Text style={styles.emptyText}>No items found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  searchBar: {
    marginBottom: 10,
    borderRadius: 10,
  },
  searchInput: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
    fontSize: 16,
  },
});
