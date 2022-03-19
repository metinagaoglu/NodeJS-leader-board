const express = require('express');
const router = express.Router();
const GamerService = require('@services/gamer_service');

const redisClient = require('@database/redis_conn');
const Gamer = require('@models/Gamer');

router.get('/count', async(req,res) => {
	const count = await Gamer.count({ type: 'jungle' });
	console.log('Count:'+count);
	res.send(count);
})

router.get('/', async(req, res) => {
	const gamers = await Gamer.find().limit(10).skip(3).exec();
	res.json(gamers);
})


router.get('/adding/money/random', async (req, res, next) => {
	let random = Math.floor(Math.random() * 1000);
	let randomMoney = Math.floor(Math.random() * 100);

	let randomGamer = await Gamer.findOne().skip(random).exec();

	try {
		await GamerService.addingMoney(randomGamer._id,randomMoney);
	} catch(e) {
		next(e);
	}

	res.json({
		status: true,
		money: randomMoney,
		gamer: randomGamer
	});
})

router.get('/leaderboard', async(req, res) => {
	const gamers = await redisClient.zRange('weekly_leaderboard_10',0,100,'withscores');
	res.send(gamers);
})

module.exports = router;