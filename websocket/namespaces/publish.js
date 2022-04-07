module.exports = (io) => {
    leaderboardNamespace = require('./leaderBoard')(io);

    /**
	 * Publish namespace
	 */
	 const publish_nsp = io.of("/publish");

	 publish_nsp.on('connection', (socket) => {
		socket.on('on.change.leaderboard',(payload) => {
			leaderboardNamespace.emit('leaderboard',payload);
		});
	});

    return publish_nsp;
}