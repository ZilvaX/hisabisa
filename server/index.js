const express = require('express')
const bodyParser = require('body-parser')
const { getEntries, insertEntry } = require('./dao.js')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('/entries/:id: Gets entries for given id'))

app.get('/entries/:id(\\d+)', async (req, res) => {
  const entries = await getEntries(req.params.id)
  res.send(entries)
})

app.post('/entry/', async (req, res) => {
  const body = req.body
  const entry = await insertEntry(body.user, body.event, body.lastoccurence, body.frequency)
  res.send(entry)
})

app.listen(3000, () => console.log('Hisabisa listening on port 3000'))
