import { z } from "zod"

/**
 * Zod schema for guest creation.
 * Validates all required and optional fields for inserting a new guest.
 */
export const createGuestSchema = z.object({
  name: z.string().min(1, "name is required"),
  date_start: z
    .date("date_start must be a valid date")
    .transform((date) => date.toISOString().split("T")[0]),
  date_end: z
    .date("date_end must be a valid date")
    .transform((date) => date.toISOString().split("T")[0]),
  notes: z.string().optional(),
  platform: z.string().min(1, "platform is required"),
  total: z.string().optional(),
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
export type CreateGuestInput = z.input<typeof createGuestSchema>
export type UpdateGuest = z.infer<typeof updateGuestSchema>
export type UpdateGuestInput = z.input<typeof updateGuestSchema>
export type GuestId = z.infer<typeof guestIdSchema>
