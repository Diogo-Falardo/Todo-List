import { maintenanceServer } from "../server/maintenance.server"
import {
  type CreateMaintenance,
  type UpdateMaintenance,
} from "../db/schemas/maintenance.schema"

/**
 * Create a new maintenance record.
 * Delegates to maintenanceServer.createMaintenance().
 * - Validates input using zod schema.
 * @param data Maintenance data to create
 * @returns The created maintenance record
 * @throws ZodError if validation fails
 */
export async function createMaintenance(data: CreateMaintenance) {
  return await maintenanceServer.createMaintenance(data)
}

/**
 * Retrieve a maintenance record by ID.
 * Delegates to maintenanceServer.getMaintenanceById().
 * - Validates UUID format.
 * @param id Maintenance ID (UUID)
 * @returns The maintenance record if found, null otherwise
 * @throws ZodError if ID validation fails
 */
export async function getMaintenanceById(id: string) {
  return await maintenanceServer.getMaintenanceById(id)
}

/**
 * Retrieve all maintenance records.
 * Delegates to maintenanceServer.getAllMaintenance().
 * @returns Array of all maintenance records
 */
export async function getAllMaintenance() {
  return await maintenanceServer.getAllMaintenance()
}

/**
 * Update a maintenance record by ID.
 * Delegates to maintenanceServer.updateMaintenance().
 * - Validates ID format and partial data using zod schema.
 * @param id Maintenance ID (UUID)
 * @param data Partial maintenance data to update
 * @returns The updated maintenance record if found, null otherwise
 * @throws ZodError if validation fails
 */
export async function updateMaintenance(id: string, data: UpdateMaintenance) {
  return await maintenanceServer.updateMaintenance(id, data)
}

/**
 * Delete a maintenance record by ID.
 * Delegates to maintenanceServer.deleteMaintenance().
 * - Validates UUID format.
 * @param id Maintenance ID (UUID)
 * @returns The deleted maintenance record if found, null otherwise
 * @throws ZodError if ID validation fails
 */
export async function deleteMaintenance(id: string) {
  return await maintenanceServer.deleteMaintenance(id)
}
