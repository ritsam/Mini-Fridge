// import {
//     StyleSheet,
//     Text,
//     View,
//     FlatList,
//     TextInput,
//     Button,
//     ActivityIndicator,
//   } from 'react-native';
//   import FoodListItem from '../../components/FoodListItem';
//   import { useState } from 'react';
//   import { gql, useLazyQuery } from '@apollo/client';
  
//   const query = gql`
//     query search($ingr: String) {
//       search(ingr: $ingr) {
//         text
//         hints {
//           food {
//             label
//             brand
//             foodId
//             nutrients {
//               ENERC_KCAL
//             }
//           }
//         }
//       }
//     }
//   `;
  
//   export default function SearchScreen() {
//     const [search, setSearch] = useState('');
  
//     const [runSearch, { data, loading, error }] = useLazyQuery(query);
  
//     const performSearch = () => {
//       runSearch({ variables: { ingr: search } });
//       // setSearch('');
//     };
  
//     // if (loading) {
//     //   return <ActivityIndicator />;
//     // }
  
//     if (error) {
//       return <Text>Failed to search</Text>;
//     }
  
//     const items = data?.search?.hints || [];
  
//     return (
//       <View style={styles.container}>
//         <TextInput
//           value={search}
//           onChangeText={setSearch}
//           placeholder="Search..."
//           style={styles.input}
//         />
//         {search && <Button title="Search" onPress={performSearch} />}
  
//         {loading && <ActivityIndicator />}
//         <FlatList
//           data={items}
//           renderItem={({ item }) => <FoodListItem item={item} />}
//           ListEmptyComponent={() => <Text>Search a food</Text>}
//           contentContainerStyle={{ gap: 5 }}
//         />
//       </View>
//     );
//   }
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       padding: 10,
//       gap: 10,
//     },
//     input: {
//       backgroundColor: '#f2f2f2',
//       padding: 10,
//       borderRadius: 20,
//     },
//   });



import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import FoodListItem from '../../components/FoodListItem';
import { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';

const query = gql`
  query search($ingr: String, $upc: String) {
    search(ingr: $ingr, upc: $upc) {
      text
      hints {
        food {
          label
          brand
          foodId
          nutrients {
            ENERC_KCAL
          }
        }
      }
    }
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [scannerEnabled, setScannerEnabled] = useState(false);

  const [runSearch, { data, loading, error }] = useLazyQuery(query);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const performSearch = () => {
    runSearch({ variables: { ingr: search } });
  };

  if (error) {
    return <Text>Failed to search</Text>;
  }

  if (scannerEnabled) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView
          style={{ width: '100%', height: '100%' }}
          onBarcodeScanned={(scanningResult) => {
            console.log(scanningResult);
            runSearch({ variables: { upc: scanningResult.data } });
            setScannerEnabled(false);
          }}
        />
        <Ionicons
          onPress={() => setScannerEnabled(false)}
          name="close"
          size={30}
          color="dimgray"
          style={{ position: 'absolute', right: 10, top: 10 }}
        />
      </View>
    );
  }

  const items = data?.search?.hints || [];

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search..."
          style={styles.input}
        />
        <Ionicons
          onPress={() => setScannerEnabled(true)}
          name="barcode-outline"
          size={32}
          color="dimgray"
        />
      </View>
      {search && <Button title="Search" onPress={performSearch} />}

      {loading && <ActivityIndicator />}
      <FlatList
        data={items}
        renderItem={({ item }) => <FoodListItem item={item} />}
        ListEmptyComponent={() => <Text>Search a food</Text>}
        contentContainerStyle={{ gap: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    gap: 10,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 20,
    flex: 1,
  },
});
