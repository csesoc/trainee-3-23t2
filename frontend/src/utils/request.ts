export const request = async (
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: Record<string, any>,
) => {
  const baseUrl = process.env.API_URL ?? "http://localhost:3030";
  const url = `${baseUrl}${path}`;

  const payload =
    method === "GET"
      ? {
          method,
        }
      : {
          method,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(options),
        };
  const res = (await fetch(url, { ...payload, cache: "no-store" }));
  if (!res.ok) {
    return { errorCode: res.status, errorMessage: res.statusText }
  }
  return await res.json();
};