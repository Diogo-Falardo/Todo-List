import { pgTable, text, uuid, date, numeric } from "drizzle-orm/pg-core"

// Guest Table
export const table_guests = pgTable("guests", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  dateStart: date("date_start").notNull(),
  dateEnd: date("date_end").notNull(),
  notes: text("notes"),
  platform: text("platform").notNull(),
  total: numeric("total", { precision: 10, scale: 2 }),
})

// Maintenance Table
export const table_maintenance = pgTable("maintenance", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  moneyWantToSpend: numeric("money_want_to_spend", {
    precision: 10,
    scale: 2,
  }),
  actualCost: numeric("actual_cost", { precision: 10, scale: 2 }),
  daysToComplete: numeric("days_to_complete", { precision: 5, scale: 0 }),
})
