const request = require('request');


module.exports = (io) => {
    const leaderboard_nsp = io.of("/leaderboard");

    /**
     * Leaderboard namespace
     */
    leaderboard_nsp.on("connection", socket => {
        //Dispatch first data
        request.get('http://backend:8080/leaderboard/dispatch', function (error, response, body) {})
    });


    return leaderboard_nsp;
}