export function getApiUrl(): string {
  const url = import.meta.env.VITE_API_URL;
  if (!url) {
    throw new Error(
      "API URL is not set. Please define VITE_API_URL in your .env file.",
    );
  }
  return url;
}

export const apiUrl = getApiUrl();
