const config = {
    env: process.env.NODE_ENV || 'development',
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 8000,
    redis: {
        connectionString: process.env.REDIS_CONN || 'redis://redis:6379'
    },
};

module.exports = config;