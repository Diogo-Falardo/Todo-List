import { usePteroRoleCreate } from "@/api/pteros/pteros.roles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const newRoleSchema = z.object({
  role: z
    .string()
    .min(1, { message: "Role name is required" })
    .max(255, { message: "Role name has a max of 255 characters" }),
});

export const NewRoleComponent = ({
  userId,
  pteroId,
}: {
  userId: string;
  pteroId: string;
}) => {
  const createNewPteroRoleMutation = usePteroRoleCreate(userId, pteroId);

  const newRoleForm = useForm({
    defaultValues: {
      role: "",
    },
    validators: {
      onSubmit: newRoleSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(`
        sent values: ${value}
        `);
      createNewPteroRoleMutation.mutate(value, {
        onSuccess: (role) => {
          toast.success(`New role created ${role}`);
        },
        onError: (error) => {
          console.error(error);
          toast.error(error.message);
        },
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new Role</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <form
          id="new-role-form"
          onSubmit={(e) => {
            e.preventDefault();
            newRoleForm.handleSubmit();
          }}
        >
          <newRoleForm.Field
            name="role"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="ex.:Staff Manager"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </form>
        <div className="w-full flex justify-center items-center">
          <Button type="submit" form="new-role-form">
            create
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
