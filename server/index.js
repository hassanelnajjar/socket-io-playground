const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket) => {
	socket.on('initial_data', () => {
		io.sockets.emit('get_data', { message: 'data' });
	});
	socket.on('changeInputValue', (value) => {
		console.log(value);
		io.sockets.emit('get_value', { value });
	});
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});
app.get('/api/v1', (req, res) => {
	res.json({ message: 'hi' }).status(200);
});

app.use((req, res, next) => {
	console.log(req.url);
	next();
});

server.listen(5000, () => console.log(`server running at ${5000}`));
