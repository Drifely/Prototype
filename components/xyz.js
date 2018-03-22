import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	Alert
} from 'react-native';

import RNSensors from 'react-native-sensors';
const { Accelerometer, Gyroscope } = RNSensors;
const accelerationObservable = new Accelerometer({
	updateInterval: 100, // defaults to 100ms
});

const gyroscopeObservable = new Gyroscope({
	updateInterval: 2000, // defaults to 100ms
});

export default class SensorExample extends Component {
	constructor(props) {
		super(props);
		this.state = {
			acceleration: {
				x: 'unknown',
				y: 'unknown',
				z: 'unknown',
			},
			gyroscope: {
				x: 'unknown',
				y: 'unknown',
				z: 'unknown',
			},
			status: false
		};
	}

	componentWillMount() {
		accelerationObservable
			.subscribe(acceleration => this.setState({
				acceleration,
			}));

		gyroscopeObservable
			.subscribe(gyroscope => this.setState({
				gyroscope,
			}));
	}

	ugal = ()  => {
		Alert.alert('WARNING')
		this.setState(prev => ({
				...prev,
				status: true
		}))
	}

	reset = () => {
		this.setState(prev => ({
			...prev,
			status: false
		}))
	}

	test = () => {
		Alert.alert('WARNING')
	}
	render() {
		const {
			acceleration,
			gyroscope,
			status
		} = this.state;

		return (
			(gyroscope.z > 5) ?  this.test() : null ,
			// (gyroscope.z > 5) ? this.ugal() : null,
			<View style={styles.container}>
					{/* <Text>{(gyroscope.z > 0) ? 'diatas' : 'dibawah'}</Text> */}
				<Text style={styles.welcome}>
					Acceleration:
        </Text>
				<Text style={styles.instructions}>
					{acceleration.x + '/' + acceleration.y + '/' + acceleration.z}
				</Text>
				<Text style={styles.welcome}>
					Gyroscope:
        </Text>
				<Text style={styles.instructions}>
					{gyroscope.x + '/' + gyroscope.y + '/' + gyroscope.z}
				</Text>
				<Text>Dummy</Text>
				{status && <Text> WARNING </Text>}
				{!status && <Text> Safe </Text>}
				<Button title="reset" onPress={() => this.reset()} />
				<Button title="trigger ugal" onPress={() => this.ugal()} />
				<Button title="trigger alert" onPress={() => this.test()} />
			</View>
		);
	}

	componentWillUnmount() {
		accelerationObservable.stop();
		gyroscopeObservable.stop();
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
