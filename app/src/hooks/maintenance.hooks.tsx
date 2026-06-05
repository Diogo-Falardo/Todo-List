import { sfGetMaintenances } from "@/server/maintenance/maintenance.functions"
import { useQuery } from "@tanstack/react-query"

export function useGetMaintenacens() {
  return useQuery({
    queryKey: ["maintenances"],
    queryFn: () => sfGetMaintenances(),
  })
}
