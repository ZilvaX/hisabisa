const express = require('express')
const { getOverdueEntries } = require('../../dao.js')
const router = express.Router()

router.get('/:id(\\d+)/overdue', async (req, res) => {
  try {
    const entries = await getOverdueEntries(req.params.id)
    res.send(entries)
  } catch (e) {
    res.status(500).send('Failed to obtain overdue entries')
  }
})

module.exports = router
