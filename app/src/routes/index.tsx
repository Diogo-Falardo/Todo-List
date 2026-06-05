import { AddReserve } from "@/components/add-reserve"
import { ListReserve } from "@/components/list-reserve"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="w-full">
        <AddReserve />
        <ListReserve />
      </div>
    </div>
  )
}
