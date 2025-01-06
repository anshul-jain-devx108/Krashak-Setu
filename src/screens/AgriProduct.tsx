import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AgriProductDetail } from './AgriProductDetails';

const products = {
  Fertilizers: [
    {
      id: '1',
      name: 'Nitrogen Fertilizer',
      description: 'Rich in nitrogen for optimal crop growth.',
      price: '₹239',
      image: 'https://m.media-amazon.com/images/I/71yKWudlb0L._SX425_.jpg',
      brand: 'Generic',
      weight: '	850 Grams',
      form: 'Granules',
      //coverage: 'Medium',
    },
    {
      id: '2',
      name: 'Phosphate Fertilizer',
      description: 'Superphosphate is a fertiliser rich in phosphorous that promotes healthy and vigorous root systems in all plants.',
      price: '₹179',
      image: 'https://m.media-amazon.com/images/I/719wTVdzkYL.jpg',
      brand: 'Evana Organic Fertilizer',
      weight: '2 Kilograms',
      form: 'Powder',
      //coverage: 'Medium',
    },

    {
      id: '3',
      name: 'Calcium Nitrate',
      description: 'Improves pH of soil and increases availability of trace elementsIncreases fruit setting Improves rind quality of the fruit',
      price: '₹274',
      image: 'https://m.media-amazon.com/images/I/51XJ3Cv7vsL._AC_UF1000,1000_QL80_.jpg',
      brand: 'MAHADHAN',
      weight: '1 Kilograms',
      form: 'Powder',
      //coverage: 'Medium',
    },
    {
      id: '4',
      name: 'Boron 20% Fertlizers',
      description: 'Micronutrient Fertilizer For Healthy Growth Of Vegetable Plants & Gardening |Imported Powder (400GM)',
      price: '₹369',
      image: 'https://m.media-amazon.com/images/I/71TLu152UqL._SX466_.jpg',
      brand: 'KNR CORPORATION',
      weight: '0.4 Kilograms',
      form: 'Powder',
      //coverage: 'Medium',
    },
  ],

  Seeds: [
    {
      id: '1',
      name: 'Wheat Seeds',
      description: 'High-quality wheat seeds for better yield.',
      price: '₹200',
      image: 'https://5.imimg.com/data5/SELLER/Default/2023/9/341074540/CU/VV/JQ/100160381/pbw-826-wheat-seed-500x500.jpg',
      brand: 'Best Seeds Karnal',
      weight: '40kg',
      form: 'Seeds',
      //coverage: '',
    },

    {
      id: '2',
      name: 'Tomato Seeds',
      description: 'Packet contains: 1-Pack Seeds (200mg), Season of sowing: All seasons. Mode of sowing: Sow the seeds 0.5 cm deep in a seedling tray / Container / Pots. Transplant in 30 to 35 days.Germination time: 6 to 8 days from sowing.Harvesting: 25 to 30 days from transplanting.',
      price: '₹98',
      image: 'https://m.media-amazon.com/images/I/71MTyU84lSL._SX679_.jpg',
      brand: 'UGAOO',
      weight: '200mg',
      form: 'Seeds',
      //coverage: '',
    },

    {
      id: '3',
      name: 'Rice Seeds',
      description: 'The seeds are resistant to bacterial blight and are known for their high yield potential, It is a medium-duration variety that takes around 130-140 days to mature.',
      price: '₹199',
      image: 'https://m.media-amazon.com/images/I/81X+Pm-om1L._SX679_.jpg',
      brand: 'Green World',
      weight: '0.04 Pounds',
      form: 'Grain',
      //coverage: '',
    },
    {
      id: '4',
      name: 'Spinach Seeds',
      description: 'Kraft Seeds by 10CLUB Vegetable Spinach Seeds for Home Garden Leafy Winter Vegetable Seeds for Home Gardening',
      price: '₹49',
      image: 'https://m.media-amazon.com/images/I/41COVVNiLPL._SX300_SY300_QL70_FMwebp_.jpg',
      brand: 'Kraft Seeds',
      weight: '100 Gram',
      form: 'Seeds',
      //coverage: '',
    },
  ],
  Equipment: [
    {
      id: '1',
      name: 'Adi Shakti Maa Tractors',
      description: 'Mahindra Jivo 245 Di tractor. Durable and efficient tractor for farming.',
      price: '₹5,00,000',
      image: 'https://www.ace-cranes.com/images/productthumb/170133876020231130.png',
      brand: 'Mahindra',
      weight: '',
      form: 'Machine',
      //coverage: '',
    },
    {
      id: '2',
      name: 'Garden Farming Gloves',
      description: 'Heavy Duty Garden Farming Gloves Washable with Right Hand Fingertips ABS Claws for Digging and Gardening (Free Size, Green)(Acrylonitrile Butadiene Styrene, pack of)',
      price: '₹189',
      image: 'https://m.media-amazon.com/images/I/51NKKv35JzL._SX679_.jpg',
      brand: 'FreshDcart',
      weight: 'Lightweight',
      form: 'Gloves',
      //coverage: '',
    },
    {
      id: '3',
      name: 'Garden Rake 16-Teeth',
      description: 'Garden Rake 16-Teeth Metal Head Without Handle for Loosening Soil Gathering Leaf Leveling Land Agriculture Farming Gardening Tool.',
      price: '₹290',
      image: 'https://m.media-amazon.com/images/I/519SAZFJbCL._SX679_.jpg',
      brand: 'FALCON',
      weight: '580 Grams',
      form: 'Alloy Steel Rake',
      //coverage: '',
    },
    {
      id: '4',
      name: 'Garden Sprayer',
      description: 'Home Gardening Agriculture Spray Bottles for Plant Water, Air Compressor Pressure Spray Pump for Fertilizer & Pesticide Spray (5 Litre).',
      price: '₹1000',
      image: 'https://m.media-amazon.com/images/I/61nB4XmZc0L._SX679_.jpg',
      brand: 'SHARP GARUDA',
      weight: '5 Litre',
      form: 'Plastic',
      //coverage: '',
    },
  ],
  Pesticides: [
    {
      id: '1',
      name: 'Predator Miticide',
      description: 'It is the ideal biological agriculture product helps in repelling many kinds of phytophagous mites, thrips, leaf miners, red spider, etc.',
      price: '₹213',
      image: 'https://m.media-amazon.com/images/I/51YeXcAzVVL._SX466_.jpg',
      brand: 'Vijaya Agro Industries',
      weight: '1L',
      form: 'Liquid',
      //coverage: '',
    },
    {
      id: '2',
      name: 'Mealy Bug Remover Spray',
      description: 'Premium Essential Liquid Spray For Complete Removal Of Mealy Bugs From Plants.',
      price: '₹165',
      image: 'https://m.media-amazon.com/images/I/71iTTu-bHXL._SX466_.jpg',
      brand: 'Sansar Agro',
      weight: '100 ml',
      form: 'Liquid',
      //coverage: '',
    },
    {
      id: '3',
      name: 'Bio Larvicide',
      description: 'Protects crops from harmful insects.',
      price: '₹255',
      image: 'https://m.media-amazon.com/images/I/51g9YVNmtYL._SX466_.jpg',
      brand: 'THE WET TREE',
      weight: '200ml',
      form: 'Liquid',
      //coverage: '',
    },
    {
      id: '4',
      name: 'Neem Oil Organic Pesticide',
      description: 'Made from natural ingredients such as plant extracts, essential oils, or beneficial microbes. Safe for use around children, pets, and beneficial insects',
      price: '₹276',
      image: 'https://m.media-amazon.com/images/I/71i8PpZIp-L._SX466_.jpg',
      brand: 'Erwon',
      weight: '500ml',
      form: 'Liquid',
      //coverage: '',
    },
    
  ],
};

export const AgriProduct = ({ route }) => {
  const { category } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category} Products</Text>
      <FlatList
        data={products[category] || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('AgriProductDetail', { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.textContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <Text style={styles.productPrice}>{item.brand}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  productCard: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    padding: 10,
    elevation: 3,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10, // Added space between image and text
  },
  textContainer: {
    flexDirection: 'column', // Stack the name and price vertically
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#777',
    marginTop: 4, // Add space between name and price
  },
});