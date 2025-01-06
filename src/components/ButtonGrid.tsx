import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const buttons = [
  { title: 'Add Crop', imageUrl: 'https://cdn-icons-png.flaticon.com/512/10650/10650139.png' },
  { title: 'Inventory', imageUrl: 'https://cdn-icons-png.flaticon.com/512/9252/9252207.png' },
];

const ButtonGrid = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.grid}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate(button.title)}
        >
          <Image source={{ uri: button.imageUrl }} style={styles.image} />
          <Text style={styles.text}>{button.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 20 },
  button: { alignItems: 'center', marginBottom: 20, width: '30%' },
  image: { width: 60, height: 60 },
  text: { marginTop: 10, fontSize: 14, textAlign: 'center' },
});

export default ButtonGrid;
