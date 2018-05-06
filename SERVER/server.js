var express = require('express');
var app = express();
var socketIO = require('socket.io');
var server = require('http').createServer(app).listen(3000, function(){
	console.log('Server is running port 3000...');
});
var io = socketIO.listen(server);
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

var number_node = 0;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './app')));

app.get('/', function(req, res){
	res.sendfile('./index.html');
});

io.on('connection', function(socket){

	console.log('User connected with ID = '+socket.id);

	socket.emit('server-send-number-node', number_node);

	socket.on('client-send-number', function(number){
		number_node = number;
		io.sockets.emit('server-send-number', number);
	});

	socket.on('client-send-restart-number', function(){
		number_node = 0;
		io.sockets.emit('server-send-restart-number');
	})

});
