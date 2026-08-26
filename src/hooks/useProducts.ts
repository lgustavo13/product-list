import { useState, useEffect, useCallback } from "react";
import { productsService } from "@/services/productsService";
import { useDebounce } from "@/hooks/useDebounce";
import type { Product } from "@/types";

const ITEMS_PER_PAGE = 10;

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [prevSearch, setPrevSearch] = useState(debouncedSearch);

  const fetchProducts = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const { data, totalCount } = await productsService.getAll(
        page,
        ITEMS_PER_PAGE,
      );
      setProducts(data);
      setTotalPages(Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE)));
    } catch {
      setError("Erro ao buscar produtos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function getProducts() {
      try {
        setIsLoading(true);
        setError(null);

        let data: Product[];
        let totalCount: number;

        if (debouncedSearch.trim()) {
          const result = await productsService.getByName(
            debouncedSearch.trim(),
          );
          data = result.data;
          totalCount = result.totalCount;
        } else {
          const result = await productsService.getAll(
            currentPage,
            ITEMS_PER_PAGE,
          );
          data = result.data;
          totalCount = result.totalCount;
        }

        if (!ignore) {
          setProducts(data);
          setTotalPages(Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE)));
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

    getProducts();

    return () => {
      ignore = true;
    };
  }, [currentPage, debouncedSearch]);

  if (debouncedSearch !== prevSearch) {
    setPrevSearch(debouncedSearch);
    setCurrentPage(1);
  }

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const removeProduct = async (id: number) => {
    try {
      await productsService.remove(id);
      await fetchProducts(currentPage);
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
    currentPage,
    totalPages,
    search,
    setSearch,
    nextPage,
    prevPage,
    removeProduct,
    updateProduct,
  };
}
