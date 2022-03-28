const redisClient = require('@database/redis_conn');
const eventEmitter = require("@events/event_emitter");
const { io } = require("socket.io-client");

async function syncLeaderBoard(gamer,money_amount) {

	// Set redis weekly sort set
	const weekNumber = getNumberOfWeek();
	redisClient.zIncrBy(`weekly_leaderboard_${weekNumber}`, 
		money_amount,
		JSON.stringify([
			gamer._id, gamer.username, gamer.age
		])
	);

	//Increase total number of weekly
	const weekly_key = `weekly_total_amount_${weekNumber}`;
	const isExists = await redisClient.exists(weekly_key);

	if( isExists ) {

		await redisClient.incrBy(weekly_key,money_amount);
	} else {

		redisClient.set(weekly_key,0);
		eventEmitter.emit('finish.week',{
			finish_week_number: weekNumber
		});
	}

	dispatchLeaderBoard();

}

function getNumberOfWeek() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

async function fethScoreBoard(limit = 100) {
	/*
	const leaderboard = await redisClient.zRange(`weekly_leaderboard_${weekNumber}`, '100', '0' ,{
		BY: 'SCORE',
		REV: true,
		LIMIT: {
			offset: 0,
			count: 10
		}
	});
	*/
	const weekNumber = getNumberOfWeek();
	/**
	 * https://redis.io/commands/zrange
	 *  ZRANGE key min max [BYSCORE|BYLEX] [REV] [LIMIT offset count] [WITHSCORES] 
	 */
	const leaderboard = await redisClient.sendCommand(['ZRANGE', `weekly_leaderboard_${weekNumber}`, '+inf', '0', 'BYSCORE', 'REV', 'LIMIT', '0', limit, 'WITHSCORES']);

	// Combine it with scores
	let leaderboard_with_scores = leaderboard.reduce(function (a, c, i) {
		var idx = i / 2 | 0;
		if (i % 2) {
			a[idx].score = c;
		} else {
			a[idx] = {
				content: JSON.parse(c)
			};
		}

		return a;
	}, []);

	return leaderboard_with_scores;
}

/**
 * Publish new leaderbord to the socket.io
 */
async function dispatchLeaderBoard() {

	const leaderboard = await fethScoreBoard(100);
	eventEmitter.emit('on.change.leaderboard', leaderboard);
}

module.exports = {
	syncLeaderBoard,
	fethScoreBoard,
	dispatchLeaderBoard
};