// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import { Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const contactRequestColumns = (
  handleViewDetail,
  handleDeleteClick,
  handleMarkAsAcknowledged
) => [
  {
    accessorKey: "name",
    header: "Customer Name",
    cell: ({ row }) => <div className="text-sm font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: "Request Type",
    cell: ({ row }) => {
      const value = row.getValue("type");
      const colorMap = {
        feedback: "text-[#FFDE21]",
        reservation: "text-[#AE51EB]",
        event: "text-[#ED2C2C]",
        general: "text-[#557AEA]",
        other: "text-[#0EA51B]",
      };
      return (
        <span className={`px-2 py-1 text-sm rounded-full capitalize ${colorMap[value?.toLowerCase()]}`}>
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("status");
      const color = value === "pending"
        ? "bg-[#FFDE2145] text-[#DABD17]"
        : "bg-[#99FF9C6E] text-[#08870B] dark:text-[#88E788]";
      return (
        <div className={`px-2 py-1 text-sm rounded-full w-20 text-center ${color}`}>
          {value === "read" ? "Closed" : value}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Sent Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div className="text-sm">{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewDetail(row.original)}>
              View Detail
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMarkAsAcknowledged(row.original)}>
              Mark as Done
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteClick(row.original._id)}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-0.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
