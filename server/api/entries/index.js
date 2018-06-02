const express = require('express')
const { getOverdueEntries, removeEntry } = require('../../dao.js')
const router = express.Router()

router.get('/:id(\\d+)/overdue', async (req, res) => {
  try {
    const entries = await getOverdueEntries(req.params.id)
    res.send(entries)
  } catch (e) {
    res.status(500).send('Failed to obtain overdue entries')
  }
})

router.delete('/:id(\\d+)', (req, res) => {
  // TODO Check if the user has permissions to remove the entry
  removeEntry(req.params.id)
    .then(() => res.status(204).send())
    .catch(e => {
      console.error(e)
      res.status(500).send()
    })
})

module.exports = router
