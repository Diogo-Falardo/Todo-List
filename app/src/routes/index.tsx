import { AddMaintenance } from "@/components/add-maintenance"
import { AddReserve } from "@/components/add-reserve"
import { ListMaintenance } from "@/components/list-maintenance"
import { ListReserve } from "@/components/list-reserve"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMetrics } from "@/hooks/metrics.hooks"
import { createFileRoute } from "@tanstack/react-router"
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const { data, isLoading, isError } = useMetrics()

  const chartData = [
    {
      name: "Revenue",
      value: data?.r ?? 0,
    },
    {
      name: "Maintenance",
      value: data?.m ?? 0,
    },
  ]

  return (
    <div className="flex min-h-svh flex-col gap-5 p-6">
      {/* metrics */}
      {isLoading ? (
        <Card>Loading…</Card>
      ) : isError ? (
        <Card>Error loading metrics</Card>
      ) : data ? (
        <Card>
          <CardHeader>
            <CardTitle>Revenue VS Maintenance</CardTitle>
            <CardContent>
              <BarChart width={350} height={250} data={chartData}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey={"name"} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4ade80" />
              </BarChart>
            </CardContent>
          </CardHeader>
        </Card>
      ) : null}

      <Card className="flex w-full flex-row gap-2 px-4">
        <AddReserve />
        <ListReserve />
      </Card>
      <Card className="flex w-full flex-row gap-2 px-4">
        <AddMaintenance />
        <ListMaintenance />
      </Card>
    </div>
  )
}
