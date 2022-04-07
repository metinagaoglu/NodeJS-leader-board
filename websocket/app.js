const io = require('./io');

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

	require('./namespaces/index');


	//Root namescape
	io.on('connection', (socket) => {

	});

});