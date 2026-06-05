import { useGetMaintenacens } from "@/hooks/maintenance.hooks"
import { ScrollArea } from "./ui/scroll-area"
import { Card } from "./ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu"
import { EllipsisIcon } from "lucide-react"
import { Empty, EmptyHeader, EmptyTitle } from "./ui/empty"
import { Button } from "./ui/button"

export const ListMaintenance = () => {
  const { data, isLoading, isError } = useGetMaintenacens()

  if (data) {
    console.log(data)
  }

  if (isLoading) {
    return <div>Loading maintenance list</div>
  }

  if (isError) {
    return <div>Error maintenance reserve list</div>
  }

  return (
    <div className="h-40">
      <ScrollArea className="h-full">
        <div className="h-full p-1 py-2">
          {data && data.length > 0 ? (
            data.map((r) => (
              <Card
                key={r.id}
                className="flex flex-row items-center justify-between px-2"
              >
                <div>
                  <h1>{r.name}</h1>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Button className="w-full" variant="destructive">
                        delete
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Card>
            ))
          ) : (
            <Card className="p-0">
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>No maintenances</EmptyTitle>
                </EmptyHeader>
              </Empty>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
