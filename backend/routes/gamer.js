const express = require('express');
const router = express.Router();
const GamerService = require('@services/gamer_service');

const redisClient = require('@database/redis_conn');
const Gamer = require('@models/Gamer');
const asyncHandler = require('express-async-handler')

router.get('/count', asyncHandler(async (req, res) => {

	const count = await Gamer.count({
		type: 'jungle'
	});

	res.status(200);
	res.json({count});
}))

router.get('/', asyncHandler(async (req, res) => {

	const gamers = await Gamer.find().limit(10).skip(3).exec();
	res.status(200);
	res.json(gamers);
}))


router.get('/adding/money/random', asyncHandler(async (req, res) => {

	let random = Math.floor(Math.random() * 1000);
	let randomMoney = Math.floor(Math.random() * 100);

	let randomGamer = await Gamer.findOne().skip(random).exec();

	await GamerService.addingMoney(randomGamer._id, randomMoney);

	res.status(201);
	res.json({
		status: true,
		money: randomMoney,
		gamer: randomGamer
	});
}))

router.get('/leaderboard', asyncHandler(async (req, res) => {

	const gamers = await redisClient.zange('weekly_leaderboard_10', 0, 100, 'withscores');
	res.status(200);
	res.send(gamers);
}))

module.exports = router;