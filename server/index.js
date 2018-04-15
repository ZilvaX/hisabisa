// Setup Command Line Interface
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Define Database Queries
const db = require('../db')
const queryEntries = (currentUser) => {
  db.query('SELECT * FROM entries where userid=$1', [currentUser])
    .then(res => console.log(res.rows))
    .catch(e => console.error(e.stack))
}

// Command Line Interface
const queryAction = () => {
  rl.question('hisabisa CLI userid: ', (answer) => {
    const currentUser = answer
    console.log(`Querying userid: ${currentUser}`)
    queryEntries(currentUser)
    rl.close()
  })
}

queryAction()