const express = require('express');
const router = express.Router();
const LeaderboardService = require('@services/leader_board');


router.get('/', async(req, res) => {
	const leaderboard = await LeaderboardService.fethScoreBoard();
	res.json(leaderboard);
})

router.get('/dispatch', (req, res) => {
	LeaderboardService.dispatchLeaderBoard();
	res.json({
		status: true
	});
})


module.exports = router;