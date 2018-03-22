import React, { Component } from 'react';
import { Alert, View, Text } from 'react-native'
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation'

class BgGeo extends Component {
  constructor () {
    super () 
      this.state = {
        latitude : null,
        longitude: null,
        speed: null,
        time: null,
        stationary: false
      }
    
  }
  componentDidMount () {
    BackgroundGeolocation.configure({
        desiredAccuracy: 10,
        stationaryRadius: 50,
        distanceFilter: 50,
        notificationTitle: 'Background tracking',
        notificationText: 'enabled',
        debug: true,
        startOnBoot: false,
        stopOnTerminate: false,
        locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
        interval: 1000,
        fastestInterval: 1000,
        activitiesInterval: 10000,
        stopOnStillActivity: false,
      });

      BackgroundGeolocation.on('location', (location) => {
        // handle your locations here
        // to perform long running operation on iOS
        // you need to create background task
        this.setState({
          latitude: location.latitude,
          longitude: location.longitude,
          speed: location.speed
        })
        // console.warn(location)
        BackgroundGeolocation.startTask(taskKey => {
          // execute long running task
          // eg. ajax post location
          // IMPORTANT: task has to be ended by endTask
          BackgroundGeolocation.endTask(taskKey);
        });
      });

      BackgroundGeolocation.on('stationary', (stationaryLocation) => {
        // handle stationary locations here
        // Actions.sendLocation(stationaryLocation);
        this.setState({
          stationary : true
        })
      });

      BackgroundGeolocation.on('error', (error) => {
        console.warn('[ERROR] BackgroundGeolocation error:', error);
      });

      BackgroundGeolocation.on('start', () => {
        console.warn('[INFO] BackgroundGeolocation service has been started');
      });

      BackgroundGeolocation.on('stop', () => {
        console.warn('[INFO] BackgroundGeolocation service has been stopped');
      });

      BackgroundGeolocation.on('authorization', (status) => {
        console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
        if (status !== BackgroundGeolocation.AUTHORIZED) {
          Alert.alert('Location services are disabled', 'Would you like to open location settings?', [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showLocationSettings() },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
          ]);
        }
      });

      BackgroundGeolocation.on('background', () => {
        console.warn('[INFO] App is in background');
      });

      BackgroundGeolocation.on('foreground', () => {
        console.warn('[INFO] App is in foreground');
      });

      BackgroundGeolocation.checkStatus(status => {
        console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
        console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
        console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

        // you don't need to check status before start (this is just the example)
        if (!status.isRunning) {
          BackgroundGeolocation.start(); //triggers start on start event
        }
      });

      // you can also just start without checking for status
      // BackgroundGeolocation.start();
  }
  componentWillUnmount() {
  // unregister all event listeners
  BackgroundGeolocation.events.forEach(event => BackgroundGeolocation.removeAllListeners(event));
  }
  render() {
    return (
      <View>
        <Text>Longitude: {this.state.longitude}</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>speed: {this.state.speed}</Text>
        {this.state.stationary ? <Text> lagi diem nih...</Text> : null}
      </View>
    );
  }
}

export default BgGeo;