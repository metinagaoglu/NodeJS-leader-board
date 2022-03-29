const express = require('express');
const router = express.Router();
const GamerService = require('@services/gamer_service');

const redisClient = require('@database/redis_conn');
const Gamer = require('@models/Gamer');
const asyncHandler = require('express-async-handler');


/**
 * @swagger
 * /gamers/count:
 *   get:
 *     summary: Returns count of gamers
 *     tags: [Gamers]
 *     responses:
 *       200:
 *         description: the count of the gamers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/count', asyncHandler(async (req, res) => {

	const count = await Gamer.count({
		type: 'jungle'
	});

	res.status(200);
	res.json({count});
}))

/**
 * @swagger
 * /gamers:
 *   get:
 *     summary: Returns all gamers
 *     tags: [Gamers]
 *     responses:
 *       200:
 *         description: Returns all gamers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/', asyncHandler(async (req, res) => {

	const gamers = await Gamer.find().limit(10).skip(3).exec();
	res.status(200);
	res.json(gamers);
}))

/**
 * @swagger
 * /gamers/adding/money/random:
 *   get:
 *     summary: Adds money to random gamer
 *     tags: [Gamers]
 *     responses:
 *       201:
 *         description: A random one of the gamers in the game adds a random amount of money  his account.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
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

module.exports = router;