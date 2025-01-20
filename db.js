// db.js
import "dotenv/config"
import postgres from 'postgres'

const DATABASE_URL = process.env.DATABASE_URL
const sql = postgres( DATABASE_URL, { ssl:'require'} ) // will use psql environment variables

export default sql 