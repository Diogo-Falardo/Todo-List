import { throwError } from "@/middlewares/error"
import { db } from "../db/db.index"
import { table_maintenance } from "../db/schema"
import { eq } from "drizzle-orm"
import { log } from "@/middlewares/logger"
import type {
  CreateMaintenance,
  Maintenance,
  UpdateMaintenance,
} from "@/db/schemas/maintenance/maintenance.types"

/**
 * MaintenanceServer manages all database operations for maintenance records.
 * Handles create, read, update, and delete operations on the maintenance table.
 * - Validates input using zod schemas.
 * - Throws validation errors on invalid data.
 */
class MaintenanceServer {
  /**
   * Create a new maintenance record.
   * @param data Maintenance data (id will be auto-generated)
   * @returns The created maintenance record
   * @throws ZodError if validation fails
   */
  async createMaintenance(data: CreateMaintenance): Promise<CreateMaintenance> {
    try {
      const [result] = await db
        .insert(table_maintenance)
        .values(data)
        .returning()
      log.withMetadata(data).info("maintenance created")
      return result
    } catch (error) {
      throwError({
        error,
        logError: "MaintenanceServer.createMaintenance",
        exceptionErrorMessage: "Error creating maintenance!",
      })
    }
  }

  /**
   * Retrieve a maintenance record by ID.
   * @param id Maintenance ID (UUID)
   * @returns The maintenance record if found, null otherwise
   * @throws ZodError if ID validation fails
   */
  async getMaintenanceById(id: string): Promise<Maintenance | null> {
    try {
      const [result] = await db
        .select()
        .from(table_maintenance)
        .where(eq(table_maintenance.id, id))
      return result || null
    } catch (error) {
      throwError({
        error,
        logError: "MaintenanceServer.getMaintenanceById",
        exceptionErrorMessage: "Error retrieving maintenance!",
      })
    }
  }

  /**
   * Retrieve all maintenance records.
   * @returns Array of all maintenance records
   */
  async getAllMaintenance(): Promise<Array<Maintenance>> {
    try {
      const result = await db.select().from(table_maintenance)
      return result
    } catch (error) {
      throwError({
        error,
        logError: "MaintenanceServer.getAllMaintenance",
        exceptionErrorMessage: "Error retrieving maintenance records!",
      })
    }
  }

  /**
   * Update a maintenance record by ID.
   * @param id Maintenance ID (UUID)
   * @param data Partial maintenance data to update
   * @returns The updated maintenance record
   * @throws ZodError if validation fails
   */
  async updateMaintenance(
    id: string,
    data: UpdateMaintenance
  ): Promise<Maintenance | null> {
    try {
      const [result] = await db
        .update(table_maintenance)
        .set(data)
        .where(eq(table_maintenance.id, id))
        .returning()
      log.withMetadata({ id, data }).info("maintenance updated")
      return result || null
    } catch (error) {
      throwError({
        error,
        logError: "MaintenanceServer.updateMaintenance",
        exceptionErrorMessage: "Error updating maintenance!",
      })
    }
  }

  /**
   * Delete a maintenance record by ID.
   * @param id Maintenance ID (UUID)
   * @returns The deleted maintenance record
   * @throws ZodError if ID validation fails
   */
  async deleteMaintenance(id: string): Promise<Maintenance | null> {
    try {
      const [result] = await db
        .delete(table_maintenance)
        .where(eq(table_maintenance.id, id))
        .returning()
      log.withMetadata({ id }).info("maintenance deleted")
      return result || null
    } catch (error) {
      throwError({
        error,
        logError: "MaintenanceServer.deleteMaintenance",
        exceptionErrorMessage: "Error deleting maintenance!",
      })
    }
  }
}

export const maintenanceServer = new MaintenanceServer()
