const express = require('express')
const app = express()
const port = 8080
const db = require('./database/connection');

app.get('/', (req, res) => {
	
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
