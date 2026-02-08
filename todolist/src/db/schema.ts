import {
  boolean,
  char,
  mysqlTable,
  text,
  timestamp,
} from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm'

export const todos = mysqlTable('todos', {
  id: char('id', { length: 36 })
    .primaryKey()
    .default(sql`(uuid())`),

  name: text('name').notNull(),

  isComplete: boolean('is_complete').notNull(),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),

  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .onUpdateNow()
    .notNull(),
})
