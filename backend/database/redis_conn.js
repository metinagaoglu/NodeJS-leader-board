const { createClient } = require('redis');

//TODO: get this parameter from enviroment variable.
const client = createClient({
	socket: {
		'host': 'redis',
		'port': 6379
	}
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

module.exports = client;