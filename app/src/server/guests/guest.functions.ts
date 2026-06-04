import type { CreateGuest } from "@/db/schemas/guest/guest.types"
import { createServerFn } from "@tanstack/react-start"
import { guestServer } from "./guest.server"

export const sfCreateReserve = createServerFn({ method: "POST" })
  .inputValidator((data: { dto: CreateGuest }) => data)
  .handler(async ({ data }) => await guestServer.createGuest(data.dto))
