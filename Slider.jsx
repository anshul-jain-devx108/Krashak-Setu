import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

// Sample image data directly in the component
const sliderImages = [
  {
    imageUrl: "https://www.pgurus.com/wp-content/uploads/2022/02/Digital-agriculture-is-our-future-PM-Narendra-Modi.jpg",
    name: "Slider3"
  },
  {
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2021/6/YD/QW/PR/16624432/pulses-and-grains.jpg",
    name: "Slider2"
  },
  {
    imageUrl: "https://st4.depositphotos.com/1194063/20307/i/450/depositphotos_203078276-stock-photo-food-background-assortment-colorful-ripe.jpg",
    name: "Slider1"
  }
  ,
  {
    imageUrl: "https://agriwelfare.gov.in/Gallery/GAL_4_22102024.jpg",
    name: "Slider1"
  }
];

export default function Slider() {

  return (
    <View>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25,
        color: '#000',
        textAlign: 'center',
        paddingLeft: 20,
        paddingTop: 10,
        marginBottom: 5
      }}>
        ☘️ Welcome to Krashaksetu ☘️
      </Text>

      <FlatList
        data={sliderImages} // Use the array directly
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 20 }}
        renderItem={({ item, index }) => (
          <Image 
            key={index}
            source={{ uri: item.imageUrl }} // Display the image using the imageUrl
            style={{
              width: 300,
              height: 150,
              borderRadius: 15,
              marginRight: 15
            }}
          />
        )}
      />
    </View>
  )
}
