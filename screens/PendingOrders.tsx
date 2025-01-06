import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore imports
import { db } from '../firebaseConfig'; // Firebase configuration import
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import
import moment from 'moment'; // Moment for date formatting

export default function PendingOrders() {
  const [orders, setOrders] = useState<any[]>([]); // State to store orders
  const [loading, setLoading] = useState(true); // Loading state
  const [farmerId, setFarmerId] = useState<string | null>(null); // State to store farmerId

  // Function to get the farmer ID (Aadhar) from AsyncStorage
  const getFarmerId = async () => {
    try {
      const storedFarmerId = await AsyncStorage.getItem('aadharNumber'); // Retrieve farmerId from AsyncStorage
      if (storedFarmerId === null) {
        console.error('Farmer ID (Aadhar) not found in AsyncStorage');
        return null; // Return null if not found
      }
      return storedFarmerId; // Return farmerId if found
    } catch (error) {
      console.error('Error fetching farmer ID:', error.message);
      return null; // Return null on error
    }
  };

  // Function to fetch orders based on farmer ID
  const fetchOrders = async () => {
    if (!farmerId) {
      console.error('No farmer ID available');
      return; // If no farmerId, exit
    }

    try {
      setLoading(true); // Set loading to true while fetching data

      // Set up Firestore query to get orders where farmerId matches
      const ordersRef = collection(db, 'orders'); // Reference to 'orders' collection
      const q = query(ordersRef, where('farmerId', '==', farmerId)); // Query to filter by farmerId

      const querySnapshot = await getDocs(q); // Execute query to fetch matching orders
      if (querySnapshot.empty) {
        console.log('No orders found');
        setOrders([]); // No orders found, set to empty array
        return;
      }

      // Map the query results to an array of order data
      const fetchedOrders = querySnapshot.docs.map((doc) => doc.data());
      setOrders(fetchedOrders); // Set the fetched orders in state
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      setOrders([]); // Set to empty array on error
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  // Effect hook to fetch orders on component mount
  useEffect(() => {
    const initialize = async () => {
      const storedFarmerId = await getFarmerId(); // Get the farmer's ID (Aadhar)
      setFarmerId(storedFarmerId); // Set the farmerId state
    };

    initialize(); // Initialize farmerId
  }, []);

  // Effect hook to fetch orders after farmerId is set
  useEffect(() => {
    if (farmerId) {
      fetchOrders(); // Fetch orders when farmerId is available
    }
  }, [farmerId]);

  // Render individual order item
  const renderOrder = ({ item }: { item: any }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderTitle}>{item.cropName}</Text>
      <Text style={styles.orderDetail}>
        Order ID: <Text style={styles.bold}>{item.orderId}</Text>
      </Text>
      <Text style={styles.orderDetail}>
        Quantity: <Text style={styles.bold}>{item.quantity}</Text>
      </Text>
      <Text style={styles.orderDetail}>
        Price: <Text style={styles.bold}>₹{item.totalPrice}</Text>
      </Text>
      <Text style={styles.orderDetail}>
        Status: <Text style={[styles.bold, styles.Pending]}>{item.FarmerStatus}</Text>
      </Text>
      <Text style={styles.orderDate}>
        Ordered on: {moment(item.timestamp).format('MMM DD, YYYY')}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Pending Orders</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId.toString()}
          renderItem={renderOrder}
          ListEmptyComponent={
            <Text style={styles.noOrdersText}>No orders found.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginTop: 25,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  orderDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'right',
  },
  noOrdersText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    marginTop: 10,
  },
  Pending: {
    color: '#007BFF',
  },
});
