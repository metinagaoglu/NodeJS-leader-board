const express = require('express')
const app = express()
const port = 8080
const mongoClient = require('./database/mongodb_conn');
const redisClient = require('./database/redis_conn');

app.get('/', (req, res) => {
	
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
