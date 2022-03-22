const express = require('express');
const router = express.Router();
const LeaderboardService = require('@services/leader_board');
const asyncHandler = require('express-async-handler')


router.get('/', asyncHandler(async (req, res) => 

	const leaderboard = await LeaderboardService.fethScoreBoard();
	res.json(leaderboard);
}))

router.get('/dispatch', asyncHandler(async (req, res) => {

	LeaderboardService.dispatchLeaderBoard();
	res.json({
		status: true
	});
}))


module.exports = router;