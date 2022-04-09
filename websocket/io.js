const express = require('express');
const app = express();
const http = require('http');
const config =  require('./config/index');

const server = http.createServer(app);
const { Server } = require("socket.io");


// Production
let options = {
	cors: {
		origin: config.host,
	}
};

if(config.env == 'development') {
	options = {
		cors: {
			origin: '*',
			credentials: true
		}
	};
}

const io = new Server(server,options);

module.exports = io;