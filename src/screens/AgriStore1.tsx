import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AgriProduct } from './AgriProduct';

// Dummy Data for Categories and Products
const categories = [
  { id: '1', name: 'Fertilizers', image: 'https://cdn-icons-png.freepik.com/512/16119/16119938.png' },
  { id: '2', name: 'Seeds', image: 'https://cdn-icons-png.freepik.com/512/2227/2227504.png' },
  { id: '3', name: 'Equipment', image: 'https://img.freepik.com/premium-vector/agriculture-cultivator-icon-outline-vector-machine-farm-machinery-equipment-color-flat_96318-142042.jpg' },
  { id: '4', name: 'Pesticides', image: 'https://cdn-icons-png.flaticon.com/512/3812/3812820.png' },
];


// Category Screen
export const AgriStore1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AgriStore Provides</Text>
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('AgriProduct', { category: item.name })}
          >
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  categoryCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    elevation: 3,
  },
  categoryImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#777',
  },
  detailImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailPrice: {
    fontSize: 20,
    color: '#FF6347',
    marginBottom: 10,
  },
  detailDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: '#3A7523',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});