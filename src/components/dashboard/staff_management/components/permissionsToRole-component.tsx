import {
  useGetPteroRolesPermissions,
  useGetPteroStaffRoles,
} from "@/api/pteros/pteros";
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
import { useState } from "react";

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

  const setPermissionsToRoleForm = useForm({
    defaultValues: {
      roleId: "",
      listOfPermissions: [""],
    },
  });

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
                setRoleId(isValid ? value : "");
                if (isValid) {
                  queryClient.invalidateQueries({
                    queryKey: [
                      "pteros",
                      "staff",
                      "roles",
                      "permissions",
                      roleId,
                    ],
                  });
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
              <PopoverContent>
                <ScrollArea>
                  {pteroRolesIsError ? (
                    <div className="flex flex-col justify-center items-center">
                      <p>Unable to load permissions! Please try again later.</p>
                    </div>
                  ) : pteroRolesIsLoading ? (
                    <div className="flex flex-col justify-center items-center">
                      <p>Unable to load permissions! Please try again later.</p>
                    </div>
                  ) : (
                    pteroRolesPermissions &&
                    pteroRolesPermissions.length > 0 &&
                    pteroRolesPermissions.map((p) => {
                      return (
                        <div>
                          <Checkbox disabled={p.active} />
                          <p>{p.permission}</p>
                        </div>
                      );
                    })
                  )}
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full flex justify-center items-center">
            <Button type="submit" form="set-permissions-to-role-form">
              save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
