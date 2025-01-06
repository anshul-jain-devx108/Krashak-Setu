import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const PaymentSupportScreen = () => {
  const [farmerId, setFarmerId] = useState(null);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState('');
  const [loading, setLoading] = useState(true);

  const issueOptions = [
    "Payment not received",
    "Partial payment received",
    "Incorrect payment amount",
    "Other issues with payment"
  ];

  const fetchFarmerIdFromStorage = async () => {
    try {
      const storedFarmerId = await AsyncStorage.getItem('aadharNumber');
      if (storedFarmerId) {
        setFarmerId(storedFarmerId);
      } else {
        Alert.alert('Error', 'Farmer ID not found in storage.');
      }
    } catch (error) {
      console.error('Error fetching farmerId from AsyncStorage:', error);
      Alert.alert('Error', 'Failed to fetch farmer ID.');
    }
  };

  const fetchAcceptedOrders = async () => {
    if (!farmerId) return;
    try {
      setLoading(true);
      const ordersRef = collection(db, 'orders');
      const querySnapshot = await getDocs(ordersRef);
      const ordersData = [];
      querySnapshot.forEach((docSnapshot) => {
        const orderArray = docSnapshot.data().orders || [];
        orderArray.forEach((order) => {
          if (order.farmerId === farmerId && order.status === 'Accepted') {
            ordersData.push({ ...order, buyerEmail: docSnapshot.id });
          }
        });
      });
      setAcceptedOrders(ordersData);
    } catch (error) {
      console.error('Error fetching accepted orders:', error);
      Alert.alert('Error', 'Failed to fetch accepted orders.');
    } finally {
      setLoading(false);
    }
  };

  const submitSupportTicket = async () => {
    if (!selectedOrder || !selectedIssue) {
      Alert.alert('Error', 'Please select an order and an issue.');
      return;
    }

    try {
      const supportRef = collection(db, 'supportTickets');
      await addDoc(supportRef, {
        farmerId,
        orderId: selectedOrder.orderId,
        issueDescription: selectedIssue,
        status: 'Pending', // Default status for new support tickets
        timestamp: new Date(),
      });
      Alert.alert('Success', 'Support ticket submitted successfully.');
      setSelectedOrder(null);
      setSelectedIssue('');
    } catch (error) {
      console.error('Error submitting support ticket:', error);
      Alert.alert('Error', 'Failed to submit support ticket.');
    }
  };

  useEffect(() => {
    fetchFarmerIdFromStorage();
  }, []);

  useEffect(() => {
    if (farmerId) fetchAcceptedOrders();
  }, [farmerId]);

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.orderItem,
        selectedOrder?.orderId === item.orderId && styles.selectedOrder,
      ]}
      onPress={() => setSelectedOrder(item)}
    >
      <Text style={styles.orderText}>Order ID: {item.orderId}</Text>
      <Text style={styles.orderText}>Crop: {item.cropName}</Text>
      <Text style={styles.orderText}>Total Price: ₹{item.totalPrice}</Text>
    </TouchableOpacity>
  );

  const renderIssueOption = (issue) => (
    <TouchableOpacity
      key={issue}
      style={[
        styles.issueOption,
        selectedIssue === issue && styles.selectedIssueOption,
      ]}
      onPress={() => setSelectedIssue(issue)}
    >
      <Text style={styles.issueText}>{issue}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.header}>Payment Support</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.subHeader}>Select an Order:</Text>
          <FlatList
            data={acceptedOrders}
            keyExtractor={(item) => item.orderId}
            renderItem={renderOrderItem}
            ListEmptyComponent={<Text style={styles.emptyText}>No accepted orders found.</Text>}
          />
          {selectedOrder && (
            <View style={styles.issueContainer}>
              <Text style={styles.subHeader}>Select Your Issue:</Text>
              {issueOptions.map(renderIssueOption)}
              <Button title="Submit Support Ticket" onPress={submitSupportTicket} color="#4caf50" />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  orderItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedOrder: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e9',
  },
  orderText: {
    fontSize: 14,
  },
  issueContainer: {
    marginTop: 20,
  },
  issueOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedIssueOption: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e9',
  },
  issueText: {
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default PaymentSupportScreen;