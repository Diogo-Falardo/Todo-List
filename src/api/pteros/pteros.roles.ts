import { apiUrl } from "@/lib/utils/api";
import { useMutation } from "@tanstack/react-query";

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
