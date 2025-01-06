import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const SmartFarming = () => {
  const [predictedRicePrice, setPredictedRicePrice] = useState(0);
  const [predictedTomatoPrice, setPredictedTomatoPrice] = useState(0);
  const [predictedWheatPrice, setPredictedWheatPrice] = useState(0);
  const [demandRice, setDemandRice] = useState(0);
  const [demandTomato, setDemandTomato] = useState(0);
  const [demandWheat, setDemandWheat] = useState(0);

  const fetchPriceData = async () => {
    try {
      const riceResponse = await fetch('https://f1c91569-4287-4a9e-974f-0ccf1450eb54-00-2ssqpsa3r072x.pike.replit.dev/predict/rice');
      if (!riceResponse.ok) throw new Error('Error fetching rice data');
      const riceData = await riceResponse.json();
      setPredictedRicePrice(riceData.predictedRicePrice);

      const tomatoResponse = await fetch('https://f1c91569-4287-4a9e-974f-0ccf1450eb54-00-2ssqpsa3r072x.pike.replit.dev/predict/tomato');
      if (!tomatoResponse.ok) throw new Error('Error fetching tomato data');
      const tomatoData = await tomatoResponse.json();
      setPredictedTomatoPrice(tomatoData.predictedTomatoPrice);

      const wheatResponse = await fetch('https://f1c91569-4287-4a9e-974f-0ccf1450eb54-00-2ssqpsa3r072x.pike.replit.dev/predict/wheat');
      if (!wheatResponse.ok) throw new Error('Error fetching wheat data');
      const wheatData = await wheatResponse.json();
      setPredictedWheatPrice(wheatData.predictedProductPrice);
    } catch (error) {
      console.error('Error fetching price data:', error);
      Alert.alert('Error', 'Unable to fetch data from the server. Please try again later.');
    }
  };

  const fetchDemandData = async () => {
    try {
      const riceDemandResponse = await fetch('https://1e6afbf4-9dbf-47fd-b44c-83c0d5fd9d9b-00-jaig95k8ziqs.sisko.replit.dev/predict/rice');
      if (!riceDemandResponse.ok) throw new Error('Error fetching rice demand data');
      const riceDemandData = await riceDemandResponse.json();
      setDemandRice(riceDemandData.predictedDemand);

      const tomatoDemandResponse = await fetch('https://1e6afbf4-9dbf-47fd-b44c-83c0d5fd9d9b-00-jaig95k8ziqs.sisko.replit.dev/predict/tomato');
      if (!tomatoDemandResponse.ok) throw new Error('Error fetching tomato demand data');
      const tomatoDemandData = await tomatoDemandResponse.json();
      setDemandTomato(tomatoDemandData.predictedDemand);

      const wheatDemandResponse = await fetch('https://1e6afbf4-9dbf-47fd-b44c-83c0d5fd9d9b-00-jaig95k8ziqs.sisko.replit.dev/predict/wheat');
      if (!wheatDemandResponse.ok) throw new Error('Error fetching wheat demand data');
      const wheatDemandData = await wheatDemandResponse.json();
      setDemandWheat(wheatDemandData.predictedDemand);
    } catch (error) {
      console.error('Error fetching demand data:', error);
      Alert.alert('Error', 'Unable to fetch data from the server. Please try again later.');
    }
  };

  useEffect(() => {
    fetchPriceData();
    fetchDemandData();
  }, []);

  const generateRecommendation = () => {
    const productionCosts = { Rice: 20, Tomato: 15, Wheat: 18 }; // Example costs
    const profitRice = predictedRicePrice - productionCosts.Rice;
    const profitTomato = predictedTomatoPrice - productionCosts.Tomato;
    const profitWheat = predictedWheatPrice - productionCosts.Wheat;

    const crops = [
      { name: 'Rice', demand: demandRice, profit: profitRice },
      { name: 'Tomato', demand: demandTomato, profit: profitTomato },
      { name: 'Wheat', demand: demandWheat, profit: profitWheat },
    ];

    const mostProfitableCrop = crops.reduce((max, crop) => (crop.profit > max.profit ? crop : max));
    const mostDemandableCrop = crops.reduce((max, crop) => (crop.demand > max.demand ? crop : max));
    const mostProfitableDemandableCrop = crops.reduce(
      (max, crop) => (crop.demand * crop.profit > max.demand * max.profit ? crop : max)
    );

    return (
      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationTitle}>Recommendation Report</Text>
        <View style={styles.recommendationItem}>
          <Text style={styles.recommendationText}>1. <Text style={styles.highlight}>Most Profitable Crop:</Text> {mostProfitableCrop.name} with ₹{mostProfitableCrop.profit.toFixed(2)}/kg profit.</Text>
        </View>
        <View style={styles.recommendationItem}>
          <Text style={styles.recommendationText}>2. <Text style={styles.highlight}>Most In-Demand Crop:</Text> {mostDemandableCrop.name} with {mostDemandableCrop.demand.toFixed(2)} kg demand.</Text>
        </View>
        <View style={styles.recommendationItem}>
          <Text style={styles.recommendationText}>3. <Text style={styles.highlight}>Most Profitable & Demandable Crop:</Text> {mostProfitableDemandableCrop.name} (Demand: {mostProfitableDemandableCrop.demand.toFixed(2)} kg, Profit: ₹{mostProfitableDemandableCrop.profit.toFixed(2)}/kg).</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Smart Farming - Price Prediction</Text>

      {/* Price Prediction Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.cardTitle}>Crop Price Prediction</Text>
        <BarChart
          data={{
            labels: ['Rice', 'Tomato', 'Wheat'],
            datasets: [{ data: [predictedRicePrice, predictedTomatoPrice, predictedWheatPrice] }],
          }}
          width={350}
          height={250}
          yAxisLabel="₹"
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={styles.chart}
        />
      </View>

      {/* Demand Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.cardTitle}>Crop Demand</Text>
        <BarChart
          data={{
            labels: ['Rice', 'Tomato', 'Wheat'],
            datasets: [{ data: [demandRice, demandTomato, demandWheat] }],
          }}
          width={350}
          height={250}
          yAxisLabel="kg"
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={styles.chart}
        />
      </View>

      {/* Recommendation Report */}
      {generateRecommendation()}

      <TouchableOpacity style={styles.fetchButton} onPress={() => { fetchPriceData(); fetchDemandData(); }}>
        <Text style={styles.buttonText}>Fetch Data Again</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2f4f4f',
  },
  chartCard: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 10,
  },
  recommendationContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2f4f4f',
  },
  recommendationItem: {
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    lineHeight: 24,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#32cd32',
  },
  fetchButton: {
    backgroundColor: '#32cd32',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SmartFarming;
