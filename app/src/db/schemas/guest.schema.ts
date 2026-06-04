import { z } from "zod"

/**
 * Zod schema for guest creation.
 * Validates all required and optional fields for inserting a new guest.
 */
export const createGuestSchema = z.object({
  name: z.string().min(1, "name is required"),
  date_start: z.string().min(1, "date_start is required"),
  date_end: z.string().min(1, "date_end is required"),
  notes: z.string().nullable().optional(),
  platform: z.string().min(1, "platform is required"),
  total: z.string().nullable().optional(),
})

/**
 * Zod schema for guest updates.
 * Validates partial guest data for updating existing records.
 */
export const updateGuestSchema = createGuestSchema.partial()

/**
 * Zod schema for guest ID validation.
 * Validates UUID format.
 */
export const guestIdSchema = z.object({
  id: z.uuid("id must be a valid UUID"),
})

export type CreateGuest = z.infer<typeof createGuestSchema>
export type UpdateGuest = z.infer<typeof updateGuestSchema>
export type GuestId = z.infer<typeof guestIdSchema>
