// FoodListItem.tsx
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';

const mutation = gql`
  mutation MyMutation(
    $food_id: String!
    $kcal: Int!
    $label: String!
    $user_id: String!
    $image: String!
  ) {
    insertFood_log(
      food_id: $food_id
      kcal: $kcal
      label: $label
      user_id: $user_id
      image: $image
    ) {
      created_at
      food_id
      id
      kcal
      label
      user_id
      image
    }
  }
`;

const FoodListItem = ({ item }) => {
  const [logFood] = useMutation(mutation, {
    refetchQueries: ['foodLogsForDate'],
  });
  const router = useRouter();

  const onPlusPressed = async () => {
    await logFood({
      variables: {
        food_id: item.food.foodId,
        kcal: item.food.nutrients.ENERC_KCAL,
        label: item.food.label,
        user_id: 'krish',
        image: item.food.image,
      },
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.food.image }}
        style={styles.image}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.foodLabel}>{item.food.label}</Text>
        <Text style={styles.foodDetails}>
          {Math.round(item.food.nutrients.ENERC_KCAL)} cal{item.food.brand ? `, ${item.food.brand}` : ''}
        </Text>
      </View>
      <TouchableOpacity onPress={onPlusPressed} style={styles.addButton}>
        <AntDesign
          name="plus"
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
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
  addButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 30,
    marginLeft: 10,
  },
});

export default FoodListItem;
