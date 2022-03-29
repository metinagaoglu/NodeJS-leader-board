const eventEmitter = require('@events/event_emitter');
const { io } = require("socket.io-client");
const config = require('@config/index');

eventEmitter.on('on.change.leaderboard', async(leaderboard) => {
    const socketio_url = config.socketio.connectionString;

	const socket = await io(socketio_url);
    socket.emit('on.change.leaderboard', leaderboard);
});

module.exports = eventEmitter;