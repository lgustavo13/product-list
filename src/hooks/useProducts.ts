import { useState, useEffect } from "react";
import { productsService } from "@/services/productsService";
import type { Product } from "@/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchProducts() {
      try {
        setIsLoading(true);
        const data = await productsService.getAll();
        if (!ignore) {
          setProducts(data);
        }
      } catch {
        if (!ignore) {
          setError("Erro ao buscar produtos");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, []);

  const removeProduct = async (id: number) => {
    try {
      await productsService.remove(id);
      setProducts((current) => current.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const updateProduct = async (id: number, editedProduct: Product) => {
    try {
      const updatedProduct = await productsService.update(id, editedProduct);
      setProducts((current) =>
        current.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product,
        ),
      );
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  return {
    products,
    isLoading,
    error,
    removeProduct,
    updateProduct,
  };
}
