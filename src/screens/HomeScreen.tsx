
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Slider from '../components/Slider1';
import Features from '../components/Features';

const HomeScreen = ({ features, slides, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <Header
        title="Krashak Welfare"
        subtitle="Empowering Farmers, Transforming Rural India"
        onProfilePress={() => navigation.navigate("FarmerProfile")}
      />

      {/* Slider Section */}
      <Slider slides={slides} />

      {/* Features Section */}
      <Features features={features} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default HomeScreen;

