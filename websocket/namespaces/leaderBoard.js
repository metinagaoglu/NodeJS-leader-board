const request = require('request');
const io = require('./../io');

const leaderboardNamespace = io.of("/leaderboard");

/**
 * Leaderboard namespace
 */
 leaderboardNamespace.on("connection", socket => {
    //Dispatch first data
    request.get('http://backend:8080/leaderboard/dispatch', function (error, response, body) {})
});


module.exports = leaderboardNamespace;