// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs'; // Your Bottom Tab Navigation
import DrawerMenu from './DrawerMenu';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={() => <DrawerMenu />} // Custom menu
      >
        <Drawer.Screen name="Home" component={BottomTabs} /> {/* Bottom Tabs inside the Drawer */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
