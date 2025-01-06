import React from 'react';
import { View, Text } from 'react-native'; // Import necessary components
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/screens/LoginScreen'; // Import the login screen
import BottomTabs from './src/navigation/BottomTabs'; // Main bottom tabs
import ProductListingScreen from './src/screens/ProductListingScreen';
import HomeScreen from './src/screens/HomeScreen';
import InventoryManagementScreen from './src/screens/InventoryManagementScreen';
import LoadingScreen from './src/screens/LoadingScreen'; // Import the LoadingScreen
import OrderManagementScreen from './src/screens/OrderManagementScreen';
import FarmerProfile from './src/screens/Profile';
import WeatherComponent from './src/components/Weather.tsx';
import FertilizerCalculator from './src/components/FertilzerCalculator';
import LoanPartners from './src/components/LoansScreen'
import RegisterFarmerScreen from './src/screens/RegisterFarmerScreen';
import { AgriProduct } from './src/screens/AgriProduct';
import { AgriStore1 } from './src/screens/AgriStore1';
import { AgriProductDetail } from './src/screens/AgriProductDetails';
import PaymentSupportScreen from './src/screens/PaymentSupportScreen';
import TransactionManagement from './src/screens/TransactionManagement';
import ReviewListScreen from './src/screens/ReviewManagementScreen';
import ContractsScreen from './src/screens/ContractManagement';
// import BankDashboard from './src/components/LoansScreen'

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Check login status on app load
    const checkLoginStatus = async () => {
      try {
        const aadharNumber = await AsyncStorage.getItem('aadharNumber');
        setIsLoggedIn(!!aadharNumber);
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    // Show the LoadingScreen while checking login status
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'MainTabs' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        {/* Login Screen */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Main Bottom Tabs */}
        <Stack.Screen name="MainTabs" component={BottomTabs} />

        {/* Product Listing Screen */}
        <Stack.Screen
          name="ProductListingScreen"
          component={ProductListingScreen}
          options={{
            headerShown: true,
            title: 'Product Listing',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

        {/* Home Page for Farmer Welfare */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: true,
            title: 'Farmer Welfare',
            headerStyle: { backgroundColor: '#008000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />


        {/* Inventory Management Screen */}
        <Stack.Screen
          name="InventoryManagementScreen"
          component={InventoryManagementScreen}
          options={{
            headerShown: true,
            title: 'Inventory Management',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="OrderManagementScreen"
          component={OrderManagementScreen}
          options={{
            headerShown: true,
            title: 'Order Management',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="FarmerProfile"
          component={FarmerProfile}
          options={{
            headerShown: true,
            title: 'Profile',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="AgriStore1"
          component={AgriStore1}
          options={{
            headerShown: true,
            title: 'AgriStore',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

        <Stack.Screen
          name="ReviewListScreen"
          component={ReviewListScreen}
          options={{
            headerShown: true,
            title: 'Reviews',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

<Stack.Screen
          name="ContractsScreen"
          component={ContractsScreen}
          options={{
            headerShown: true,
            title: 'ContractsScreen',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="WeatherComponent"
          component={WeatherComponent}
          options={{
            headerShown: true,
            title: 'Weather Forecast',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="PaymentSupportScreen"
          component={PaymentSupportScreen}
          options={{
            headerShown: true,
            title: 'Order Payment Support',
            headerStyle: { backgroundColor: '#008000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />


          <Stack.Screen
          name="FertilizerCalculator"
          component={FertilizerCalculator}
          options={{
            headerShown: true,
            title: 'Fertilizer Calculator',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
         <Stack.Screen
          name="LoanPartners"
          component={LoanPartners}
          options={{
            headerShown: true,
            title: 'Loans',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

         <Stack.Screen
          name="AgriProduct"
          component={AgriProduct}
          options={{
            headerShown: true,
            title: 'AgriStore',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

        <Stack.Screen
          name="AgriProductDetail"
          component={AgriProductDetail}
          options={{
            headerShown: true,
            title: 'AgriStore',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

        <Stack.Screen
          name="TransactionManagement"
          component={TransactionManagement}
          options={{
            headerShown: true,
            title: 'Transaction Management',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

        <Stack.Screen
          name="RegisterFarmerScreen"
          component={RegisterFarmerScreen}
          options={{
            headerShown: true,
            title: 'Loans',
            headerStyle: { backgroundColor: '#388e3c' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}