// @ts-nocheck
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, SquarePen, Archive, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/dashboard/table"; // Assuming your DataTable component is in this path

export type ContactRequest = {
  id: string;
  customerName: string;
  requestType: "Event" | "General" | "Reservation" | "Feedback" | "Other";
  status: "Sharing" | "Shared";
  sentDate: string;
};

export const columns: ColumnDef<ContactRequest>[] = [
  {
    accessorKey: "customerName",
    header: "Customer name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("customerName")}</div>
    ),
  },
  {
    accessorKey: "requestType",
    header: "Request type",
    cell: ({ row }) => {
      const type = row.getValue("requestType");
      const colorMap = {
        Event: "bg-red-100 text-red-800",
        General: "bg-blue-100 text-blue-800",
        Reservation: "bg-purple-100 text-purple-800",
        Feedback: "bg-yellow-100 text-yellow-800",
        Other: "bg-gray-100 text-gray-800",
      };
      return (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            colorMap[type] || "bg-gray-100 text-gray-800"
          }`}
        >
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const variant = status === "Sharing" ? "default" : "secondary";
      return (
        <Badge variant={variant} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "sentDate",
    header: "Sent Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const request = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => console.log("Mark as shared:", request.id)}
            >
              <SquarePen className="h-4 w-4 mr-2 text-blue-500" /> Mark as
              shared
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete request:", request.id)}
            >
              <Trash2 className="h-4 w-4 mr-2 text-red-500" /> Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Archive request:", request.id)}
            >
              <Archive className="h-4 w-4 mr-2 text-green-500" /> Archive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const data: ContactRequest[] = [
  {
    id: "1",
    customerName: "John Kin",
    requestType: "Event",
    status: "Sharing",
    sentDate: "08 Feb 2025",
  },
  {
    id: "2",
    customerName: "John Kin",
    requestType: "General",
    status: "Shared",
    sentDate: "08 Feb 2025",
  },
  {
    id: "3",
    customerName: "John Kin",
    requestType: "Presentation",
    status: "Sharing",
    sentDate: "08 Feb 2025",
  },
  {
    id: "4",
    customerName: "John Kin",
    requestType: "Feedback",
    status: "Shared",
    sentDate: "08 Feb 2025",
  },
  {
    id: "5",
    customerName: "John Kin",
    requestType: "General",
    status: "Shared",
    sentDate: "08 Feb 2025",
  },
  {
    id: "6",
    customerName: "John Kin",
    requestType: "Other",
    status: "Shared",
    sentDate: "08 Feb 2025",
  },
  {
    id: "7",
    customerName: "John Kin",
    requestType: "General",
    status: "Sharing",
    sentDate: "08 Feb 2025",
  },
  {
    id: "8",
    customerName: "John Kin",
    requestType: "General",
    status: "Sharing",
    sentDate: "08 Feb 2025",
  },
];

export function ContactRequestsTable() {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 mx-1">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
          All Requests
        </h2>
      </div>
      <DataTable
        columns={columns}
        data={data}
        searchableColumn="customerName"
        enablePagination={true}
      />
    </div>
  );
}
