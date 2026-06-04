import { z } from "zod"

/**
 * Base Zod schema for guest — mirrors the database schema.
 * This is the parent schema that all other schemas derive from.
 */
export const guestSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "name is required"),
  dateStart: z.string().min(1, "Starting date is required"),
  dateEnd: z.string().min(1, "Ending Date is required"),
  notes: z.string().optional().nullable(),
  platform: z.string().min(1, "platform is required"),
  total: z.string().optional().nullable(),
})

/**
 * Schema for creating a guest.
 * Excludes id (auto-generated), includes all required and optional fields.
 */
export const createGuestSchema = guestSchema.omit({ id: true })

/**
 * Schema for updating a guest.
 * All fields optional except id.
 */
export const updateGuestSchema = createGuestSchema.partial()

/**
 * Schema for guest ID validation.
 */
export const guestIdSchema = z.object({
  id: z.uuid("id must be a valid UUID"),
})
