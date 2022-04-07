const io = require('./../io');
const leaderboardNamespace = require('./leaderBoard');

/**
 * Publish namespace
 */
const publishNamespace = io.of("/publish");

publishNamespace.on('connection', (socket) => {
    socket.on('on.change.leaderboard', (payload) => {
        leaderboardNamespace.emit('leaderboard', payload);
    });
});

module.exports = publishNamespace;