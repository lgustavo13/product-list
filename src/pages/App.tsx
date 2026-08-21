import { Button } from "@/components/ui/button";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/hooks/useProducts";

function App() {
  const {
    products,
    isLoading,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    removeProduct,
  } = useProducts();

  return (
    <main className="p-10">
      <h1 className="text-center text-xl mb-10">Página de Produtos</h1>

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
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                Carregando...
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
                  <Button onClick={() => removeProduct(product.id)}>
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationPrevious
            onClick={prevPage}
            disabled={currentPage === 1}
          />

          <PaginationInfo currentPage={currentPage} totalPages={totalPages} />

          <PaginationNext
            onClick={nextPage}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </main>
  );
}

export default App;
