import { apiUrl } from "@/lib/utils/api";
import { useQuery, useMutation } from "@tanstack/react-query";

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
      console.log("usePteroCreate | " + data + " |");

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
      console.log("useJoinPtero | " + data + " |");
      if (!res.ok) throw new Error(data.error || "Failed to join a ptero!");
      // returns "joined"
    },
  });
}
