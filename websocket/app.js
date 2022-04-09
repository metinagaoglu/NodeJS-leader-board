const config =  require('./config/index');
const io = require('./io');

const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");

const pubClient = createClient({
	url: config.redis.connectionString
});

const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
	io.adapter(createAdapter(pubClient, subClient));

	io.listen(config.port);

	require('./namespaces/index');
});