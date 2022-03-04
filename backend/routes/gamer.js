const express = require('express');
const router = express.Router();

const redisClient = require('@database/redis_conn');
const Gamer = require('@models/Gamer');

router.get('/count', async(req,res) => {
	const count = await Gamer.count({ type: 'jungle' });
	console.log('Count:'+count);
	res.send(count);
})

router.get('/', async(req, res) => {
	const gamers = await Gamer.find().limit(10).skip(1).exec();
	res.json(gamers);
})

router.post('/adding/money', async(req, res) => {
	// action..
})

router.get('/leaderboard', async(req, res) => {
	const gamers = await redisClient.zRange('weekly_leaderboard_10',0,100,'withscores');
	res.send(gamers);
})

module.exports = router;