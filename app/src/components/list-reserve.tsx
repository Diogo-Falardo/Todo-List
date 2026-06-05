import { useGetReservs } from "@/hooks/guest.hooks"
import { ScrollArea } from "./ui/scroll-area"
import { Card } from "./ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { EllipsisIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Empty, EmptyHeader, EmptyTitle } from "./ui/empty"

export const ListReserve = () => {
  const { data, isLoading, isError } = useGetReservs()

  if (data) {
    console.log(data)
  }

  if (isLoading) {
    return <div>Loading reserve list</div>
  }

  if (isError) {
    return <div>Error loading reserve list</div>
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
                  <p className="text-primary/50">
                    {r.dateStart} until {r.dateEnd}
                  </p>
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
                  <EmptyTitle>No reservs</EmptyTitle>
                </EmptyHeader>
              </Empty>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
