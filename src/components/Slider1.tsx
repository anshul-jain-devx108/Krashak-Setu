import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');
const SLIDE_WIDTH = width * 0.9;
const SLIDE_HEIGHT = SLIDE_WIDTH * 0.6; // 16:9 aspect ratio

const Slider = () => {
  const slides = [
    { id: '1', image: 'https://aminus3.s3.amazonaws.com/image/g0036/u00035784/i01995839/f86fd33569e51ca036b3210139517b5f_giant.jpg' },
    { id: '2', image: 'https://th.bing.com/th/id/OIP.gDPolQ5da-D3pejIFES0YgHaE8?rs=1&pid=ImgDetMain' },
    { id: '3', image: 'https://th.bing.com/th/id/OIP.PRflk0n3-_1Kr8Mdpo-KTQHaE8?rs=1&pid=ImgDetMain' },
  ];

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slides.length;
        flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
        return nextIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  const renderSlide = ({ item }: { item: { image: string } }) => (
    <View style={styles.slide}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
        onError={() => console.error('Error loading image:', item.image)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        onScrollToIndexFailed={() => console.warn('Scroll failed!')}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.progressBarContainer}>
        {slides.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.progressBar,
              { opacity: currentIndex === index ? 1 : 0.3 },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: (width - SLIDE_WIDTH) / 2, // Center the slides
  },
  slide: {
    width: SLIDE_WIDTH,
    height: SLIDE_HEIGHT,
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  progressBarContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  progressBar: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#888',
    marginHorizontal: 5,
  },
});

export default Slider;
