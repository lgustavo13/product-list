const BASE_URL = "http://localhost:3001";

async function request(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }

  return response;
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await request(endpoint, options);
  return response.json();
}

export async function apiClientWithHeaders<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<{ data: T; headers: Headers }> {
  const response = await request(endpoint, options);
  const data: T = await response.json();
  return { data, headers: response.headers };
}
