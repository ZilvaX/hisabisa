import { db } from '../config'
const { Pool } = require('pg')
// Create a DB connection pool and export the connection type
export default new Pool(db)
