import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import FoodLogListItem from '../../components/FoodLogListItem';
import { Link } from 'expo-router';

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

  if (loading) return <ActivityIndicator />;
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

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>My Inventory</Text>
        <Link href="/search" asChild>
          <Button title="ADD FOOD" />
        </Link>
      </View>
      <FlatList
        data={data.foodLogsForUser}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => (
          <FoodLogListItem
            item={item}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
    color: 'dimgray',
  },
});
