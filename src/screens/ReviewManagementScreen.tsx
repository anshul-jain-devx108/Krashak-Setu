import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ReviewListScreen = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      // Retrieve the aadharNumber from AsyncStorage
      const aadharNumber = await AsyncStorage.getItem('aadharNumber');
      if (!aadharNumber) {
        Alert.alert('Error', 'Aadhar number not found in storage.');
        setLoading(false);
        return;
      }

      // Query Firestore for reviews with matching farmerId
      const reviewRef = collection(db, 'review');
      const q = query(reviewRef, where('farmerId', '==', aadharNumber));
      const querySnapshot = await getDocs(q);

      const reviewData = [];
      querySnapshot.forEach((doc) => {
        reviewData.push({ id: doc.id, ...doc.data() });
      });
      setReviews(reviewData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      Alert.alert('Error', 'Failed to fetch reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const renderReview = ({ item }) => {
    const formattedTimestamp = item.timestamp?.toDate
      ? item.timestamp.toDate().toLocaleString()
      : 'Unknown Date';

    return (
      <View style={styles.reviewCard}>
        <Text style={styles.cropName}>Crop: {item.cropName}</Text>
        <Text>Farmer: {item.farmerName}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Comment: {item.comment}</Text>
        <Text>Timestamp: {formattedTimestamp}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4caf50" />
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={renderReview}
          ListEmptyComponent={<Text style={styles.emptyText}>No reviews found.</Text>}
        />
      )}
    </View>
  );
};

export default ReviewListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f8ec',
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    marginTop: 20,
    fontSize: 16,
  },
});