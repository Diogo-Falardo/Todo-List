import { useGetReservs } from "@/hooks/guest.hooks"
import { ScrollArea } from "./ui/scroll-area"
import { Card } from "./ui/card"

export const ListReserve = () => {
  const { data, isLoading, isError } = useGetReservs()

  if (data) {
    console.log(data)
  }

  return (
    <div className="h-40">
      <ScrollArea className="h-full">
        <div className="h-full p-1 py-2">
          {data?.map((r) => (
            <Card key={r.id} className="flex flex-row items-center px-2">
              <h1>{r.name}</h1>
              <p className="text-primary/50">
                {r.dateStart} {r.dateEnd}
              </p>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
