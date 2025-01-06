import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Import Firestore instance
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AadharPage({ navigation }: any) {
  const [aadharNumber, setAadharNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  // Hide the keyboard when tapping outside the input fields
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleVerification = async () => {
    if (aadharNumber.length !== 12 || isNaN(Number(aadharNumber))) {
      Alert.alert('Invalid Input', 'Please enter a valid 12-digit Aadhar number.');
      return;
    }

    if (!phoneNumber || phoneNumber.length !== 10 || isNaN(Number(phoneNumber))) {
      Alert.alert('Invalid Input', 'Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);

    try {
      const farmersRef = collection(db, 'farmer_data');
      const q = query(farmersRef, where('aadhar', '==', aadharNumber), where('phone', '==', phoneNumber));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const farmerData = querySnapshot.docs[0].data();

        // Store farmer data in AsyncStorage
        await AsyncStorage.setItem('farmerData', JSON.stringify(farmerData));

        setLoading(false);
        navigation.navigate('MainScreen'); // Navigate to the main screen after successful verification
      } else {
        setLoading(false);
        Alert.alert('Not Found', 'Aadhar number or phone number is not registered. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during verification:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Aadhar & Phone Verification</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your 12-digit Aadhar number"
          keyboardType="numeric"
          maxLength={12}
          value={aadharNumber}
          onChangeText={setAadharNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          maxLength={10}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: loading ? '#7f8c8d' : '#3498db' }]}
          onPress={handleVerification}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? 'Verifying...' : 'Verify Aadhar and Phone'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  btn: {
    padding: 16,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
