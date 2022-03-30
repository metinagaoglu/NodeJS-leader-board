require('dotenv').config(); // this loads the defined variables from .env

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    mongo: {
        connectionString: process.env.MONGO_CONNECTION_STRING || 'mongodb://mongo:27017/samplegame',
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: process.env.REDIS_PORT || 6379,
        pass: process.env.REDIS_PASS || '',
    },
    socketio: {
        connectionString: process.env.SOCKETIO_CONN_STRING || 'ws://websocket:8000/publish',
    },
};

module.exports = config;