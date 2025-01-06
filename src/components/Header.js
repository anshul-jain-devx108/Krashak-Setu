

// export default Header;
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For profile icon

const Header = ({ title, subtitle, onProfilePress }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* Larger Logo */}
        <Image
          source={require('../assets/logo.png')} // Replace with your logo
          style={styles.logo}
        />

        {/* Title Section
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
          {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        </View> */}

        {/* Profile Icon */}
        <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
          <FontAwesome name="user-circle" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#4CAF50',
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Handles notch compatibility for Android
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#71BA54',
    paddingHorizontal: 16,
    height: 70, // Slightly taller header for a larger logo
  },
  logo: {
    width: 130, // Increased width
    height: 130, // Increased height
    resizeMode: 'contain', // Ensures the logo scales proportionally
    padding:19,
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center', // Centers the title
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 12,
    color: '#F1F8E9',
    textAlign: 'center',
  },
  profileButton: {
    padding: 8,
  },
});

export default Header;
