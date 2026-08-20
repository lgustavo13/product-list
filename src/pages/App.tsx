import { Button } from "@/components/ui/button";
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
  const { products, removeProduct } = useProducts();

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
          {products.map((product) => (
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
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

export default App;
