import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import VendorManagement from '../screens/VendorManagement';
// Import the new screen for Smart Farming
import SmartFarming from '../screens/SmartFarming'; 
import { AgriStore1 } from '../screens/AgriStore1';
import AgriStoreScreen from '../screens/AgriStoreScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      key="bottom-tabs"
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Vendor Management') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'AgriStore') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Smart Farming') {
            // Choose an appropriate icon for Smart Farming
            iconName = focused ? 'leaf' : 'leaf-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#71BA54',
        tabBarInactiveTintColor: '#D5C37B',
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
        headerShown: false,

      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Vendor Management" component={VendorManagement} />
      {/* Add the Smart Farming tab */}
      <Tab.Screen name="Smart Farming" component={SmartFarming} options={{
        headerShown: true,
        title: 'Smart Farming',
        headerStyle: { backgroundColor: '#388e3c' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }} />
    </Tab.Navigator>
  );
}