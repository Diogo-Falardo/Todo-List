import { z } from "zod"

/**
 * Base Zod schema for maintenance — mirrors the database schema.
 * This is the parent schema that all other schemas derive from.
 */
export const maintenanceSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "name is required"),
  money_want_to_spend: z.string().optional().nullable(),
  actual_cost: z.string().optional().nullable(),
  days_to_complete: z.string().optional().nullable(),
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
