import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
  const onPress = async () => {
    try {
      // Store a simple session (e.g., logged-in status) in AsyncStorage
      await AsyncStorage.setItem('userSession', 'loggedIn');
      navigation.navigate('AadharPage'); // Navigate to AadharPage
    } catch (error) {
      console.error('Error storing session data', error);
    }
  };

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={require('./../assets/images/2.jpg')}
          style={styles.image}
        />
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Your Only
          <Text style={styles.primaryText}> App to Sell Fresh Grains</Text> and
          Vegetables
        </Text>
        <Text style={styles.description}>
          Sell all fresh and natural crops in one app and make a good profit
        </Text>

        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={styles.btnText}>Continue to Aadhar Verification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 100,
  },
  image: {
    width: 220,
    height: 450,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: '#000',
  },
  subContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  primaryText: {
    color: '#3498db', // Blue color for emphasis
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 15,
    color: '#7f8c8d', // Gray color
  },
  btn: {
    backgroundColor: '#3498db', // Blue color for button
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
