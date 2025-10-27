import { createPool } from 'mysql2/promise'
import { drizzle, type MySql2DrizzleConfig } from 'drizzle-orm/mysql2'
import * as schema from './schema'

const pool = createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: 10,
  decimalNumbers: true,
  queueLimit: 0,
  dateStrings: true,
})

const config: MySql2DrizzleConfig<typeof schema> = {
  schema,
  mode: 'default',
}

export const db = drizzle(pool, config)