const eventEmitter = require('@events/event_emitter');
const leaderboardService = require('@services/leader_board');

eventEmitter.on('added.money.to.user', (data) => {
	leaderboardService.syncLeaderBoard(data.gamer, data.money);
});

module.exports = eventEmitter;