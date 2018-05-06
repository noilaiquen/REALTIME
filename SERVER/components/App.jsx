import React, {Component} from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client/dist/socket.io.js';

const SERVER_URL = 'http://192.168.56.1:3000';
let self_component;

class App extends Component{
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
			<div className="wrap">
				<div id="number">
					<span>{this.state.number}</span>
				</div>
				<div>
					<button id="tab" onClick={this.Count.bind(this)}>Tap</button>
				</div>
				<div>
					<button id="restart" onClick={this.Restart.bind(this)}>Restart</button>
				</div>	
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));