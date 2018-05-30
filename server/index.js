const express = require('express')
const router = require('./api')
const helmet = require('helmet')

const app = express()
app.use(express.json())
app.use(helmet())

app.use('/api', router)

app.listen(3000, () => console.log('Hisabisa listening on port 3000'))
