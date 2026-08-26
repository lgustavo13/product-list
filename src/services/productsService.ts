import type { Product } from "@/types";
import { apiClient, apiClientWithHeaders } from "./api";

export type CreateProduct = Omit<Product, "id">;
export type UpdateProduct = Partial<Product>;

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
}

export const productsService = {
  getAll: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponse<Product>> => {
    const { data, headers } = await apiClientWithHeaders<Product[]>(
      `/produtos?_page=${page}&_limit=${limit}`,
    );
    const totalCount = Number(headers.get("X-Total-Count") ?? 0);
    return { data, totalCount };
  },

  getById: (id: number) => apiClient<Product>(`/produtos/${id}`),
  getByName: async (name: string): Promise<PaginatedResponse<Product>> => {
    const { data, headers } = await apiClientWithHeaders<Product[]>(
      `/produtos?nome_like=${name}`,
    );
    const totalCount = Number(headers.get("X-Total-Count") ?? data.length);
    return { data, totalCount };
  },
  create: (data: CreateProduct) =>
    apiClient<Product>("/produtos", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: UpdateProduct) =>
    apiClient<Product>(`/produtos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: (id: number, data: UpdateProduct) =>
    apiClient<Product>(`/produtos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    apiClient<void>(`/produtos/${id}`, {
      method: "DELETE",
    }),
};
