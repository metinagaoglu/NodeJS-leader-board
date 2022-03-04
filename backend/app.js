const express = require('express')
const app = express()
const port = 8080

// DB connections
require('module-alias/register');
require('@database/mongodb_conn');

/**
 * Listeners
 */
require('@listeners/on_adding_money');

/**
 * Routers
 */
const gamerRouter = require('@routes/gamer');

 app.use('/gamers',gamerRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})