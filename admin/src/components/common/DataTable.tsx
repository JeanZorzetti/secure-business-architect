import type { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';
import type { LucideIcon } from 'lucide-react';

interface DataTableColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyState?: {
    icon: LucideIcon;
    title: string;
    description?: string;
  };
  pagination?: {
    page: number;
    totalPages: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  isLoading,
  emptyState,
  pagination,
}: DataTableProps<T>) {
  const renderCell = (row: T, column: DataTableColumn<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor] as ReactNode;
  };

  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <LoadingSpinner className="py-8" text="Carregando..." />
                </TableCell>
              </TableRow>
            ) : data.length === 0 && emptyState ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <EmptyState
                    icon={emptyState.icon}
                    title={emptyState.title}
                    description={emptyState.description}
                  />
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  {columns.map((column, index) => (
                    <TableCell key={index} className={column.className}>
                      {renderCell(row, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-muted-foreground">
            Página {pagination.page} de {pagination.totalPages} ({pagination.total}{' '}
            itens no total)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
