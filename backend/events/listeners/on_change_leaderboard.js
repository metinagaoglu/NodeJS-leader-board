const eventEmitter = require('@events/event_emitter');
const { io } = require("socket.io-client");

eventEmitter.on('on.change.leaderboard', async(leaderboard) => {
    const socketio_url = process.env.SOCKETIO_CONN_STRING || 'ws://websocket:8000/publish';

	const socket = await io(socketio_url);
    socket.emit('on.change.leaderboard', leaderboard);
});

module.exports = eventEmitter;