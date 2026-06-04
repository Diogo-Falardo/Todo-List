import { guestServer } from "../server/guest.server"
import {
  type CreateGuestInput,
  type UpdateGuestInput,
} from "../db/schemas/guest.schema"

/**
 * Create a new guest record.
 * Delegates to guestServer.createGuest().
 * - Validates input using zod schema.
 * @param data Guest data to create
 * @returns The created guest record
 * @throws ZodError if validation fails
 */
export async function createGuest(data: CreateGuestInput) {
  return await guestServer.createGuest(data)
}

/**
 * Retrieve a guest by ID.
 * Delegates to guestServer.getGuestById().
 * - Validates UUID format.
 * @param id Guest ID (UUID)
 * @returns The guest record if found, null otherwise
 * @throws ZodError if ID validation fails
 */
export async function getGuestById(id: string) {
  return await guestServer.getGuestById(id)
}

/**
 * Retrieve all guests.
 * Delegates to guestServer.getAllGuests().
 * @returns Array of all guest records
 */
export async function getAllGuests() {
  return await guestServer.getAllGuests()
}

/**
 * Update a guest record by ID.
 * Delegates to guestServer.updateGuest().
 * - Validates ID format and partial data using zod schema.
 * @param id Guest ID (UUID)
 * @param data Partial guest data to update
 * @returns The updated guest record if found, null otherwise
 * @throws ZodError if validation fails
 */
export async function updateGuest(id: string, data: UpdateGuestInput) {
  return await guestServer.updateGuest(id, data)
}

/**
 * Delete a guest record by ID.
 * Delegates to guestServer.deleteGuest().
 * - Validates UUID format.
 * @param id Guest ID (UUID)
 * @returns The deleted guest record if found, null otherwise
 * @throws ZodError if ID validation fails
 */
export async function deleteGuest(id: string) {
  return await guestServer.deleteGuest(id)
}
