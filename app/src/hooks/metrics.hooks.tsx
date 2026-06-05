import { sfMetrics } from "@/lib/metrics"
import { useQuery } from "@tanstack/react-query"

export function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: () => sfMetrics(),
  })
}
