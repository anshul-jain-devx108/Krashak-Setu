import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useUser } from '@clerk/clerk-expo'; // User authentication
import { doc, getDoc } from 'firebase/firestore'; // Firestore
import { db2 } from '../../configs/FirebaseConfig'; // Firebase configuration
import moment from 'moment'; // For formatting dates

export default function UserOrders() {
  const { user } = useUser(); // Logged-in user data
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from Firestore directly under user's document
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) throw new Error('User email not found.');

      const userDocRef = doc(db2, 'users', userEmail); // Access user document
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.log("No user document found for this email.");
        setOrders([]); // No user found
        return;
      }

      const userData = userDocSnap.data();
      const userOrders = userData?.orders || []; // Access orders from the user document

      if (userOrders.length === 0) {
        console.log("No orders found for the user.");
      }

      setOrders(userOrders); // Set orders for the user
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderTitle}>{item.cropName}</Text>
      <Text style={styles.orderDetail}>
        Farmer: <Text style={styles.bold}>{item.farmerName}</Text>
      </Text>
      <Text style={styles.orderDetail}>
        Quantity: <Text style={styles.bold}>{item.quantity}</Text>
      </Text>
      <Text style={styles.orderDetail}>
        Price: <Text style={styles.bold}>₹{item.price}</Text>
      </Text>
      <Text style={styles.orderDetail}>
        Status: <Text style={[styles.bold, styles[item.status]]}>{item.status}</Text>
      </Text>
      <Text style={styles.orderDate}>
        Ordered on: {moment(item.timestamp).format('MMM DD, YYYY')}
      </Text>
    </View>
  );

  const filterOrders = (status) => orders.filter((order) => order.status === status);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Your Orders</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : (
        <View>
          {/* Ongoing Orders Section */}
          <Text style={styles.sectionTitle}>Ongoing Orders</Text>
          <FlatList
            data={filterOrders('Pending')}
            keyExtractor={(item) => item.orderId}
            renderItem={renderOrder}
            ListEmptyComponent={
              <Text style={styles.noOrdersText}>No ongoing orders found.</Text>
            }
          />

          {/* Previous Orders Section */}
          <Text style={styles.sectionTitle}>Previous Orders</Text>
          <FlatList
            data={filterOrders('Completed')}
            keyExtractor={(item) => item.orderId}
            renderItem={renderOrder}
            ListEmptyComponent={
              <Text style={styles.noOrdersText}>No previous orders found.</Text>
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginTop: 25
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#007BFF',
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
  Completed: {
    color: '#28a745',
  },
});
