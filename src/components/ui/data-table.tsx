import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  emptyMessage?: string;
  ariaLabel: string;
}

const DataTable = <T,>({
  columns,
  data,
  getRowId,
  emptyMessage = "No records found.",
  ariaLabel,
}: DataTableProps<T>) => {
  return (
    <Table aria-label={ariaLabel}>
      <TableHeader className="bg-crozier-surface-primary [&_tr]:border-crozier-border-primary-shade-3">
        <TableRow className="border-0 hover:bg-crozier-surface-disabled-lightest">
          {columns.map((column) => (
            <TableHead
              key={column.id}
              className={cn(
                "h-9 px-1 text-sm font-normal text-crozier-text-placeholder",
                column.headerClassName,
              )}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length ? (
          data.map((row, index) => (
            <TableRow
              key={getRowId(row)}
              className={cn(
                "h-13.5 border-crozier-border-primary-shade-3 hover:bg-crozier-surface-disabled-lighter",
                index % 2 === 1 ? "bg-crozier-surface-primary" : "bg-crozier-surface-white-black",
              )}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className={cn("px-2.5 text-sm text-crozier-text-body", column.className)}
                >
                  {column.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-28 text-center text-sm text-crozier-text-placeholder"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
