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
  Linking
} from 'react-native';
import Xyz from './components/xyz'

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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.warn('jalan watch position');
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          speed: position.coords.speed * 2.5
        })
      }, (error) => {
        this.setState({
          error: error.message
        }), {enableHighAccuracy:true,}
      }
    ) 
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
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>Location</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        <Text>Speed: {this.state.speed}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        <Xyz></Xyz>
        <Button
          title="Get Current Position"
          onPress={this.warnLocation}></Button>
      </View>
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
