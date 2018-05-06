import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import io from 'socket.io-client/dist/socket.io.js';

const SERVER_URL = 'http://192.168.56.1:3000';
let self_component;

export default class App extends Component{
	constructor(props){
		super(props);
		self_component = this;
		this.state = {
			number: 0
		};

		this.socket = io.connect(SERVER_URL, {jsonp: false});

		this.socket.on('server-send-number-node', function(number_node){
			self_component.setState({number: number_node});
		});

		this.socket.on('server-send-number', function(number){
			self_component.setState({number: number});
		});

		this.socket.on('server-send-restart-number', function(){
			self_component.setState({number: 0});
		});
	}

	Count(){
		this.socket.emit('client-send-number', this.state.number + 1);
	}

	Restart(){
		this.socket.emit('client-send-restart-number');
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.number}>{this.state.number}</Text>
				<TouchableOpacity style={styles.tap} onPress={this.Count.bind(this)}>
					<Text style={styles.text}>Tap</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.restart} onPress={this.Restart.bind(this)}>
					<Text style={styles.text}>Restart</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'yellow'
	},
	number: {
		fontSize: 60,
		color: '#f4504f'
	},
	tap: {
		backgroundColor: '#f4504f',
		width: 100,
		height: 40,
		alignItems: 'center',
		paddingTop: 5,
		borderRadius: 20,
		marginTop: 10
	},
	restart: {
		backgroundColor: '#f90',
		width: 100,
		height: 40,
		alignItems: 'center',
		paddingTop: 5,
		borderRadius: 20,
		marginTop: 10
	},
	text: {
		color: '#fff',
		fontSize: 20
	}
});