import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Your Firebase configuration

import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [farmerId, setFarmerId] = useState(null); // To store the farmer's ID (aadharNumber)

  useEffect(() => {
    const fetchFarmerId = async () => {
      try {
        // Get the farmerId (aadharNumber) from AsyncStorage
        const storedFarmerId = await AsyncStorage.getItem('aadharNumber');
        if (storedFarmerId) {
          setFarmerId(storedFarmerId); // Set the farmerId from AsyncStorage
        } else {
          setError('Farmer ID not found');
        }
      } catch (err) {
        setError('Error retrieving farmer ID');
      }
    };

    fetchFarmerId();
  }, []);

  useEffect(() => {
    if (farmerId) {
      // Fetch transactions once the farmerId is retrieved
      const fetchTransactions = async () => {
        try {
          // Reference to Firestore collection and query by farmerId and status
          const transactionsRef = collection(db, 'transaction');
          const q = query(
            transactionsRef,
            where('farmerId', '==', farmerId),
            where('status', '==', 'Success')
          );

          const querySnapshot = await getDocs(q); // Get the documents matching the query
          
          const transactionsList = [];

          querySnapshot.forEach((doc) => {
            transactionsList.push({
              ...doc.data(),
              transactionId: doc.id, // Add the Firestore document ID
            });
          });

          setTransactions(transactionsList);
          setLoading(false);
        } catch (err) {
          setError('Error fetching transactions');
          setLoading(false);
        }
      };

      fetchTransactions();
    }
  }, [farmerId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading transactions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionText}>Farmer ID: {item.farmerId}</Text>
      <Text style={styles.transactionText}>Order ID: {item.orderId}</Text>
      <Text style={styles.transactionText}>Amount: ₹{item.amount}</Text>
      <Text style={styles.transactionText}>Crop Name: {item.cropName}</Text>
      <Text style={styles.transactionText}>Payment Method: {item.paymentMethod}</Text>
      <Text style={styles.transactionText}>Status: {item.status}</Text>
      <Text style={styles.transactionText}>
        Timestamp: {new Date(item.timestamp.seconds * 1000).toLocaleString()}
      </Text>
      <Text style={styles.transactionText}>Transaction ID: {item.transactionId}</Text>
      <Text style={styles.transactionText}>User Email: {item.userEmail}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction Management</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.transactionId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  transactionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionManagement;