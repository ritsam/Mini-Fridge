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
import { useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Svg, Rect } from 'react-native-svg';

const query = gql`
  query search($ingr: String, $upc: String) {
    search(ingr: $ingr, upc: $upc) {
      text
      hints {
        food {
          label
          brand
          foodId
          image
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
  const [barcodeBounds, setBarcodeBounds] = useState(null);
  const [cameraLayout, setCameraLayout] = useState({ width: 0, height: 0 });
  const [isProcessingBarcode, setIsProcessingBarcode] = useState(false);

  const [runSearch, { data, loading, error }] = useLazyQuery(query);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (scannerEnabled) {
      setIsProcessingBarcode(false);
      setBarcodeBounds(null);
    }
  }, [scannerEnabled]);

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
          style={{ flex: 1 }}
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setCameraLayout({ width, height });
          }}
          onBarcodeScanned={(scanningResult) => {
            if (!isProcessingBarcode) {
              setIsProcessingBarcode(true);
              console.log(scanningResult);
              setBarcodeBounds(scanningResult.bounds);
              runSearch({ variables: { upc: scanningResult.data } });
              setTimeout(() => {
                setScannerEnabled(false);
              }, 500); // Delay to show the rectangle
            }
          }}
        >
          {barcodeBounds && cameraLayout.width > 0 && cameraLayout.height > 0 && (
            <Svg
              style={{ position: 'absolute', top: 0, left: 0 }}
              width={cameraLayout.width}
              height={cameraLayout.height}
            >
              <Rect
                x={barcodeBounds.origin.x}
                y={barcodeBounds.origin.y}
                width={barcodeBounds.size.width}
                height={barcodeBounds.size.height}
                fill="none"
                stroke="#39FF14" // Neon green color
                strokeWidth="2"
                rx="10"
                ry="10"
              />
            </Svg>
          )}
        </CameraView>
        <Ionicons
          onPress={() => {
            setScannerEnabled(false);
            setBarcodeBounds(null);
            setIsProcessingBarcode(false);
          }}
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
          onPress={() => {
            setScannerEnabled(true);
            setIsProcessingBarcode(false);
          }}
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


