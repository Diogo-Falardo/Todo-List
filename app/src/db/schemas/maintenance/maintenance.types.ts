import { z } from "zod"
import {
  maintenanceSchema,
  createMaintenanceSchema,
  updateMaintenanceSchema,
  maintenanceIdSchema,
} from "./maintenance.schema"

/**
 * TypeScript types inferred from Zod schemas.
 * These are used throughout the application for type safety.
 */
export type Maintenance = z.infer<typeof maintenanceSchema>
export type CreateMaintenance = z.infer<typeof createMaintenanceSchema>
export type UpdateMaintenance = z.infer<typeof updateMaintenanceSchema>
export type MaintenanceId = z.infer<typeof maintenanceIdSchema>
