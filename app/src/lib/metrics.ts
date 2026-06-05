import { sfGetReserves } from "@/server/guests/guest.functions"
import { sfGetMaintenances } from "@/server/maintenance/maintenance.functions"
import { createServerFn } from "@tanstack/react-start"

export const sfMetrics = createServerFn({ method: "GET" }).handler(async () => {
  const reservs = await sfGetReserves()
  const maintenance = await sfGetMaintenances()

  const reservs_total = reservs.reduce(
    (sum, r) => sum + Number(r.total ?? 0),
    0
  )
  const maintenance_total = maintenance.reduce(
    (sum, m) => sum + Number(m.actualCost ?? 0),
    0
  )

  return {
    r: reservs_total,
    m: maintenance_total,
  }
})
