import { apiUrl } from "@/lib/utils/api";
import { useQuery, useMutation } from "@tanstack/react-query";

export type permissions = {
  id: string;
  permission: string;
};

// get the list of available permissions from ptero
export function useGetListOfPermissions() {
  return useQuery({
    queryKey: ["globals", "permissions"],
    queryFn: async (): Promise<Array<permissions>> => {
      const res = await fetch(`${apiUrl}/admin/admin/permissions`);
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to load list of permissions");
      return data as Array<permissions>;
    },
  });
}
