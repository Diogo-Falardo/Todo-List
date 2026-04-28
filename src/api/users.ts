import { apiUrl } from "@/lib/utils/api";
import { useQuery } from "@tanstack/react-query";

export function useUserInfo(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async (): Promise<string> => {
      const res = await fetch(`${apiUrl}/user/user-info/${userId}
`);
      const data = await res.json();
      if (!res.ok)
        throw new Error(
          data.error || "Failed to load user! Please try again later!",
        );
      return data.user_email;
    },
  });
}
