const env = process.env

const db = {
  user: env.DB_USER || 'admin',
  database: env.DB_NAME || 'hisabisa',
}

const config = {
  db,
}

module.exports = {
  secret: 'ohisashiburito',
  db: config.db,
}
