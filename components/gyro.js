import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Alert
} from 'react-native';
import RNSensors, { Accelerometer } from 'react-native-sensors';

const accelerationObservable = new Accelerometer({
	updateInterval: 100, // defaults to 100ms 
});


function SensorView(props) {

	const Component = RNSensors.decorator({
		...props,
	})(SensorsDisplay);

	return (
		<Component />
	)
}

function warning(){
	Alert.alert('WARNING')
}

const SensorDisplay = ({
	value: {
		x = 0,
		y = 0,
		z = 0,
	} = {},
	name,
}) => {
	return (
		(z.toFixed(2) > 10 || z.toFixed(2) < -10 ) ? warning()	:null ,
		<Text style={styles.welcome}>{name}:  Z: {z.toFixed(2)}</Text>
	)
};

const Speed = ({
	value: {
		x = 0,
		y = 0,
		z = 0,
	} = {},
	name,
}) => {
	return (
		<View> 
			<Text style={styles.welcome}>{name}: Y: {y.toFixed(2)} / Miring: {x.toFixed(2)} / Z: {z.toFixed(2)}</Text>
			<Text> Jahrakal's Movement Speed : {Math.floor((+x.toFixed(0) + +y.toFixed(0) + +z.toFixed(0) - 9.8)) * 3.6} km/h </Text>
		</View>
	)
};

class SensorsDisplay extends Component {
	render() {
		const {
			Accelerometer,
			Gyroscope,
		} = this.props;

		return (
			<View style={styles.container}>
				<Speed name="kecepatan" value={Accelerometer} />
				<SensorDisplay name="Gyroscope" value={Gyroscope} />
			</View>
		);
	}
}

export default class DecoratorExample extends Component {
	render() {
		return (
			<View style={styles.container}>
				<SensorView Accelerometer Gyroscope  />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		// backgroundColor: '#F5FCFF',
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