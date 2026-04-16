import { apiUrl } from "@/lib/utils/api";
import { useMutation } from "@tanstack/react-query";

type authenticationPayload = {
  email: string;
  password: string;
};

// login returns userId
export function useLogin() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: authenticationPayload): Promise<string> => {
      const res = await fetch(`${apiUrl}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to login!");
      return data.userId as string;
    },
  });
}

// we dont want any promisse here
// we could store the return userId and Upgrade The User Experience but for now we forcing an login
export function useRegister() {
  return useMutation({
    mutationFn: async ({ email, password }: authenticationPayload) => {
      const res = await fetch(`${apiUrl}/user/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to register!");
    },
  });
}
