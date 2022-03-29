const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Leaderboard API",
            version: "1.0.0",
            description: "A leaderboard HTTP API",
            contact: {
                name: "API Support",
                email: "metnagaoglu@gmail.com",
            },
        },
        servers: [{
            url: "http://localhost:8080",
            description: "Leaderboard API Documentation",
        }, ],
    },
    apis: ["routes/*.js"],
};

const specs = swaggerJsDoc(options);

module.exports = specs;