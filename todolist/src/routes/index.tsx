import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'

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
  return (
    <div className="min-h-screen container space-y-8">
      <div className="felx justify-between items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Todo List</h1>
        </div>
      </div>
    </div>
  )
}
