const express = require('express')
const app = express()
const helmet = require('helmet')
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser')
const hpp = require('hpp');
const responseTime = require('response-time')

app.use(responseTime((req, res, time) => {
	const stat = (req.method + req.url).toLowerCase()
		.replace(/[:.]/g, '')
		.replace(/\//g, '_')
	logger.notice(`[responseTime] ${stat}:`, `${time}`)
}))

/**
 * Helmet functions
 * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
 */
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

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
require('@listeners/index');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * Swagger documentation initialize
 */
const specs = require('@docs/initSwagger');
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

/**
 * Routers
 */
const gamerRouter = require('@routes/gamer');
const leaderboardRouter = require('@routes/leader_board');
const logger = require('./logger');

app.use('/gamers',gamerRouter);
app.use('/leaderboard',leaderboardRouter);

/**
 * Express middleware to protect against HTTP Parameter Pollution attacks
 */
app.use(hpp());

/**
 * Express error handler middleware
 */
app.use((err, req, res, next) => {
	logger.error("[error]",err.stack);
	res.status(500).send({
		...err
	})
})

module.exports = app;