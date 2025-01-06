import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const sliderImages = [
  {
    imageUrl: "https://www.pgurus.com/wp-content/uploads/2022/02/Digital-agriculture-is-our-future-PM-Narendra-Modi.jpg",
    name: "Slider3"
  },
  {
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2021/6/YD/QW/PR/16624432/pulses-and-grains.jpg",
    name: "Slider2"
  },
  {
    imageUrl: "https://st4.depositphotos.com/1194063/20307/i/450/depositphotos_203078276-stock-photo-food-background-assortment-colorful-ripe.jpg",
    name: "Slider1"
  },
  {
    imageUrl: "https://agriwelfare.gov.in/Gallery/GAL_4_22102024.jpg",
    name: "Slider1"
  }
];

const buttons = [
  {
    title: "Add Crop",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/10650/10650139.png",
  },
  {
    title: "Inventory",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/9252/9252207.png",
  },
  {
    title: "Completed Orders",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/5220/5220625.png",
  },
  {
    title: "My Profile",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/5987/5987424.png",
  },
  {
    title: "My Reviews",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1356/1356326.png",
  },
  {
    title: "Pending Orders",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2936/2936945.png",
  },
];

export default function MainScreen() {
  const [farmerData, setFarmerData] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const storedFarmerData = await AsyncStorage.getItem('farmerData');
        const userSession = await AsyncStorage.getItem('userSession');
        
        if (!userSession) {
          navigation.navigate('LoginScreen');
          return;
        }

        if (storedFarmerData) {
          const parsedFarmerData = JSON.parse(storedFarmerData);
          setFarmerData(parsedFarmerData);

          // Store aadhar in AsyncStorage to ensure it's available in the profile page
          if (parsedFarmerData?.aadhar) {
            await AsyncStorage.setItem('aadhar', parsedFarmerData.aadhar);
            console.log('Aadhar stored in AsyncStorage:', parsedFarmerData.aadhar);  // Debugging log
          }
        }
      } catch (error) {
        console.error('Error fetching farmer data from AsyncStorage:', error);
      }
    };

    fetchFarmerData();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {farmerData ? (
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, {farmerData.name}</Text>
          <Text style={styles.farmerAddress}>{farmerData.address}</Text>
        </View>
      ) : (
        <Text>Loading farmer data...</Text>
      )}

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderTitle}>☘️ Welcome to Krashaksetu ☘️</Text>
        <FlatList
          data={sliderImages}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.sliderList}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              source={{ uri: item.imageUrl }}
              style={styles.sliderImage}
            />
          )}
        />
      </View>
      <Text style={styles.sliderTitle}> 🌿 जय जावन जय किसन 🌿</Text>

      <View style={styles.categoryContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryButton}
            onPress={() => navigation.navigate(button.title)} // Navigate to the page corresponding to the button title
          >
            <Image source={{ uri: button.imageUrl }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{button.title}</Text>
            
          </TouchableOpacity>
          
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: -50,
  },
  header: {
    backgroundColor: '#3498db',
    padding: 20,
    alignItems: 'flex-start',
    marginBottom: -20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30,
  },
  farmerAddress: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  sliderContainer: {
    marginVertical: 20,
  },
  sliderTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    color: '#000',
    textAlign: 'center',
    paddingLeft: 20,
    paddingTop: 10,
    marginBottom: 15,
  },
  sliderList: {
    paddingLeft: 20,
  },
  sliderImage: {
    width: 300,
    height: 150,
    borderRadius: 15,
    marginRight: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: 120,
    marginBottom: 15,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'outfit-medium',
    textAlign: 'center',
    color: '#000',
  },
});
