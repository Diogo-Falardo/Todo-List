import { z } from "zod"

/**
 * Zod schema for maintenance creation.
 * Validates all required and optional fields for inserting a new maintenance record.
 */
export const createMaintenanceSchema = z.object({
  name: z.string().min(1, "name is required"),
  money_want_to_spend: z.string().optional(),
  actual_cost: z.string().optional(),
  days_to_complete: z.string().optional(),
})

/**
 * Zod schema for maintenance updates.
 * Validates partial maintenance data for updating existing records.
 */
export const updateMaintenanceSchema = createMaintenanceSchema.partial()

/**
 * Zod schema for maintenance ID validation.
 * Validates UUID format.
 */
export const maintenanceIdSchema = z.object({
  id: z.uuid("id must be a valid UUID"),
})

export type CreateMaintenance = z.infer<typeof createMaintenanceSchema>
export type UpdateMaintenance = z.infer<typeof updateMaintenanceSchema>
export type MaintenanceId = z.infer<typeof maintenanceIdSchema>
