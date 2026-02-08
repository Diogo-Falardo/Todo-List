import { Link, createFileRoute } from '@tanstack/react-router'
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

export const Route = createFileRoute('/todos/new')({
  component: RouteComponent,
})

function RouteComponent() {
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
          <CardTitle>Add new Todo</CardTitle>
          <CardDescription>
            Create new task to add to your todo list
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TodoForm />
        </CardContent>
      </Card>
    </div>
  )
}
