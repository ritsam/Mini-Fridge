import { View, Text, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const FoodLogListItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.label}</Text>
        <Text style={{ color: 'dimgray' }}>{item.kcal} cal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f8',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default FoodLogListItem;