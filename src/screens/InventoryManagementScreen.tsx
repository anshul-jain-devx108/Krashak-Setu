import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList, TextInput, Image, ScrollView } from 'react-native';
import { db } from '../../firebaseConfig'; // Import Firebase config
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To get Aadhar number
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const InventoryManagementScreen = () => {
  const [products, setProductsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProductDetails, setUpdatedProductDetails] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    stock: ''
  });

  const fetchProducts = async () => {
    try {
      const aadhar = await AsyncStorage.getItem('aadharNumber');
      if (!aadhar) {
        Alert.alert('Error', 'Aadhar number is required');
        return;
      }

      const q = query(collection(db, 'crops'), where('aadhar', '==', aadhar));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('No products found', 'No products are registered for this Aadhar number.');
      } else {
        const productList = [];
        querySnapshot.forEach((doc) => {
          productList.push({ ...doc.data(), id: doc.id });
        });

        setProductsState(productList);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products: ", error);
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setUpdatedProductDetails({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      stock: product.quantity
    
    });
  };

  const handleUpdateProduct = async () => {
    try {
      const productRef = doc(db, 'crops', editingProduct.id);
      await updateDoc(productRef, {
        name: updatedProductDetails.name,
        category: updatedProductDetails.category,
        price: updatedProductDetails.price,
        description: updatedProductDetails.description,
        quantity: updatedProductDetails.stock
        
      });

      fetchProducts();
      setEditingProduct(null);
      Alert.alert('Success', 'Product updated successfully!');
    } catch (error) {
      console.error("Error updating product: ", error);
      Alert.alert('Error', 'Failed to update product.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const productRef = doc(db, 'crops', productId);
      await deleteDoc(productRef);
      fetchProducts();
      Alert.alert('Success', 'Product deleted successfully!');
    } catch (error) {
      console.error("Error deleting product: ", error);
      Alert.alert('Error', 'Failed to delete product.');
    }
  };

  // Prepare data for the bar chart
  const chartData = {
    labels: products.map((item) => item.name), // Product names
    datasets: [
      {
        data: products.map((item) => item.quantity || 0), // Product quantities (stock levels)
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <BarChart
            data={chartData}
            width={screenWidth - 20}
            height={250}
            yAxisSuffix=" kg"
            chartConfig={{
              backgroundColor: '#f3f8ec',
              backgroundGradientFrom: '#e5f0da',
              backgroundGradientTo: '#c7e6a9',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            style={styles.chart}
          />

          {editingProduct ? (
            <View style={styles.editContainer}>
              <Text style={styles.editTitle}>Edit Product</Text>
              <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={updatedProductDetails.name}
                onChangeText={(text) => setUpdatedProductDetails({ ...updatedProductDetails, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Product price"
                value={updatedProductDetails.price}
                onChangeText={(text) => setUpdatedProductDetails({ ...updatedProductDetails, price: text })}
              />

               <TextInput
                style={styles.input}
                placeholder="Product Stock"
                value={updatedProductDetails.stock}
                onChangeText={(number) => setUpdatedProductDetails({ ...updatedProductDetails, stock : number })}
              />
               
              {/* Other input fields */}
              <TouchableOpacity onPress={handleUpdateProduct} style={styles.button}>
                <Text style={styles.buttonText}>Update Product</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <View style={styles.productCard}>
                  <Image source={{ uri: item.imageurl }} style={styles.productImage} />
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productDetails}>Category: {item.category}</Text>
                  <Text style={styles.productDetails}>Price: ₹{item.price}</Text>
                  <Text style={styles.productDetails}>Stock: {item.quantity} kg</Text>
                  <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => handleEditProduct(item)}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => handleDeleteProduct(item.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Styles...
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },

  container: {
        flex: 1,
        backgroundColor: '#f3f8ec',
        padding: 10,
      },
      editContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        marginBottom: 20,
      },
      editTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        padding: 10,
        fontSize: 16,
      },
      button: {
        backgroundColor: '#388e3c',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      editButton: {
        backgroundColor: '#4caf50',
      },
      deleteButton: {
        backgroundColor: '#d32f2f',
      },
      productCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 3,
      },
      productImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
      },
      productName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      productDetails: {
        fontSize: 16,
        color: '#666',
      },

});

export default InventoryManagementScreen;
