import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image, StyleSheet, FlatList, VirtualizedList } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location'; // Only using Expo Location

const WeatherComponent = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // New state for forecast data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'd2004baa489680f391de96978fea60f0'; // Replace with your OpenWeather API Key

  // Request location and fetch weather data
  const getUserLocation = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setError('Location permission denied. Please grant permission to access your location.');
      setLoading(false);
      return;
    }

    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = coords;
      setLocation({ latitude, longitude });
      getWeatherData(latitude, longitude);
      getWeatherForecast(latitude, longitude); // Fetch forecast data as well
    } catch (err) {
      setError('Failed to fetch location. Ensure location is enabled.');
      setLoading(false);
    }
  };

  // Get current weather data
  const getWeatherData = async (latitude, longitude) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      setWeatherData(weatherResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data.');
      setLoading(false);
    }
  };

  // Get 5-day/3-hour weather forecast data
  const getWeatherForecast = async (latitude, longitude) => {
    try {
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      setForecastData(forecastResponse.data.list); // Save the forecast data in 3-hour intervals
    } catch (err) {
      setError('Failed to fetch forecast data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={styles.loadingText}>Fetching your location...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>No weather data available yet. Please allow location access.</Text>
      </View>
    );
  }

  const currentWeather = weatherData.weather[0];
  const currentTemp = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const rainVolume = weatherData.rain ? weatherData.rain['1h'] : 0; // in mm

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Current Weather */}
      <View style={styles.header}>
        <Text style={styles.cityName}>{weatherData.name}</Text>
        <Text style={styles.temp}>{Math.round(currentTemp)}°C</Text>
        <Text style={styles.description}>{currentWeather.description}</Text>
        <Image
          source={{ uri: `http://openweathermap.org/img/wn/${currentWeather.icon}.png` }}
          style={styles.weatherIcon}
        />
      </View>

      {/* Weather Details for Farmers */}
      <View style={styles.weatherDetails}>
        <Text style={styles.weatherDetailTitle}>Weather Conditions</Text>
        <View style={styles.weatherDetailRow}>
          <Text style={styles.weatherDetailLabel}>Temperature:</Text>
          <Text style={styles.weatherDetailValue}>{Math.round(currentTemp)}°C</Text>
        </View>
        <View style={styles.weatherDetailRow}>
          <Text style={styles.weatherDetailLabel}>Humidity:</Text>
          <Text style={styles.weatherDetailValue}>{humidity}%</Text>
        </View>
        <View style={styles.weatherDetailRow}>
          <Text style={styles.weatherDetailLabel}>Wind Speed:</Text>
          <Text style={styles.weatherDetailValue}>{windSpeed} m/s</Text>
        </View>
        <View style={styles.weatherDetailRow}>
          <Text style={styles.weatherDetailLabel}>Rain (Last Hour):</Text>
          <Text style={styles.weatherDetailValue}>{rainVolume} mm</Text>
        </View>
      </View>

      {/* 5-Day Forecast */}
      {forecastData && (
        <View style={styles.forecastContainer}>
          <Text style={styles.forecastTitle}>5-Day Forecast (3-hour intervals)</Text>
          <VirtualizedList
            data={forecastData}
            initialNumToRender={5}
            getItem={(data, index) => data[index]}
            getItemCount={(data) => data.length}
            renderItem={({ item }) => {
              const date = new Date(item.dt * 1000);
              const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
              const temp = Math.round(item.main.temp);
              const weatherDesc = item.weather[0].description;
              const weatherIcon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

              return (
                <View style={styles.forecastItem}>
                  <Text style={styles.forecastTime}>{time}</Text>
                  <Text style={styles.forecastTemp}>{temp}°C</Text>
                  <Text style={styles.forecastDesc}>{weatherDesc}</Text>
                  <Image source={{ uri: weatherIcon }} style={styles.forecastIcon} />
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#A7D4A6',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cityName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2D5B3D',
    marginBottom: 10,
  },
  temp: {
    fontSize: 40,
    fontWeight: '500',
    color: '#fff',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    color: '#fff',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  weatherDetails: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
  },
  weatherDetailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 10,
  },
  weatherDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weatherDetailLabel: {
    fontSize: 16,
    color: '#388E3C',
  },
  weatherDetailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D5B3D',
  },
  forecastContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
  },
  forecastTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 10,
  },
  forecastItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forecastTime: {
    fontSize: 16,
    color: '#388E3C',
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D5B3D',
  },
  forecastDesc: {
    fontSize: 14,
    color: '#388E3C',
  },
  forecastIcon: {
    width: 40,
    height: 40,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#4caf50',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  infoText: {
    fontSize: 18,
    color: '#388E3C',
  },
});

export default WeatherComponent;
