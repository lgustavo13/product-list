import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="paginação"
      className={cn("flex items-center justify-center gap-4", className)}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      size="default"
      className={cn("gap-1 cursor-pointer", className)}
      {...props}
    >
      <ChevronLeft className="size-4" />
      Anterior
    </Button>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      size="default"
      className={cn("gap-1 cursor-pointer", className)}
      {...props}
    >
      Próxima
      <ChevronRight className="size-4" />
    </Button>
  );
}

function PaginationInfo({
  currentPage,
  totalPages,
  className,
  ...props
}: React.ComponentProps<"span"> & {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <span className={cn("text-sm text-muted-foreground", className)} {...props}>
      Página {currentPage} de {totalPages}
    </span>
  );
}

export { Pagination, PaginationPrevious, PaginationNext, PaginationInfo };
