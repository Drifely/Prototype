/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Linking,
  ScrollView
} from 'react-native';
import Xyz from './components/xyz'
import BgGeo from './components/BackgroundGeo'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor () {
    super()
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      speed: null
    }
  }
  
  getCurrentPos = () => {
    let pervLat = this.state.latitude
    let prevLong = this.state.longitude
    
    navigator.geolocation.getCurrentPosition(
      (position) => {

        
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          speed: position.coords.speed * 2.5
        })
      }, (error) => {
        this.setState({
          error: error.message
        }), {enableHighAccuracy:true,timeout:5000}
      }
    )
    // console.warn(`jalan watch position previous ${pervLat} long ${prevLong} current: ${this.state.latitude} long ${this.state.longitude}`); 
  }
  
  getRecurse = () => {
    this.getCurrentPos()
    setTimeout( () => {
      this.getRecurse()
    }, 35000);
  }
  
  componentDidMount () {
    this.getRecurse()
  }
  
  warnLocation = () => {
  console.warn(`
    https://www.google.com/maps/search/${this.state.latitude},${this.state.longitude}`);
  // Linking.openURL(`
  //   https://www.google.com/maps/search/${this.state.latitude},${this.state.longitude}`).catch(err => console.warn('An error occurred', err));
    Linking.canOpenURL(`https://www.google.com/maps/search/${this.state.latitude},${this.state.longitude}`)
      .then(supported => {
        if(!supported) {
          console.warn('not supported');
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              })
            }, (error) => {
              this.setState({
                error: error.message
              }), {enableHighAccuracy:true, distanceFilter: 1}
            }
          )
          return Linking.openURL(`https://www.google.com/maps/search/${this.state.latitude},${this.state.longitude}`)
        }
      })
      .catch(err => {
        console.warn(err);
      })
  }
  
  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text>Location</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        <Text>Speed: {this.state.speed}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        <Xyz></Xyz>
        <Text>GEOLOC BG</Text>
        <BgGeo></BgGeo>
        <Button
          title="Get Current Position"
          onPress={this.warnLocation}></Button>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
