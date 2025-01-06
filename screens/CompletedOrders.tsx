import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddCrop = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Add Crop Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default AddCrop;
