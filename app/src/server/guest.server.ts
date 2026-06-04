import { db } from "../db/db.index"
import { table_guests } from "../db/schema"
import {
  createGuestSchema,
  updateGuestSchema,
  guestIdSchema,
  type CreateGuestInput,
  type UpdateGuestInput,
} from "../db/schemas/guest.schema"
import { eq } from "drizzle-orm"

/**
 * GuestServer manages all database operations for guests.
 * Handles create, read, update, and delete operations on the guests table.
 * - Validates input using zod schemas.
 * - Throws validation errors on invalid data.
 */
class GuestServer {
  /**
   * Create a new guest record.
   * - Validates input against createGuestSchema.
   * @param data Guest data (id will be auto-generated)
   * @returns The created guest record
   * @throws ZodError if validation fails
   */
  async createGuest(data: CreateGuestInput) {
    const validatedData = createGuestSchema.parse(data)
    const result = await db
      .insert(table_guests)
      .values(validatedData)
      .returning()
    return result[0]
  }

  /**
   * Retrieve a guest by ID.
   * - Validates ID format using guestIdSchema.
   * @param id Guest ID (UUID)
   * @returns The guest record if found, null otherwise
   * @throws ZodError if ID validation fails
   */
  async getGuestById(id: string) {
    guestIdSchema.parse({ id })
    const result = await db
      .select()
      .from(table_guests)
      .where(eq(table_guests.id, id))
    return result[0] || null
  }

  /**
   * Retrieve all guests.
   * @returns Array of all guest records
   */
  async getAllGuests() {
    return await db.select().from(table_guests)
  }

  /**
   * Update a guest record by ID.
   * - Validates ID format and data against updateGuestSchema.
   * @param id Guest ID (UUID)
   * @param data Partial guest data to update
   * @returns The updated guest record
   * @throws ZodError if validation fails
   */
  async updateGuest(id: string, data: UpdateGuestInput) {
    guestIdSchema.parse({ id })
    const validatedData = updateGuestSchema.parse(data)
    const result = await db
      .update(table_guests)
      .set(validatedData)
      .where(eq(table_guests.id, id))
      .returning()
    return result[0] || null
  }

  /**
   * Delete a guest record by ID.
   * - Validates ID format using guestIdSchema.
   * @param id Guest ID (UUID)
   * @returns The deleted guest record
   * @throws ZodError if ID validation fails
   */
  async deleteGuest(id: string) {
    guestIdSchema.parse({ id })
    const result = await db
      .delete(table_guests)
      .where(eq(table_guests.id, id))
      .returning()
    return result[0] || null
  }
}

export const guestServer = new GuestServer()
