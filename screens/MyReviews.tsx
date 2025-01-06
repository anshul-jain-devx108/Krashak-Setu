import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firebase configuration

export default function ReviewPage() {
  const [farmerId, setFarmerId] = useState('');
  const [reviews, setReviews] = useState<any[]>([]);
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
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(db, 'review');
        const querySnapshot = await getDocs(reviewsCollection);

        const farmerReviews: any[] = [];
        querySnapshot.forEach((doc) => {
          const reviewData = doc.data();
          // Only add review if the farmerid matches the logged-in farmerId
          if (reviewData.farmerid === farmerId) {
            farmerReviews.push({ id: doc.id, ...reviewData });
          }
        });

        setReviews(farmerReviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        Alert.alert('Error', 'Failed to load reviews. Please try again.');
        setLoading(false);
      }
    };

    if (farmerId) {
      fetchReviews();
    }
  }, [farmerId]);

  const renderReviewCard = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Crop Name : {item.cropName}</Text>
      {/* <Text style={styles.farmerName}>{item.farmerName}</Text> */}
      <Text style={styles.reviewText}>{item.comment}</Text> {/* Review text (comment) */}
      <Text style={styles.email}>Reviewed by: {item.email}</Text>
      <Text style={styles.date}>
        Reviewed on: {new Date(item.timestamp.seconds * 1000).toLocaleDateString()} {/* Convert Firestore timestamp */}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Crop Reviews</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : reviews.length > 0 ? (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={renderReviewCard}
        />
      ) : (
        <Text style={styles.noReviewsText}>No reviews found for your crops.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f7f7f7',  // Soft background color
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',  // Darker color for a professional look
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',  // Light border to create separation
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',  // Crop name in a bright color
    marginBottom: 10,
  },
  farmerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',  // Slightly muted color for the farmer's name
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 25,
    color: '#000000',  // Muted color for review text
    marginBottom: 10,
  },
  email: {
    fontSize: 14,
    color: '#95a5a6',  // Lighter color for email
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#bdc3c7',  // Light grey for date text
    textAlign: 'right',
  },
  noReviewsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#e74c3c',  // Red color to indicate no reviews
    marginTop: 20,
  },
});
