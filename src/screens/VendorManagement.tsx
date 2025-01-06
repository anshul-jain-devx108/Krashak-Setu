import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const features = [
  {
    title: ' Product Listing',
    description: 'Add, edit, or remove your products to showcase them.',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/032/066/431/non_2x/product-list-filled-color-icon-icon-for-your-website-mobile-presentation-and-logo-design-vector.jpg',
    navigateTo: 'ProductListingScreen',
  },
  {
    title: ' Inventory Management',
    description: 'Track stock levels and receive alerts for low inventory.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/7656/7656399.png',
    navigateTo: 'InventoryManagementScreen',
  },
  {
    title: ' Order Management',
    description: 'View, manage, and update your customer orders.',
    imageUrl: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/order-management-3245513-2700820.png?f=webp&w=256',
    navigateTo: 'OrderManagementScreen',
  },
  {
    title: 'Review Management',
    description: 'View and manage customer reviews of your products.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png',
    navigateTo: 'ReviewListScreen',
  },
  {
    title: 'Transection Management',
    description: 'View and manage customer reviews of your products.',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/000/286/981/original/transaction-vector-icon.jpg',
    navigateTo: 'TransactionManagement',
  },
  {
    title: 'Contract Management',
    description: 'View and manage customer reviews of your products.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png', // Contract-related icon
    navigateTo: 'ContractsScreen',
  }
  
];

export default function VendorManagement() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}> Vendor Management </Text>
        <Text style={styles.subHeaderText}>Empowering Farmers to Succeed</Text>
      </View>

      {/* Feature List */}
      <FlatList
        data={features}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(item.navigateTo)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.icon} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}> Jai Kisaan Jai Bharat </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f8ec',
  },
  header: {
    backgroundColor: '#4caf50',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#f9fbe7',
    marginTop: 5,
    fontStyle: 'italic',
  },
  listContainer: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
  },
  footer: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
  },
});