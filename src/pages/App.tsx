import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationInfo,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/hooks/useProducts";
import { Input } from "@base-ui/react";
import { MoreHorizontalIcon } from "lucide-react";

function App() {
  const {
    products,
    isLoading,
    currentPage,
    totalPages,
    search,
    setSearch,
    nextPage,
    prevPage,
    updateProduct,
    removeProduct,
  } = useProducts();

  return (
    <main className="p-10">
      <h1 className="text-center text-xl mb-10">Página de Produtos</h1>

      <Input
        type="search"
        placeholder="Buscar produto pelo nome..."
        className="mb-10 border border-slate-400 rounded-xl p-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                Carregando...
              </TableCell>
            </TableRow>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                Produto não encontrado
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.nome}</TableCell>
                <TableCell>{product.categoria}</TableCell>
                <TableCell>{product.preco}</TableCell>
                <TableCell>{product.estoque}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 cursor-pointer"
                        >
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => updateProduct(product.id, product)}
                        className="cursor-pointer"
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => removeProduct(product.id)}
                        className="cursor-pointer"
                      >
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter className="flex">
          <TableRow>
            {totalPages > 1 && (
              <Pagination className="mt-6">
                <PaginationPrevious
                  onClick={prevPage}
                  disabled={currentPage === 1}
                />

                <PaginationInfo
                  currentPage={currentPage}
                  totalPages={totalPages}
                />

                <PaginationNext
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}

export default App;
