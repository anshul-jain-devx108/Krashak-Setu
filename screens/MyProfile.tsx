import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function FarmerDetails() {
  const [farmerid, setFarmerid] = useState<string | null>(null);
  const [farmer, setFarmer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmerId = async () => {
      try {
        const id = await AsyncStorage.getItem('aadhar'); // Retrieve aadhar (document ID)
        if (id) {
          setFarmerid(id);
        } else {
          console.error('Aadhar not found in storage');
        }
      } catch (error) {
        console.error('Error fetching aadhar from storage:', error.message);
      }
    };

    fetchFarmerId();
  }, []);

  useEffect(() => {
    if (!farmerid) return;

    const fetchFarmer = async () => {
      try {
        const farmerRef = doc(db, 'farmer_data', farmerid); // Use the retrieved aadhar as document ID
        const farmerDoc = await getDoc(farmerRef);

        if (farmerDoc.exists()) {
          setFarmer(farmerDoc.data());
        } else {
          console.error('No farmer found for this ID.');
        }
      } catch (error) {
        console.error('Error fetching farmer details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmer();
  }, [farmerid]);

  const handleOpenMap = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open Google Maps.');
        }
      })
      .catch((err) => console.error('Error opening map:', err));
  };

  const handleDialNumber = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to dial the number.');
        }
      })
      .catch((err) => console.error('Error dialing number:', err));
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!farmer) {
    return (
      <View style={styles.center}>
        <Text>No Farmer Details Found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/736x/e8/5e/07/e85e07ea8312e2f64cb61ff687b7662b.jpg', // Profile picture
          }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{farmer.name}</Text>
        <Text style={styles.subtitle}>My Details</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Aadhar:</Text>
          <Text style={styles.detailValue}>{farmerid}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleDialNumber(farmer.phone)}
          style={styles.detailContainer}
        >
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={[styles.detailValue, styles.link]}>{farmer.phone}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOpenMap(farmer.address)}
          style={styles.detailContainer}
        >
          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={[styles.detailValue, styles.link]}>{farmer.address}</Text>
        </TouchableOpacity>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>District:</Text>
          <Text style={styles.detailValue}>{farmer.district}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>State:</Text>
          <Text style={styles.detailValue}>{farmer.state}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Pincode:</Text>
          <Text style={styles.detailValue}>{farmer.pincode}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Tehsil:</Text>
          <Text style={styles.detailValue}>{farmer.tehsil}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Village:</Text>
          <Text style={styles.detailValue}>{farmer.village}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Landmark:</Text>
          <Text style={styles.detailValue}>{farmer.landmark}</Text>
        </View>

        <Text style={styles.sectionTitle}>Farm Details</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Land Area:</Text>
          <Text style={styles.detailValue}>{farmer.landarea}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Main Crops:</Text>
          <Text style={styles.detailValue}>{farmer.maincrops}</Text>
        </View>

        <Text style={styles.sectionTitle}>Bank Details</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Account Number:</Text>
          <Text style={styles.detailValue}>{farmer.accountnumber}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Bank Branch:</Text>
          <Text style={styles.detailValue}>{farmer.bankbranch}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>IFSC Code:</Text>
          <Text style={styles.detailValue}>{farmer.ifsccode}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 20,
    color: '#d1e7ff',
  },
  infoContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#777',
    flex: 2,
    textAlign: 'right',
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});
