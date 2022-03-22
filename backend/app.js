const express = require('express')
const app = express()
const port = 8080
const helmet = require('helmet')

/**
 * Helmet functions
 * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
 */
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());

/**
 * Import module alias
 */
require('module-alias/register');

/**
 * DB connections
 */
require('@database/mongodb_conn');

/**
 * Listeners
 */
require('@listeners/on_adding_money');

/**
 * Routers
 */
const gamerRouter = require('@routes/gamer');
const leaderboardRouter = require('@routes/leader_board');

app.use('/gamers',gamerRouter);
app.use('/leaderboard',leaderboardRouter);

/**
 * Express error handler middleware
 */
app.use((err, req, res, next) => {
	//TODO: log
	res.status(500).send({
		...err
	})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})