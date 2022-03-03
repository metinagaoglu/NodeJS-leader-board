const express = require('express')
const app = express()
const port = 8080

require('module-alias/register');
require('@database/mongodb_conn');

app.get('/', (req, res) => {
 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
