import type { CreateMaintenance } from "@/db/schemas/maintenance/maintenance.types"
import { createServerFn } from "@tanstack/react-start"
import { maintenanceServer } from "./maintenance.server"

export const sfCreateMaintenance = createServerFn({ method: "POST" })
  .inputValidator((data: { dto: CreateMaintenance }) => data)
  .handler(
    async ({ data }) => await maintenanceServer.createMaintenance(data.dto)
  )

export const sfGetMaintenances = createServerFn({ method: "GET" }).handler(
  async () => await maintenanceServer.getAllMaintenance()
)
