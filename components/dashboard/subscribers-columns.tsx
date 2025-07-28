//@ts-nocheck
import type { ColumnDef } from "@tanstack/react-table";

export function getSubscribersColumns(onDeleteClick): ColumnDef<any>[] {
  return [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="text-sm">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "subscribedAt",
      header: "Subscription Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("subscribedAt"));
        return <div className="text-sm">{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const email = row.original.email;
        const id = row.original._id;

        return (
          <button
            onClick={() => onDeleteClick(id, email)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            Delete
          </button>
        );
      },
    },
  ];
}
