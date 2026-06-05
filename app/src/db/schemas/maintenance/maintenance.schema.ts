import { z } from "zod"

/**
 * Base Zod schema for maintenance — mirrors the database schema.
 * This is the parent schema that all other schemas derive from.
 */
export const maintenanceSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "name is required"),
  moneyWantToSpend: z.string().optional().nullable(),
  actualCost: z.string().optional().nullable(),
  daysToComplete: z.string().optional().nullable(),
})

/**
 * Schema for creating a maintenance record.
 * Excludes id (auto-generated), includes all required and optional fields.
 */
export const createMaintenanceSchema = maintenanceSchema.omit({ id: true })

/**
 * Schema for updating a maintenance record.
 * All fields optional except id.
 */
export const updateMaintenanceSchema = createMaintenanceSchema.partial()

/**
 * Schema for maintenance ID validation.
 */
export const maintenanceIdSchema = z.object({
  id: z.uuid("id must be a valid UUID"),
})
