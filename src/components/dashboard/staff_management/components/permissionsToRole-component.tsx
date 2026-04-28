import {
  useGetPteroRolesPermissions,
  useGetPteroStaffRoles,
  useSetPteroRolesPermissions,
} from "@/api/pteros/pteros.roles";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const PermissionsToRoleComponent = ({
  userId,
  pteroId,
}: {
  userId: string;
  pteroId: string;
}) => {
  const queryClient = useQueryClient();
  const {
    data: pteroRoles,
    isError: pteroRolesIsError,
    isLoading: pteroRolesIsLoading,
  } = useGetPteroStaffRoles(userId, pteroId);

  const [roleId, setRoleId] = useState<string>("");
  const { data: pteroRolesPermissions } = useGetPteroRolesPermissions(
    userId,
    pteroId,
    roleId,
  );

  const setNewPteroRolesMutation = useSetPteroRolesPermissions(userId, pteroId);

  const setPermissionsToRoleForm = useForm({
    defaultValues: {
      roleId: "",
      listOfPermissions: [] as string[],
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      setNewPteroRolesMutation.mutate(value, {
        onSuccess: () => {
          toast.success("Permissions updated!");
        },
        onError: (error) => {
          console.error(error);
          toast.error(error.message);
        },
      });
    },
  });

  useEffect(() => {
    if (pteroRolesPermissions) {
      const activeIds = pteroRolesPermissions
        .filter((p) => p.active)
        .map((p) => p.id);
      setPermissionsToRoleForm.setFieldValue("listOfPermissions", activeIds);
      setPermissionsToRoleForm.setFieldValue("roleId", roleId);
    }
  }, [pteroRolesPermissions]);

  if (!pteroRoles) {
    return (
      <Card>
        <CardHeader>Data failed to load!</CardHeader>
        <CardDescription>Please try again later.</CardDescription>
      </Card>
    );
  }

  if (pteroRolesIsLoading) {
    <Card>
      <CardHeader>Loading data</CardHeader>
    </Card>;
  }

  if (pteroRolesIsError) {
    <Card>
      <CardHeader>Error could not render</CardHeader>
    </Card>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Permission to Role</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col w-full gap-3">
        <form
          id="set-permissions-to-role-form"
          onSubmit={(e) => {
            e.preventDefault();
            setPermissionsToRoleForm.handleSubmit();
          }}
        >
          <div className="flex flex-row justify-between">
            <Select
              value={roleId}
              onValueChange={(value) => {
                const isValid = pteroRoles.some((r) => r.id === value);
                const nextRoleId = isValid ? value : "";
                setRoleId(nextRoleId);
                if (isValid) {
                  queryClient.invalidateQueries({
                    queryKey: [
                      "pteros",
                      "staff",
                      "roles",
                      "permissions",
                      nextRoleId,
                    ],
                  });
                  setPermissionsToRoleForm.setFieldValue("roleId", nextRoleId);
                }
              }}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="roles" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectGroup>
                  <SelectLabel>Permissions</SelectLabel>
                  {pteroRoles?.map((r) => (
                    <SelectItem value={r.id} key={r.id}>
                      {r.role}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                {roleId && roleId !== "" ? (
                  <Button variant={"outline"}>Permissions list</Button>
                ) : (
                  <Button variant={"outline"} disabled>
                    Permissions list
                  </Button>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-48" align="end">
                <ScrollArea className="h-48">
                  {pteroRolesIsError ? (
                    <div className="flex flex-col justify-center items-center">
                      <p>Unable to load permissions! Please try again later.</p>
                    </div>
                  ) : pteroRolesIsLoading ? (
                    <div className="flex flex-col justify-center items-center">
                      <p>Unable to load permissions! Please try again later.</p>
                    </div>
                  ) : (
                    <setPermissionsToRoleForm.Field
                      name="listOfPermissions"
                      children={(field) => (
                        <div className="flex flex-col gap-2">
                          {pteroRolesPermissions &&
                            pteroRolesPermissions.length > 0 &&
                            pteroRolesPermissions.map((p) => {
                              const isChecked = field.state.value.includes(
                                p.id,
                              );
                              return (
                                <div key={p.id} className="flex flex-col gap-2">
                                  <div className="flex gap-2 items-center">
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={(checked) => {
                                        const nextChecked = checked === true;

                                        if (nextChecked) {
                                          field.handleChange([
                                            ...field.state.value,
                                            p.id,
                                          ]);
                                          return;
                                        }

                                        field.handleChange(
                                          field.state.value.filter(
                                            (id) => id !== p.id,
                                          ),
                                        );
                                      }}
                                    />
                                    <p>{p.permission}</p>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    />
                  )}
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>
        </form>

        <div className="w-full flex justify-center items-center">
          <Button
            disabled={roleId === "" ? true : false}
            type="submit"
            form="set-permissions-to-role-form"
          >
            save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
