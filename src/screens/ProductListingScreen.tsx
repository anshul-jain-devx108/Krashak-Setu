import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FirebaseStorage from 'firebase/storage';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { db, storage } from '../../firebaseConfig';

const { width } = Dimensions.get('window');

export default function ProductListingScreen() {
  const [product, setProduct] = useState({
    aadhar: '', 
    name: '',
    category: '',
    price: '', 
    negotiablePrice: '',
    description: '',
    harvestDate: new Date(),
    listingDateTime: '',
    quantity: 0, // Ensure quantity is a number
    imageurl: '',
  });

  const [image, setImage] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchAadhar = async () => {
      try {
        const storedAadhar = await AsyncStorage.getItem('aadhar');
        if (storedAadhar) {
          setProduct((prevProduct) => ({
            ...prevProduct,
            aadhar: storedAadhar,
          }));
        }

        setProduct((prevProduct) => ({
          ...prevProduct,
          listingDateTime: new Date().toLocaleString(),
        }));
      } catch (error) {
        console.error('Error fetching Aadhar:', error);
      }
    };

    fetchAadhar();
  }, []);

  const handleInputChange = (field, value) => {
    // Convert value to number for quantity
    if (field === 'quantity') {
      value = value ? Number(value) : 0; // Ensure quantity is always a number
    }
    setProduct({ ...product, [field]: value });
  };

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || product.harvestDate;
    setShowDatePicker(Platform.OS === 'ios' ? true : false);
    setProduct((prevProduct) => ({
      ...prevProduct,
      harvestDate: currentDate,
    }));
  };

  const handleSubmit = async () => {
    if (product.name && product.price && product.quantity && product.category && image) {
      try {
        const imageRef = ref(storage, 'productImages/' + Date.now());
        const response = await fetch(image);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);

        const imageurl = await getDownloadURL(imageRef);

        const storedAadhar = await AsyncStorage.getItem('aadharNumber');
        if (!storedAadhar) {
          Alert.alert('Error', 'Aadhar number is missing!');
          return;
        }

        await addDoc(collection(db, 'crops'), {
          ...product,
          imageurl,
          aadhar: storedAadhar,
          createdAt: new Date(),
        });

        Alert.alert('Success', 'Product listed successfully!');
        setProduct({
          aadhar: '',
          name: '',
          category: '',
          price: '',
          negotiablePrice: '',
          description: '',
          harvestDate: new Date(),
          listingDateTime: '',
          quantity: 0,
          imageurl: '',
        });
        setImage(null);
      } catch (error) {
        Alert.alert('Error', 'Failed to list product. Please try again.');
        console.error('Error uploading product:', error);
      }
    } else {
      Alert.alert('Error', 'Please fill in all required fields!');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🌾 Product Listing 🌾</Text>
        <Text style={styles.subHeaderText}>Empowering Farmers</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Product Name"
          value={product.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={product.category}
            onValueChange={(value) => handleInputChange('category', value)}
          >
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Fruits" value="Fruits" />
            <Picker.Item label="Vegetables" value="Vegetables" />
            <Picker.Item label="Grains" value="Grains" />
            <Picker.Item label="Dairy Products" value="Dairy Products" />
          </Picker>
        </View>

        <Text style={styles.label}>Price (₹)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Price"
          keyboardType="numeric"
          value={product.price}
          onChangeText={(value) => handleInputChange('price', value)}
        />

        <Text style={styles.label}>Negotiable Price (₹)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Negotiable Price"
          keyboardType="numeric"
          value={product.negotiablePrice}
          onChangeText={(value) => handleInputChange('negotiablePrice', value)}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter Product Description"
          multiline
          numberOfLines={4}
          value={product.description}
          onChangeText={(value) => handleInputChange('description', value)}
        />

        <Text style={styles.label}>Harvest Date</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>
            {product.harvestDate.toLocaleDateString() || 'Select Harvest Date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={product.harvestDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Quantity (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Quantity"
          keyboardType="numeric"
          value={product.quantity.toString()} // Ensure quantity is displayed as string
          onChangeText={(value) => handleInputChange('quantity', value)} // Input will convert to number
        />

        <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
          <Text style={styles.buttonText}>Upload Product Image</Text>
        </TouchableOpacity>

        {image && (
          <View style={styles.imageContainer}>
            <Text style={styles.label}>Selected Image</Text>
            <Image source={{ uri: image }} style={styles.imagePreview} />
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f8ec',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#388e3c',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeaderText: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
    color: '#388e3c',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#388e3c',
    paddingVertical: 12,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  imagePreview: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 8,
  },
});
