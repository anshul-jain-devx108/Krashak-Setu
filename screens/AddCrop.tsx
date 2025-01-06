import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firebase configuration

export default function AddCrop() {
  const [farmerid, setFarmerid] = useState(''); // Changed to farmerid with a small "i"
  const [cropName, setCropName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchFarmerid = async () => {
      try {
        const storedAadhar = await AsyncStorage.getItem('aadhar');
        if (storedAadhar) {
          setFarmerid(storedAadhar); // Set fetched value to farmerid
          console.log('Fetched Farmer ID (Aadhar) from AsyncStorage:', storedAadhar);
        } else {
          Alert.alert('Error', 'Farmer ID not found. Please log in again.');
        }
      } catch (error) {
        console.error('Error fetching Farmer ID:', error);
      }
    };

    fetchFarmerid();
  }, []);

  const handleAddCrop = async () => {
    if (!cropName || !quantity || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!farmerid) {
      Alert.alert('Error', 'Farmer ID not found. Please log in again.');
      return;
    }

    try {
      const cropId = `${farmerid}-${Date.now()}`; // Generate a unique crop ID
      const cropData = {
        farmerid, // Store Farmer ID instead of Aadhar
        cropName,
        quantity: Number(quantity),
        price: Number(price),
        addedAt: new Date().toISOString(),
      };

      // Add crop data to the "crops" collection
      await setDoc(doc(db, 'crops', cropId), cropData);

      Alert.alert('Success', 'Crop added successfully.');
      setCropName('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.error('Error adding crop:', error);
      Alert.alert('Error', 'Failed to add crop. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Crop</Text>
      <TextInput
        style={styles.input}
        placeholder="Crop Name"
        value={cropName}
        onChangeText={setCropName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity (kg)"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Price (₹ per kg)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddCrop}>
        <Text style={styles.buttonText}>Add Crop</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    marginVertical: 20,
    color: '#3498db',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
