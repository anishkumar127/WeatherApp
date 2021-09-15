import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ImageBackground, Dimensions } from 'react-native';
import { Weather } from './src/components/Weather';
import { SearchBar } from './src/components/SearchBar'
import { noResult } from './assets/backgroundImages/img/index'
import Location from 'expo-location';

const API_KEY = "6d32eae9cdecaaddba1fb60764fcbc6c";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  const fetchWeatherData = async (cityName) => {

    setLoaded(false);

    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        console.log(data)
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchWeatherData('Sri Ganganagar');
    console.log(weatherData);

  }, [])
  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="gray" size={36} />
      </View>
    )
  }
  else if (weatherData === null) {
    return (
      <ImageBackground source={noResult} style={styles.backgroundImg} resizeMode="cover">

        <View>
          <SearchBar fetchWeatherData={fetchWeatherData} />
          <Text style={styles.primaryText}> City Not Found! Try Different City.</Text>
        </View>
      </ImageBackground>
    )
  }
  return (
    <View style={styles.container}>

      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    color: 'white'
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get('screen').width
  }
});
