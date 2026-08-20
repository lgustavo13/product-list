import type { Product } from "@/types";
import { apiClient } from "./api";

export type CreateProduct = Omit<Product, "id">;
export type UpdateProduct = Partial<Product>;

export const productsService = {
  getAll: () => apiClient<Product[]>("/produtos?_page=1&_limit=10"),
  getById: (id: number) => apiClient<Product>(`/produtos/${id}`),
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
