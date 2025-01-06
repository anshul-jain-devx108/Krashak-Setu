import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, Button, TextInput, Modal } from 'react-native';
import { collection, getDocs, query, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Update this path if necessary

const ContractsScreen = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [negotiatedPrice, setNegotiatedPrice] = useState('');
  const [selectedContractId, setSelectedContractId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch all contracts from Firestore
  const fetchContracts = async () => {
    try {
      setLoading(true);
      const contractsRef = collection(db, 'contract');
      const querySnapshot = await getDocs(contractsRef);
      const contractsData = [];

      querySnapshot.forEach((docSnapshot) => {
        const contract = docSnapshot.data();
        contractsData.push({
          contractId: docSnapshot.id,
          category: contract.category,
          deliveryDate: contract.deliveryDate,
          farmerName: contract.farmerName,
          price: contract.price,
          productName: contract.productName,
          quantity: contract.quantity,
          status: contract.status,
          time: contract.time.toDate().toLocaleString(), // Convert timestamp to readable format
        });
      });

      setContracts(contractsData);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      Alert.alert('Error', 'Failed to fetch contracts.');
    } finally {
      setLoading(false);
    }
  };

  // Update contract status (Accept/Deny)
  const updateContractStatus = async (contractId, status) => {
    try {
      const contractRef = doc(db, 'contract', contractId);
      await updateDoc(contractRef, {
        status: status, // Update the 'status' field
      });

      // Update the local state to reflect the changes
      setContracts((prevContracts) =>
        prevContracts.map((contract) =>
          contract.contractId === contractId
            ? { ...contract, status: status }
            : contract
        )
      );
      Alert.alert('Success', `Contract ${status}`);
    } catch (error) {
      console.error('Error updating contract status:', error);
      Alert.alert('Error', 'Failed to update contract status.');
    }
  };

  // Negotiate price of the contract
  const negotiatePrice = async () => {
    if (!negotiatedPrice || isNaN(negotiatedPrice) || parseFloat(negotiatedPrice) <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price.');
      return;
    }

    try {
      const contractRef = doc(db, 'contract', selectedContractId);
      await updateDoc(contractRef, {
        price: parseFloat(negotiatedPrice),
      });

      // Update the local state to reflect the new price
      setContracts((prevContracts) =>
        prevContracts.map((contract) =>
          contract.contractId === selectedContractId
            ? { ...contract, price: parseFloat(negotiatedPrice) }
            : contract
        )
      );

      setModalVisible(false); // Close the modal after negotiation
      setNegotiatedPrice(''); // Reset negotiated price
      Alert.alert('Success', 'Price Negotiated Successfully!');
    } catch (error) {
      console.error('Error negotiating price:', error);
      Alert.alert('Error', 'Failed to negotiate price.');
    }
  };

  // Fetch contracts when the component mounts
  useEffect(() => {
    fetchContracts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Contract ID: {item.contractId}</Text>
      <Text>Category: {item.category}</Text>
      {/* '<Text>Farmer: {item.farmerName}</Text>' */}
      <Text>Product: {item.productName}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Price: ₹{item.price}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Delivery Date: {item.deliveryDate}</Text>
      <Text>Time: {item.time}</Text>

      {/* Always show the buttons */}
      <View style={styles.buttonsContainer}>
        <Button
          title="Accept"
          color="#4CAF50"
          onPress={() => updateContractStatus(item.contractId, 'Accepted')}
        />
    

        <Button
          title="Deny"
          color="#F44336"
          onPress={() => updateContractStatus(item.contractId, 'Denied')}
        />
        <Button
          title="Negotiate Price"
          color="#FF9800"
          onPress={() => {
            setSelectedContractId(item.contractId); // Set selected contract for price negotiation
            setModalVisible(true); // Open the modal for price negotiation
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={contracts}
          keyExtractor={(item) => item.contractId}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No contracts available.</Text>}
        />
      )}

      {/* Modal for Price Negotiation */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Negotiate Price</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter new price"
              value={negotiatedPrice}
              onChangeText={setNegotiatedPrice}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Submit" onPress={negotiatePrice} />
            </View>
          </View>
        </View>
      </Modal>
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
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#aaa',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ContractsScreen;
