import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native';
import { SearchBar } from './SearchBar';
import { evening, snow, rain, sun } from '../../assets/backgroundImages/img/index';
export const Weather = ({ weatherData, fetchWeatherData }) => {
     const [backgroundImage, setBackgroundImage] = useState(null);
     const {
          weather,
          name,
          main: { temp, humidity },
          wind: { speed }
     } = weatherData;
     const [{ main }] = weather;
     useEffect(() => {
          setBackgroundImage(getBackgroundImg(main));
     }, [weatherData])
     const getBackgroundImg = (weather) => {
          if (weather === 'Snow') return snow;
          if (weather === 'Clear') return sun;
          if (weather === 'Rain') return rain;
          if (weather === 'Haze') return evening;
          return evening;
     }
     let textColor = backgroundImage !== sun ? 'white' : 'black'
     return (
          <View style={styles.container}>
               <StatusBar backgroundColor='darkgray' />
               <ImageBackground source={backgroundImage}
                    style={styles.backgroundImg} resizeMode="cover">
                    <SearchBar fetchWeatherData={fetchWeatherData} />

                    <View style={{ alignItems: 'center' }}>
                         <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 46 }}>{name}</Text>
                         <Text style={{ ...styles.headerText, marginBottom: 30, color: 'purple', fontWeight: 'bold' }}>{main}</Text>
                         <View style={styles.borderBoxing}>
                              <Text style={{ color: 'white', fontSize: 30 }}>{temp} °C</Text>
                         </View>

                    </View>
                    <View style={styles.extraInfo}>
                         <View style={styles.info}>
                              <Text style={{ fontSize: 22, color: 'white' }}>Humidity</Text>
                              <Text style={{ fontSize: 22, color: 'white' }}>{humidity} %</Text>

                         </View>
                         <View style={styles.info}>
                              <Text style={{ fontSize: 22, color: 'white' }}>Wind Speed</Text>
                              <Text style={{ fontSize: 22, color: 'white' }}>{speed} m/s</Text>

                         </View>
                    </View>
               </ImageBackground>

          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center'
     },
     backgroundImg: {
          flex: 1,
          width: Dimensions.get('screen').width
     },
     headerText: {
          fontSize: 36,
          marginTop: 50
     },
     extraInfo: {
          flexDirection: 'row',
          marginTop: 80,

          justifyContent: 'space-between',
          padding: 10
     },
     info: {
          width: Dimensions.get('screen').width / 2.5,
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: 10,
          borderRadius: 15,
          justifyContent: 'center'
     },
     borderBoxing: {
          width: Dimensions.get('screen').width / 1.2,
          backgroundColor: 'rgba(0,0,0,0.5)',
          height: 100,
          borderRadius: 15,
          justifyContent: 'center',

          alignItems: 'center'
     }
})