const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const request = require('request');
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

	const leaderboard_nsp = io.of("/leaderboard");

	/**
	 * Leaderboard namespace
	 */
	leaderboard_nsp.on("connection", socket => {
		//Dispatch first data
		request.get('http://backend:8080/leaderboard/dispatch',function (error, response, body){
		  })
	});

	/**
	 * Publish namespace
	 */
	 const publish_nsp = io.of("/publish");
	 publish_nsp.on('connection', (socket) => {
		socket.on('on.change.leaderboard',(payload) => {
			leaderboard_nsp.emit('leaderboard',payload);
		});
	});

	//Root namescape
	io.on('connection', (socket) => {
	});

});