import { apiUrl } from "@/lib/utils/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { permissions } from "../globals";
import { FileTerminal } from "lucide-react";

type pteroSimplified = {
  id: string;
  name: string;
};

// return the list of pteros associated to that user
// or an empty array

export function usePterosList(userId: string) {
  return useQuery({
    queryKey: ["pteros"],
    queryFn: async (): Promise<Array<pteroSimplified>> => {
      const res = await fetch(`${apiUrl}/ptero/list/${userId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load ptero list!");
      return data.pteros_list as Array<pteroSimplified>;
    },
  });
}

// create a new ptero associated to an user
export function usePteroCreate(userId: string) {
  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const res = await fetch(`${apiUrl}/ptero/create/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create ptero!");
      // you have more fields that you can return from it but we just want to
      // return for now the id of the new ptero

      return data.ptero_created.id;
    },
  });
}

export function useJoinPtero(userId: string) {
  return useMutation({
    mutationFn: async ({ inviteLink }: { inviteLink: string }) => {
      const res = await fetch(`${apiUrl}/ptero/use-invite-link/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteLink }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to join a ptero!");
      // returns "joined"
    },
  });
}

export type staffMemberListInfo = {
  userId: string;
  roleId: string;
  role: string;
  email: string;
  hierarchy: number;
};

export function useGetPteroStaffList(pteroId: string) {
  return useQuery({
    queryKey: ["pteros", "staff", "members"],
    queryFn: async (): Promise<Array<staffMemberListInfo>> => {
      const res = await fetch(`${apiUrl}/ptero/list-of-staffs/${pteroId}`);
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to load ptero staff list!");

      return data.ptero_staff_list as Array<staffMemberListInfo>;
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
