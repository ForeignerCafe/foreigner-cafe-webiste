"use client"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
} from "@tanstack/react-table"
import { useState } from "react"
// Import the modified Table component from shadcn/ui
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

type DataTableProps<TData> = {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  searchableColumn?: keyof TData
  enablePagination?: boolean
  searchableColumnTitle?: string
}

export function DataTable<TData>({
  columns,
  data,
  searchableColumn,
  searchableColumnTitle,
  enablePagination = true,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(enablePagination && {
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination: {
          pageSize: 10,
        },
      },
    }),
  })

  const searchColumn = searchableColumn ? table.getAllColumns().find((col) => col.id === searchableColumn) : null

  return (
    <div className="w-full">
      {/* Search Input */}
      {searchColumn && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 sm:p-4 bg-white dark:bg-black border">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 h-3 w-3 sm:h-4 sm:w-4" />
            <Input
              placeholder={`Search ${searchableColumnTitle}`}
              value={(searchColumn?.getFilterValue() as string) ?? ""}
              onChange={(event) => searchColumn?.setFilterValue(event.target.value)}
              className="pl-8 sm:pl-10 w-full bg-white dark:bg-[#28282B] border border-gray-300 dark:border-gray-600 text-xs sm:text-sm"
            />
          </div>
        </div>
      )}
      {/* Table Container */}
      {/* The overflow-x-auto is now handled by the shadcn/ui Table component's internal div */}
      <div className="w-full rounded-md border bg-white dark:bg-black">
        <Table
          // No special width classes needed here anymore, as the shadcn/ui Table component
          // is now correctly configured to handle its own width and overflow.
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <TableHeader className="bg-gray-100 dark:bg-[#28282B]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-y divide-gray-200 dark:divide-700">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50 dark:hover:bg-[#28282B]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-3 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-800 dark:text-gray-200 min-w-[120px]"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="px-3 py-6 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      {enablePagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 sm:p-4 bg-white dark:bg-black border-t">
          <div className="text-xs sm:text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-7 w-7 p-0 sm:h-8 sm:w-8"
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <div className="flex items-center justify-center text-xs sm:text-sm w-7 sm:w-8">
                {table.getState().pagination.pageIndex + 1}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-7 w-7 p-0 sm:h-8 sm:w-8"
              >
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
