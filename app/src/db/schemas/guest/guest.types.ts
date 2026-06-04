import { z } from "zod"
import {
  guestSchema,
  createGuestSchema,
  updateGuestSchema,
  guestIdSchema,
} from "./guest.schema"

/**
 * TypeScript types inferred from Zod schemas.
 * These are used throughout the application for type safety.
 */
export type Guest = z.infer<typeof guestSchema>
export type CreateGuest = z.infer<typeof createGuestSchema>
export type UpdateGuest = z.infer<typeof updateGuestSchema>
export type GuestId = z.infer<typeof guestIdSchema>
