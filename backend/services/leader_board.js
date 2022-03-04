const redisClient = require('@database/redis_conn');

async function syncLeaderBoard(gamer,money_amount) {

	// Set redis weekly sort set
	let weekNumber = getNumberOfWeek();
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
		const amount = await redisClient.get(weekly_key);
	} else {
		redisClient.set(weekly_key,0);
		console.log("A new week started.")
		//TODO: emit event for this
	}


	//TODO: Redis publish
}

function getNumberOfWeek() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

module.exports = {
	syncLeaderBoard
};