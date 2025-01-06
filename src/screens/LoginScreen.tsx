
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [aadharNumber, setAadharNumber] = useState('');
  const [password, setPassword] = useState(''); // Replaced phoneNumber with password
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedAadhar = await AsyncStorage.getItem('aadharNumber');
      if (storedAadhar) {
        navigation.replace('MainTabs');
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const validateInputs = () => {
    if (aadharNumber.length !== 12 || isNaN(Number(aadharNumber))) {
      Alert.alert('Invalid Input', 'Please enter a valid 12-digit Aadhar number.');
      return false;
    }
    if (password.length < 6) { // Basic password validation
      Alert.alert('Invalid Input', 'Please enter a valid password (at least 6 characters).');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    try {
      const farmersRef = collection(db, 'farmer_data');
      const q = query(farmersRef, where('aadhar', '==', aadharNumber), where('password', '==', password)); // Check password in DB
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const farmerData = querySnapshot.docs[0].data();

        await AsyncStorage.setItem('aadharNumber', aadharNumber);
        await AsyncStorage.setItem('farmerData', JSON.stringify(farmerData));

        setLoading(false);
        Alert.alert('Login Successful', 'Welcome to the platform!');
        navigation.replace('MainTabs');
      } else {
        setLoading(false);
        Alert.alert('Authentication Failed', 'Aadhar or password is incorrect.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Login Error:', error);
      Alert.alert('Error', 'Unable to login. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

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
          placeholder="Enter your password"
          secureTextEntry={true} // Hide the password text
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: loading ? '#95a5a6' : '#27ae60' }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#3498db' }]}
          onPress={() => navigation.navigate('RegisterFarmerScreen')}
        >
          <Text style={styles.buttonText}>Register as a Farmer</Text>
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
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#34495e',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
