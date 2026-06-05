import { sfGetReserves } from "@/server/guests/guest.functions"
import { useQuery } from "@tanstack/react-query"

export function useGetReservs() {
  return useQuery({ queryKey: ["reservs"], queryFn: () => sfGetReserves() })
}
