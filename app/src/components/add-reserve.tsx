import { createGuestSchema } from "@/db/schemas/guest/guest.schema"
import { useForm } from "@tanstack/react-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { useState } from "react"
import { format } from "date-fns"
import { ChevronDownIcon, PlusIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import type { CreateGuest } from "@/db/schemas/guest/guest.types"
import { Textarea } from "./ui/textarea"
import { sfCreateReserve } from "@/server/guests/guest.functions"
import { useServerFn } from "@tanstack/react-start"
import { toast } from "sonner"

const defaultReserve: CreateGuest = {
  name: "",
  dateStart: "",
  dateEnd: "",
  platform: "",
  notes: undefined,
  total: undefined,
}

export const AddReserve = () => {
  const [dateStart, setDateStart] = useState<Date>()
  const [dateEnd, setDateEnd] = useState<Date>()

  const createReserve = useServerFn(sfCreateReserve)

  const addReserveForm = useForm({
    defaultValues: defaultReserve,
    validators: {
      onChange: createGuestSchema,
      onSubmit: createGuestSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createReserve({
          data: { dto: value },
        })
        toast.success("New reserve added")
      } catch (error: any) {
        console.error(error)
        toast.error(error.message)
      }
    },
  })

  return (
    <form
      id="add-reserve-form"
      onSubmit={(e) => {
        e.preventDefault()
        addReserveForm.handleSubmit()
      }}
    >
      <FieldGroup>
        <addReserveForm.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Guest name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="ex.: Diogo"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <addReserveForm.Field
          name="dateStart"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Starting Date</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id={field.name}
                      name={field.name}
                      variant={"outline"}
                      data-empty={!dateStart}
                      className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      {dateStart ? (
                        format(dateStart, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateStart}
                      onSelect={(selectedDate) => {
                        setDateStart(selectedDate)
                        field.handleChange(
                          selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
                        )
                      }}
                      aria-invalid={isInvalid}
                      defaultMonth={dateStart}
                    />
                  </PopoverContent>
                </Popover>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <addReserveForm.Field
          name="dateEnd"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Ending date</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id={field.name}
                      name={field.name}
                      variant={"outline"}
                      data-empty={!dateEnd}
                      className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      {dateEnd ? (
                        format(dateEnd, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateEnd}
                      onSelect={(selectedDate) => {
                        setDateEnd(selectedDate)
                        field.handleChange(
                          selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
                        )
                      }}
                      aria-invalid={isInvalid}
                      defaultMonth={dateEnd}
                    />
                  </PopoverContent>
                </Popover>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <addReserveForm.Field
          name="platform"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Platform</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="ex.: airbnb.com"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <addReserveForm.Field
          name="total"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Total</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? undefined}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="ex.: 100€"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <addReserveForm.Field
          name="notes"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Notes</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? undefined}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="ex.: Something that actually matters"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>
      <Button className="mt-2" form="add-reserve-form" type="submit">
        <PlusIcon /> Add reserve
      </Button>
    </form>
  )
}
