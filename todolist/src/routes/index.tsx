import { z } from 'zod'
import { startTransition, useState } from 'react'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { eq } from 'drizzle-orm'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { EditIcon, ListTodoIcon, PlusIcon, Trash } from 'lucide-react'
import { db } from '@/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { todos } from '@/db/schema'

const loader = createServerFn({
  method: 'GET',
}).handler(() => {
  return db.query.todos.findMany()
})

export const Route = createFileRoute('/')({
  component: App,
  loader: () => {
    return loader()
  },
})

function App() {
  const data = Route.useLoaderData()

  const completedCount = data.filter((t) => t.isComplete).length
  const totalCount = data.length

  return (
    <div className="min-h-screen container space-y-8">
      <div className="flex justify-between items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Todo List</h1>
          {totalCount > 0 && (
            <Badge variant="outline">
              {completedCount} of {totalCount} completed
            </Badge>
          )}
        </div>
        <div>
          <Button className="" size={'sm'} asChild>
            <Link to="/todos/new">
              <PlusIcon />
              Add Todo
            </Link>
          </Button>
        </div>
      </div>

      {/* table */}
      <TodoListTable todos={data} />
    </div>
  )
}

// table

type Todo = {
  id: string
  name: string
  isComplete: boolean
  createdAt: Date
}

type TodoListTableProps = {
  todos: Array<Todo>
}

function TodoListTable({ todos }: TodoListTableProps) {
  if (todos.length === 0) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant={'icon'}>
            <ListTodoIcon />
          </EmptyMedia>
          <EmptyTitle>No todos</EmptyTitle>
          <EmptyDescription>Try adding a new todo</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button className="" size={'sm'} asChild>
            <Link to="/todos/new">
              <PlusIcon />
              Add Todo
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead></TableHead>
          <TableHead>Task</TableHead>
          <TableHead>Created On</TableHead>
          <TableHead className="w-0"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TodoTableRow key={todo.id} {...todo} />
        ))}
      </TableBody>
    </Table>
  )
}

const deleteFn = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    await db.delete(todos).where(eq(todos.id, data.id))

    return { error: false }
  })

const toogleFn = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      id: z.string(),
      isComplete: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    await new Promise((res) => setTimeout(res, 1000))
    await db
      .update(todos)
      .set({ isComplete: data.isComplete })
      .where(eq(todos.id, data.id))
  })

function TodoTableRow({
  id,
  name,
  isComplete,
  createdAt,
}: {
  id: string
  name: string
  isComplete: boolean
  createdAt: Date
}) {
  const deleted = useServerFn(deleteFn)
  const activator = useServerFn(toogleFn)
  const [iscComplete, setIscComlete] = useState(isComplete)
  const router = useRouter()
  return (
    <TableRow
      onClick={(e) => {
        const target = e.target as HTMLElement
        if (target.closest('[data-actions]')) return

        setIscComlete((c) => !c)
        startTransition(async () => {
          await activator({ data: { id, isComplete: !isComplete } })
        })
        router.invalidate()
      }}
    >
      <TableCell>
        <Checkbox checked={isComplete} />
      </TableCell>
      <TableCell className={cn('font-medium', isComplete && 'line-through')}>
        {name}
      </TableCell>
      <TableCell>{createdAt.toLocaleString()}</TableCell>
      <TableCell data-actions>
        <Button variant={'ghost'} size={'icon-sm'} asChild>
          <Link to="/todos/$id/edit" params={{ id }}>
            <EditIcon />
          </Link>
        </Button>

        <Button
          variant={'ghost'}
          size={'icon-sm'}
          onClick={async () => {
            const res = await deleted({ data: { id } })
            router.invalidate()
            return res
          }}
        >
          <Trash />
        </Button>
      </TableCell>
    </TableRow>
  )
}
