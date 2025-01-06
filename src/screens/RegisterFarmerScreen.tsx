import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function RegisterFarmerScreen({ navigation }) {
  const [form, setForm] = useState({
    aadhar: '',
    name: '',
    phone: '',
    password: '',
    address: '',
    state: '',
    district: '',
    tehsil: '',
    village: '',
    pincode: '',
    bankbranch: '',
    accountnumber: '',
    ifsccode: '',
    landarea: '',
    landmark: '',
    maincrops: ''
  });

  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const { aadhar, name, phone, password, address, state, tehsil, village, pincode } = form;

    if (aadhar.length !== 12 || isNaN(Number(aadhar))) {
      Alert.alert('Invalid Input', 'Please enter a valid 12-digit Aadhar number.');
      return false;
    }
    if (phone.length !== 10 || isNaN(Number(phone))) {
      Alert.alert('Invalid Input', 'Please enter a valid 10-digit phone number.');
      return false;
    }
    if (!name.trim()) {
      Alert.alert('Invalid Input', 'Name cannot be empty.');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Invalid Input', 'Password must be at least 6 characters long.');
      return false;
    }
    if (!address.trim()) {
      Alert.alert('Invalid Input', 'Address cannot be empty.');
      return false;
    }
    if (!state.trim()) {
      Alert.alert('Invalid Input', 'State cannot be empty.');
      return false;
    }
    if (!tehsil.trim()) {
      Alert.alert('Invalid Input', 'Tehsil cannot be empty.');
      return false;
    }
    if (!village.trim()) {
      Alert.alert('Invalid Input', 'Village cannot be empty.');
      return false;
    }
    if (pincode.length !== 6 || isNaN(Number(pincode))) {
      Alert.alert('Invalid Input', 'Please enter a valid 6-digit pincode.');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    try {
      const farmerDocRef = doc(db, 'farmer_data', form.aadhar);
      await setDoc(farmerDocRef, form);

      setLoading(false);
      Alert.alert('Registration Successful', 'Farmer has been registered successfully.');
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      console.error('Registration Error:', error);
      Alert.alert('Error', 'Unable to register. Please try again.');
    }
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register Farmer</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Aadhar Number"
        value={form.aadhar}
        onChangeText={(value) => handleChange('aadhar', value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={form.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={form.phone}
        onChangeText={(value) => handleChange('phone', value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={form.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={form.address}
        onChangeText={(value) => handleChange('address', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter State"
        value={form.state}
        onChangeText={(value) => handleChange('state', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Tehsil"
        value={form.tehsil}
        onChangeText={(value) => handleChange('tehsil', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Village"
        value={form.village}
        onChangeText={(value) => handleChange('village', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Pincode"
        value={form.pincode}
        onChangeText={(value) => handleChange('pincode', value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter District"
        value={form.district}
        onChangeText={(value) => handleChange('district', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Bank Branch"
        value={form.bankbranch}
        onChangeText={(value) => handleChange('bankbranch', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Account Number"
        value={form.accountnumber}
        onChangeText={(value) => handleChange('accountnumber', value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter IFSC  Code"
        value={form.ifsccode}
        onChangeText={(value) => handleChange('ifsccode', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Land Area"
        value={form.landarea}
        onChangeText={(value) => handleChange('landarea', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Land Mark"
        value={form.landmark}
        onChangeText={(value) => handleChange('landmark', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Main Crops"
        value={form.maincrops}
        onChangeText={(value) => handleChange('maincrops', value)}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: loading ? '#95a5a6' : '#27ae60' }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchText}>Already registered? Login here</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  switchText: {
    color: '#2980b9',
    fontSize: 16,
    marginTop: 20,
  },
});
