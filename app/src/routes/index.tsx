import { AddMaintenance } from "@/components/add-maintenance"
import { AddReserve } from "@/components/add-reserve"
import { ListMaintenance } from "@/components/list-maintenance"
import { ListReserve } from "@/components/list-reserve"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="flex min-h-svh flex-col p-6">
      <div className="w-full">
        <AddReserve />
        <ListReserve />
      </div>
      <div className="w-full">
        <AddMaintenance />
        <ListMaintenance />
      </div>
    </div>
  )
}
