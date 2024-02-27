"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useFileStore } from "@/store/FileStore";
import Link from "next/link";
import { useTeamContext } from "@/context/TeamsContext";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FileTable = {
	id: string;
	name: string;
	email: string;
	url: string;
	createdAt: string;
};
const CellAction = ({ row } : {row:any}) => {
  const file = row.original
  const {name} = useTeamContext()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions {name}</DropdownMenuLabel>
        {/* <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(payment.id)}
        >
          Copy payment ID
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={file.url} target="_blank">
          Open
          </Link>
          </DropdownMenuItem>
        <DropdownMenuItem>Download</DropdownMenuItem>
        <DropdownMenuItem onClick={()=> {
          useFileStore.getState().deleteFile(file.id)
        }}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<FileTable>[] = [

	// {
  //   id: "id",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
  //     />
  //   ),
	// },
  {
		accessorKey: "name",
		header: `File Name`,
	},
	{
		accessorKey: "email",
		header: "Modified By",
	},
	{
		accessorKey: "createdAt",
		header: "Modified",
	},
  {
    id: "actions",
    cell: CellAction
  },
];

