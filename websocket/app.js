const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
	cors: {
		credentials: true
	}
});

const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");

const redisConnectionString = process.env.REDIS_CONN_STRING || 'redis://redis:6379';
const pubClient = createClient({
	url: redisConnectionString
});

const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
	io.adapter(createAdapter(pubClient, subClient));

	const port = process.env.PORT || 8000;
	io.listen(port);

	require('./namespaces/leaderBoard')(io);
	require('./namespaces/publish')(io);

	//Root namescape
	io.on('connection', (socket) => {

	});

});