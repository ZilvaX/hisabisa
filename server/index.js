const express = require('express')
const app = express()
const { getEntries } = require('./dao.js')

app.get('/', (req, res) => res.send('/entries/:id: Gets entries for given id'))

app.get('/entries/:id', async (req, res) => {
  const entries = await getEntries(req.params.id)
  res.send(entries)
})

app.listen(3000, () => console.log('Hisabisa listening on port 3000'))