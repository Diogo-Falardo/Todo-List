import { useGetPteroStaffList } from "@/api/pteros/pteros";
import {
  useGetPteroStaffRoles,
  useSetNewPteroStaffMemberRole,
} from "@/api/pteros/pteros.roles";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { toast } from "sonner";

export const NewStaffMemberComponent = ({
  userId,
  pteroId,
}: {
  userId: string;
  pteroId: string;
}) => {
  const queryClient = useQueryClient();

  const [submitActive, setSubmitActive] = useState(true);
  const {
    data: pteroStaffMembers,
    isLoading: pteroStaffMemberIsLoading,
    isError: pteroStaffMemberIsError,
  } = useGetPteroStaffList(pteroId);

  const {
    data: pteroRoles,
    isError: pteroRolesIsError,
    isLoading: pteroRolesIsLoading,
  } = useGetPteroStaffRoles(userId, pteroId);

  const setNewStaffMemberRoleForm = useSetNewPteroStaffMemberRole(
    userId,
    pteroId,
  );

  const newStaffMemberRoleForm = useForm({
    defaultValues: {
      staffId: "",
      roleId: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      setNewStaffMemberRoleForm.mutate(value, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["pteros", "staff", "members"],
          });
          toast.success("Member role got updated");
        },
        onError: (error) => {
          console.error(error);
          toast.error(error.message);
        },
      });
    },
  });

  if (!pteroStaffMembers || !pteroRoles) {
    return (
      <Card>
        <CardHeader>Data failed to load!</CardHeader>
        <CardDescription>Please try again later.</CardDescription>
      </Card>
    );
  }

  if (pteroStaffMemberIsLoading || pteroRolesIsLoading) {
    <Card>
      <CardHeader>Loading data</CardHeader>
    </Card>;
  }

  if (pteroStaffMemberIsError || pteroRolesIsError) {
    <Card>
      <CardHeader>Error could not render</CardHeader>
    </Card>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Member Role</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <form
          id="new-staff-member-role-form"
          onSubmit={(e) => {
            e.preventDefault();
            newStaffMemberRoleForm.handleSubmit();
          }}
        >
          <div className="flex flex-row justify-between">
            <Select
              onValueChange={(value) => {
                newStaffMemberRoleForm.setFieldValue("staffId", value);
              }}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Users list" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectGroup>
                  <SelectLabel>Users</SelectLabel>
                  {pteroStaffMembers.map((s) => (
                    <SelectItem key={s.userId} value={s.userId}>
                      {s.email}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => {
                newStaffMemberRoleForm.setFieldValue("roleId", value);
                setSubmitActive(false);
              }}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Roles list" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  {pteroRoles.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.role}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>

        <div className="w-full flex justify-center items-center">
          <Button
            disabled={submitActive}
            type="submit"
            form="new-staff-member-role-form"
          >
            save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
