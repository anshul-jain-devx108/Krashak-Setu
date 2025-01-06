import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firebase configuration

export default function InventoryPage() {
  const [farmerId, setFarmerId] = useState('');
  const [crops, setCrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmerId = async () => {
      try {
        const storedFarmerId = await AsyncStorage.getItem('aadhar'); // Fetch farmerid (aadhar)
        if (storedFarmerId) {
          setFarmerId(storedFarmerId);
          console.log('Fetched Farmer ID:', storedFarmerId);
        } else {
          Alert.alert('Error', 'Farmer ID not found. Please log in again.');
        }
      } catch (error) {
        console.error('Error fetching Farmer ID:', error);
      }
    };

    fetchFarmerId();
  }, []);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const cropsCollection = collection(db, 'crops');
        const querySnapshot = await getDocs(cropsCollection);

        const farmerCrops: any[] = [];
        querySnapshot.forEach((doc) => {
          const cropData = doc.data();
          if (cropData.farmerid === farmerId) {
            farmerCrops.push({ id: doc.id, ...cropData });
          }
        });

        setCrops(farmerCrops);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crops:', error);
        Alert.alert('Error', 'Failed to load inventory. Please try again.');
        setLoading(false);
      }
    };

    if (farmerId) {
      fetchCrops();
    }
  }, [farmerId]);

  const renderCropCard = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.cropName}</Text>
      <Text>Quantity: {item.quantity} kg</Text>
      <Text>Price: ₹{item.price} per kg</Text>
      <Text>Added On: {new Date(item.addedAt).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Inventory</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : crops.length > 0 ? (
        <FlatList
          data={crops}
          keyExtractor={(item) => item.id}
          renderItem={renderCropCard}
        />
      ) : (
        <Text style={styles.noCropsText}>No crops found in your inventory.</Text>
      )}
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
    marginBottom: 20,
    color: '#3498db',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noCropsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});
