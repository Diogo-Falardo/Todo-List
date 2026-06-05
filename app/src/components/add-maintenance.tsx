import { createMaintenanceSchema } from "@/db/schemas/maintenance/maintenance.schema"
import type { CreateMaintenance } from "@/db/schemas/maintenance/maintenance.types"
import { useForm } from "@tanstack/react-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { PlusIcon } from "lucide-react"
import { useServerFn } from "@tanstack/react-start"
import { sfCreateMaintenance } from "@/server/maintenance/maintenance.functions"
import { toast } from "sonner"

const defaultMaintenance: CreateMaintenance = {
  name: "",
  moneyWantToSpend: "",
  actualCost: "",
  daysToComplete: "",
}

export const AddMaintenance = () => {
  const createMaintenance = useServerFn(sfCreateMaintenance)

  const addMaintenanceForm = useForm({
    defaultValues: defaultMaintenance,
    validators: {
      onChange: createMaintenanceSchema,
      onSubmit: createMaintenanceSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createMaintenance({
          data: { dto: value },
        })
        toast.success("New maintenance added")
      } catch (error: any) {
        console.error(error)
        toast.error(error.message)
      }
    },
  })

  return (
    <form
      id="add-maintenance-form"
      onSubmit={(e) => {
        e.preventDefault()
        addMaintenanceForm.handleSubmit()
      }}
    >
      <FieldGroup>
        <addMaintenanceForm.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="ex.: Change lamp"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <addMaintenanceForm.Field
          name="moneyWantToSpend"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Money Want To Spend
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? undefined}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="ex.: 100"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <addMaintenanceForm.Field
          name="actualCost"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Actual Cost</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? undefined}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="ex.: 125"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <addMaintenanceForm.Field
          name="daysToComplete"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Days To Complete</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? undefined}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="ex.: 1"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>
      <Button className="mt-2" form="add-maintenance-form" type="submit">
        <PlusIcon /> Add maintenance
      </Button>
    </form>
  )
}
