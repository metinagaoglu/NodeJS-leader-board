const { createClient } = require('redis');
const config = require('@config/index');

const client = createClient({
	socket: {
		'host': config.redis.host,
		'port': config.redis.port,
	}
});

client.on('error', (err) => {
	throw new Error(err);
});

client.connect();

module.exports = client;