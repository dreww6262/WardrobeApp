import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../types/navigation';

type Props = BottomTabScreenProps<RootTabParamList, 'UploadWardrobe'>;

interface ClothingItem {
  id: string;
  uri: string;
  type: string;
  category?: string;
}

const UploadWardrobe: React.FC<Props> = () => {
  const [wardrobeItems, setWardrobeItems] = useState<ClothingItem[]>([]);

  const selectImage = async () => {
    Alert.alert(
      'Add Clothing Item',
      'Choose how to add your item',
      [
        {
          text: 'Take Photo',
          onPress: () => captureImage(),
        },
        {
          text: 'Choose from Library',
          onPress: () => pickImage(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const captureImage = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0]) {
      addItemToWardrobe(result.assets[0].uri!);
    }
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0]) {
      addItemToWardrobe(result.assets[0].uri!);
    }
  };

  const addItemToWardrobe = (uri: string) => {
    const newItem: ClothingItem = {
      id: Date.now().toString(),
      uri,
      type: 'clothing', // You can expand this with categories
    };
    setWardrobeItems((prev) => [...prev, newItem]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={selectImage}>
        <Text style={styles.addButtonText}>+ Add Clothing Item</Text>
      </TouchableOpacity>

      <FlatList
        data={wardrobeItems}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.uri }} style={styles.itemImage} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Start by adding your first clothing item
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  itemContainer: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default UploadWardrobe;
