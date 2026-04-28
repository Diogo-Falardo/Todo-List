import { apiUrl } from "@/lib/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function usePteroRoleCreate(userId: string, pteroId: string) {
  return useMutation({
    mutationFn: async ({ role }: { role: string }) => {
      const res = await fetch(
        `${apiUrl}/ptero/create-role/${userId}/${pteroId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create role!");
      return data.new_role;
    },
  });
}

// {
//   "id": "f805ee2f-63c1-4327-bef6-ef36221a4f70",
//   "pteroId": "2d14c17e-ed0e-4c2c-bd64-e4a7ba30a849",
//   "role": "Viewer",
//   "hierarchy": 0
// },

export type StaffRolesList = {
  id: string;
  pteroId: string;
  role: string;
  hierarchy: number;
};

export function useGetPteroStaffRoles(userId: string, pteroId: string) {
  return useQuery({
    queryKey: ["pteros", "staff", "roles"],
    queryFn: async (): Promise<Array<StaffRolesList>> => {
      const res = await fetch(`${apiUrl}/ptero/roles/${userId}/${pteroId}`);
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to load ptero staff roles list!");

      return data as Array<StaffRolesList>;
    },
  });
}

export type StaffRolesPermissionsList = {
  id: string;
  permission: string;
  active: boolean;
};

export function useGetPteroRolesPermissions(
  userId: string,
  pteroId: string,
  roleId: string,
) {
  return useQuery({
    queryKey: ["pteros", "staff", "roles", "permissions", roleId],
    enabled: !!roleId,
    staleTime: 60_000,
    queryFn: async (): Promise<Array<StaffRolesPermissionsList>> => {
      const res = await fetch(
        `${apiUrl}/ptero/roles-permissions/${userId}/${pteroId}/${roleId}`,
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(
          data.error || "Failed to load permissions of each role!",
        );

      return data as Array<StaffRolesPermissionsList>;
    },
  });
}

export function useSetPteroRolesPermissions(userId: string, pteroId: string) {
  return useMutation({
    mutationFn: async ({
      roleId,
      listOfPermissions,
    }: {
      roleId: string;
      listOfPermissions: Array<string>;
    }) => {
      const payload = listOfPermissions.map((permissionId) => ({
        permissionId,
      }));
      const res = await fetch(
        `${apiUrl}/ptero/update-roles-permissions/${userId}/${pteroId}/${roleId}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to update permissions roles");
    },
  });
}

// set new staff member

export function useSetNewPteroStaffMemberRole(userId: string, pteroId: string) {
  return useMutation({
    mutationFn: async ({
      staffId,
      roleId,
    }: {
      staffId: string;
      roleId: string;
    }) => {
      const payload = {
        userId: staffId,
        roleId,
      };
      const res = await fetch(
        `${apiUrl}/ptero/set-new-staff-member/${userId}/${pteroId}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to add role to staff member!");
    },
  });
}
