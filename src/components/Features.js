import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const categories = [
  {
    title: 'Services',
    features: [
      {
        title: 'Weather',
        description: 'Get expert advice on crop care and protection.',
        icon: 'cloud',
        iconColor: '#fff', // Tomato color
        navigationTarget: 'WeatherComponent',
      },
      {
        title: 'Loans',
        description: 'Get easy access to loans and financial assistance.',
        icon: 'bank',
        iconColor: '#fff', // SteelBlue color
        navigationTarget: 'LoanPartners',
      },
    ],
  },
  {
    title: 'Tools',
    features: [
      {
        title: 'Fertilizer Calculator',
        description: 'Calculate the ideal fertilizer amount for your crops.',
        icon: 'pagelines',
        iconColor: '#fff', // LimeGreen color
        navigationTarget: 'FertilizerCalculator',
      },
      {
        title: 'Payment Protection',
        description: 'Can raise issue regarding accepted orders whose payment is not done.',
        icon: 'shield',
        iconColor: '#fff', // Gold color
        navigationTarget: 'PaymentSupportScreen',
      },
    ],
  },
  {
    title: 'Marketplace',
    features: [
      
      {
        title: 'AgriStore',
        description: 'Browse the marketplace for selling and buying agricultural goods.',
        icon: 'shopping-bag',
        iconColor: '#fff', // SlateBlue color
        navigationTarget: 'AgriStore1',
      },
    ],
  },
];

const Features = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <View style={styles.featuresContainer}>
            {category.features.map((feature, idx) => (
              <View key={idx} style={styles.featureWrapper}>
                <TouchableOpacity
                  style={styles.featureTile}
                  onPress={() => {
                    if (feature.navigationTarget) {
                      navigation.navigate(feature.navigationTarget);
                    } else {
                      alert(feature.title);
                    }
                  }}
                >
                  <FontAwesome name={feature.icon} size={30} color={feature.iconColor} />
                </TouchableOpacity>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#DCA811',
    marginBottom: 10,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureWrapper: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureTile: {
    width: 80,
    height: 80,
    backgroundColor: '#4caf50',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
  featureDescription: {
    fontSize: 12,
    textAlign: 'center',
    color: '#777',
    marginTop: 5,
  },
});

export default Features;