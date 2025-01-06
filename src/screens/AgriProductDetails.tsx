import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

  // Product Details Screen
  export const AgriProductDetail = ({ route }) => {
    const { product } = route.params;
  
    return (
      <View style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.detailImage} />
        <Text style={styles.detailName}>{product.name}</Text>
        <Text style={styles.detailPrice}>{product.price}</Text>
        <Text style={styles.detailDescription}>{product.description}</Text>
        <Text style={styles.detailDescription}>Brand: {product.brand}</Text>
        <Text style={styles.detailDescription}>Item Weight: {product.weight}</Text>
        <Text style={styles.detailDescription}>Item Form: {product.form}</Text>
        

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => Alert.alert('Purchase Successful', `You have purchased ${product.name}`)}
        >
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
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
      width: 100,
      height: 100,
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
      color: '#388e3c',
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