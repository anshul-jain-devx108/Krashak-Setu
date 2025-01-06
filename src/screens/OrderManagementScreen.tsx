import React, { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { BarChart } from 'react-native-chart-kit';

const OrderManagementScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [farmerId, setFarmerId] = useState(null);
  const [productOrders, setProductOrders] = useState([]);

  const fetchFarmerIdFromStorage = async () => {
    try {
      const storedFarmerId = await AsyncStorage.getItem('aadharNumber');
      if (storedFarmerId !== null) {
        setFarmerId(storedFarmerId);
      } else {
        Alert.alert('Error', 'Farmer ID not found in storage.');
      }
    } catch (error) {
      console.error('Error fetching farmerId from AsyncStorage:', error);
      Alert.alert('Error', 'Failed to fetch farmer ID.');
    }
  };

  const fetchOrders = async () => {
    if (!farmerId) return;
    try {
      setLoading(true);
      const ordersRef = collection(db, 'orders');
      const querySnapshot = await getDocs(ordersRef);
      const ordersData = [];
      const productCount = {};

      querySnapshot.forEach((docSnapshot) => {
        const orderArray = docSnapshot.data().orders || [];
        orderArray.forEach((order) => {
          if (order.farmerId === farmerId && order.status === 'Accepted') {
            ordersData.push({ ...order, buyerEmail: docSnapshot.id });

            // Count the number of orders for each product
            if (order.cropName) {
              if (productCount[order.cropName]) {
                productCount[order.cropName] += 1;
              } else {
                productCount[order.cropName] = 1;
              }
            }
          }
        });
      });

      // Convert product count into an array format for the chart
      const productOrdersArray = Object.keys(productCount).map((product) => ({
        name: product,
        count: productCount[product],
      }));

      setProductOrders(productOrdersArray);
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', 'Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmerIdFromStorage();
  }, []);

  useEffect(() => {
    if (farmerId) fetchOrders();
  }, [farmerId]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Order ID: {item.orderId}</Text>
      <Text>Crop: {item.cropName}</Text>
      <Text>
        Status: <Text style={styles[item.status.toLowerCase()]}>{item.status || 'Pending'}</Text>
      </Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Total Price: ₹{item.totalPrice}</Text>
      <Text>Address: {item.address}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Orders per Product</Text>
        <BarChart
          data={{
            labels: productOrders.map((item) => item.name),
            datasets: [
              {
                data: productOrders.map((item) => item.count),
              },
            ],
          }}
          width={350} // Adjust the width as needed
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          verticalLabelRotation={30} // Rotate labels if they overlap
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No accepted orders found.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accepted: {
    color: 'green',
  },
  denied: {
    color: 'red',
  },
  pending: {
    color: 'orange',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#aaa',
  },
  chartContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default OrderManagementScreen;
