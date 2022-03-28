const express = require('express');
const router = express.Router();
const LeaderboardService = require('@services/leader_board');
const asyncHandler = require('express-async-handler')
const eventEmitter = require('@events/event_emitter');


router.get('/', asyncHandler(async (req, res) => {

	const leaderboard = await LeaderboardService.fethScoreBoard();
	res.status(200);
	res.json(leaderboard);
}))


router.get('/polling', asyncHandler(async (req, res) => {
	res.setHeader("Content-Type","application/json; charset=utf-8")

	const eventName = 'on.change.leaderboard';

	eventEmitter.on(eventName, async(event) => {

		const leaderboard = await LeaderboardService.fethScoreBoard();
		res.write(JSON.stringify(leaderboard));
		res.end();
	});

	setTimeout(() => {
			res.end();
	}, 10000);
}))

router.get('/stream', (req, res) => {
	res.setHeader("Content-Type","application/json; charset=utf-8")
	res.setHeader("Transfer-Encoding","chunked")

	const eventName = 'on.change.leaderboard';

	eventEmitter.on(eventName, async(event) => {

		res.write(JSON.stringify(event));
	});

	setTimeout(() => {
			res.end();
	}, 10000);
});

router.get('/dispatch', asyncHandler(async (req, res) => {

	LeaderboardService.dispatchLeaderBoard();
	res.status(200);
	res.json({
		status: true
	});
}))


module.exports = router;