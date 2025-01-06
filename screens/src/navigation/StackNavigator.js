import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import VendorManagementScreen from '../screens/VendorManagementScreen';
import AgriStoreScreen from '../screens/AgriStoreScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen
        name="VendorManagement"
        component={VendorManagementScreen}
        options={{ title: 'Vendor Management' }}
      />
      <Stack.Screen name="AgriStore" component={AgriStoreScreen} options={{ title: 'Agri Store' }} />
    </Stack.Navigator>
  );
}
