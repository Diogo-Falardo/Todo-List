import { createServerFn, useServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { LoadingSwap } from './ui/loading-swap'
import { db } from '@/db'
import { todos } from '@/db/schema'

const addTodo = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      name: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    await db.insert(todos).values({ ...data, isComplete: false })

    throw redirect({ to: '/' })
  })

const updateTodo = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      id: z.string(),
      name: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    await db.update(todos).set(data).where(eq(todos.id, data.id))

    throw redirect({ to: '/' })
  })

const TodoForm = ({ todo }: { todo?: { id: string; name: string } }) => {
  const [iName, setIName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const addTodoFn = useServerFn(addTodo)
  const updateTodoFn = useServerFn(updateTodo)

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    const name = iName
    if (!name || name.trim() === '') return

    if (todo == null) {
      await addTodoFn({ data: { name } })
    } else {
      await updateTodoFn({ data: { name, id: todo.id } })
    }
    setIsLoading(false)
  }
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        autoFocus
        onChange={(e) => setIName(e.target.value)}
        placeholder="Enter your todo..."
        className="flex-1"
        aria-label="Name"
        defaultValue={todo?.name}
      />
      <Button type="submit" disabled={isLoading}>
        <LoadingSwap isLoading={isLoading} className="flex gap-2 items-center">
          {todo == null ? (
            <>
              <PlusIcon /> Add
            </>
          ) : (
            'Update'
          )}
        </LoadingSwap>
      </Button>
    </form>
  )
}

export default TodoForm
