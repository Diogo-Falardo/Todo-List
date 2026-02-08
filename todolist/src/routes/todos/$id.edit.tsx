import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import TodoForm from '@/components/todo-form'
import { createServerFn } from '@tanstack/react-start'
import { todos } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { db } from '@/db'

const loaderFn = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const todo = await db.query.todos.findFirst({
      where: eq(todos.id, data.id),
    })

    if (todo == null) throw notFound()

    return todo
  })

export const Route = createFileRoute('/todos/$id/edit')({
  component: RouteComponent,
  loader: async ({ params }) => loaderFn({ data: params }),
})

function RouteComponent() {
  const todo = Route.useLoaderData()
  return (
    <div className="container space-y-2">
      <Button
        asChild
        variant={'ghost'}
        size={'sm'}
        className="text-muted-foreground"
      >
        <Link to="/">
          <ArrowLeftIcon /> Todo List
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Edit {todo.name}</CardTitle>
          <CardDescription>Update the todo</CardDescription>
        </CardHeader>
        <CardContent>
          <TodoForm todo={todo} />
        </CardContent>
      </Card>
    </div>
  )
}
