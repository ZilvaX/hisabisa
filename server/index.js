// Setup Command Line Interface
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Command Line Interface
const { getEntries } = require('./dao.js')
const queryAction = () => {
  rl.question('hisabisa CLI userid: ', async (answer) => {
    const currentUser = answer
    console.log(`Querying userid: ${currentUser}`)
    const entries = await getEntries(currentUser)
    console.log(entries)
    rl.close()
  })
}

queryAction()
