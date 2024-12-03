// index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import FoodLogListItem from '../../components/FoodLogListItem';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';

const QUERY_FOOD_LOGS = gql`
  query foodLogsForUser($user_id: String!) {
    foodLogsForUser(user_id: $user_id) {
      food_id
      user_id
      created_at
      label
      kcal
      id
      image
    }
  }
`;

const DELETE_FOOD_LOG = gql`
  mutation deleteFood_logById($id: Int!) {
    deleteFood_logById(id: $id) {
      id
    }
  }
`;

const INSERT_GROCERY_LIST = gql`
  mutation insertGrocery_list(
    $user_id: String
    $label: String
    $kcal: Int
    $image: String
    $food_id: String
  ) {
    insertGrocery_list(
      user_id: $user_id
      label: $label
      kcal: $kcal
      image: $image
      food_id: $food_id
    ) {
      id
    }
  }
`;

export default function HomeScreen() {
  const user_id = 'krish'; // Replace with dynamic user ID if necessary
  const { data, loading, error, refetch } = useQuery(QUERY_FOOD_LOGS, {
    variables: { user_id },
  });

  const [deleteFoodLog] = useMutation(DELETE_FOOD_LOG);
  const [insertGroceryList] = useMutation(INSERT_GROCERY_LIST);

  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#6200ee" />;
  if (error) return <Text>Failed to fetch data: {error.message}</Text>;

  const handleSwipeLeft = async (item) => {
    try {
      await deleteFoodLog({ variables: { id: item.id } });
      refetch(); // Refresh the list
    } catch (err) {
      console.error('Error deleting food log:', err);
    }
  };

  const handleSwipeRight = async (item) => {
    try {
      await deleteFoodLog({ variables: { id: item.id } });
      await insertGroceryList({
        variables: {
          user_id: item.user_id,
          label: item.label,
          kcal: item.kcal,
          image: item.image,
          food_id: item.food_id,
        },
      });
      refetch(); // Refresh the list
    } catch (err) {
      console.error('Error moving item to grocery list:', err);
    }
  };

  // Filter the data based on the search query
  const filteredData = data.foodLogsForUser.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>My Inventory</Text>
        <Link href="/search" asChild>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Add Food</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <Searchbar
        placeholder="Search inventory..."
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
          <FoodLogListItem
            item={item}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
        )}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600',
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
