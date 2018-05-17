const express = require('express')
const bodyParser = require('body-parser')
const router = require('./api')
const helmet = require('helmet')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(helmet())

app.use('/api', router)

app.listen(3000, () => console.log('Hisabisa listening on port 3000'))
