const express = require('express');
const router = express.Router();
const LeaderboardService = require('@services/leader_board');
const asyncHandler = require('express-async-handler')
const eventEmitter = require('@events/event_emitter');



/**
 * @swagger
 * /leaderboard:
 *   get:
 *     summary: Returns leaderboard
 *     tags: [Leaderboard]
 *     responses:
 *       200:
 *         description: Returns first 100 gamers according to their score
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/', asyncHandler(async (req, res) => {

	const leaderboard = await LeaderboardService.fethScoreBoard();
	res.status(200);
	res.json(leaderboard);
}))

/**
 * @swagger
 * /leaderboard/polling:
 *   get:
 *     summary: Returns leaderboard with http polling
 *     tags: [Leaderboard]
 *     responses:
 *       200:
 *         description: Returns first 100 gamers according to their score with http polling
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
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

// WIP
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

/**
 * @swagger
 * /leaderboard/dispatch:
 *   get:
 *     summary: Dispatch leaderboard change event
 *     tags: [Leaderboard]
 *     responses:
 *       200:
 *         description: It dispatches leaderboard change event for all the listeners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/dispatch', asyncHandler(async (req, res) => {

	LeaderboardService.dispatchLeaderBoard();
	res.status(200);
	res.json({
		status: true
	});
}))


module.exports = router;