const express = require('express')
const bodyParser = require('body-parser')
const router = require('./api')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)

app.listen(3000, () => console.log('Hisabisa listening on port 3000'))
