import { db } from "../db/db.index"
import { table_maintenance } from "../db/schema"
import {
  createMaintenanceSchema,
  updateMaintenanceSchema,
  maintenanceIdSchema,
  type CreateMaintenance,
  type UpdateMaintenance,
} from "../db/schemas/maintenance.schema"
import { eq } from "drizzle-orm"

/**
 * MaintenanceServer manages all database operations for maintenance records.
 * Handles create, read, update, and delete operations on the maintenance table.
 * - Validates input using zod schemas.
 * - Throws validation errors on invalid data.
 */
class MaintenanceServer {
  /**
   * Create a new maintenance record.
   * - Validates input against createMaintenanceSchema.
   * @param data Maintenance data (id will be auto-generated)
   * @returns The created maintenance record
   * @throws ZodError if validation fails
   */
  async createMaintenance(data: CreateMaintenance) {
    const validatedData = createMaintenanceSchema.parse(data)
    const result = await db
      .insert(table_maintenance)
      .values(validatedData)
      .returning()
    return result[0]
  }

  /**
   * Retrieve a maintenance record by ID.
   * - Validates ID format using maintenanceIdSchema.
   * @param id Maintenance ID (UUID)
   * @returns The maintenance record if found, null otherwise
   * @throws ZodError if ID validation fails
   */
  async getMaintenanceById(id: string) {
    maintenanceIdSchema.parse({ id })
    const result = await db
      .select()
      .from(table_maintenance)
      .where(eq(table_maintenance.id, id))
    return result[0] || null
  }

  /**
   * Retrieve all maintenance records.
   * @returns Array of all maintenance records
   */
  async getAllMaintenance() {
    return await db.select().from(table_maintenance)
  }

  /**
   * Update a maintenance record by ID.
   * - Validates ID format and data against updateMaintenanceSchema.
   * @param id Maintenance ID (UUID)
   * @param data Partial maintenance data to update
   * @returns The updated maintenance record
   * @throws ZodError if validation fails
   */
  async updateMaintenance(id: string, data: UpdateMaintenance) {
    maintenanceIdSchema.parse({ id })
    const validatedData = updateMaintenanceSchema.parse(data)
    const result = await db
      .update(table_maintenance)
      .set(validatedData)
      .where(eq(table_maintenance.id, id))
      .returning()
    return result[0] || null
  }

  /**
   * Delete a maintenance record by ID.
   * - Validates ID format using maintenanceIdSchema.
   * @param id Maintenance ID (UUID)
   * @returns The deleted maintenance record
   * @throws ZodError if ID validation fails
   */
  async deleteMaintenance(id: string) {
    maintenanceIdSchema.parse({ id })
    const result = await db
      .delete(table_maintenance)
      .where(eq(table_maintenance.id, id))
      .returning()
    return result[0] || null
  }
}

export const maintenanceServer = new MaintenanceServer()
