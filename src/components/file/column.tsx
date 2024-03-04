"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useFileStore } from "@/store/FileStore";
import Link from "next/link";
import { useTeamContext } from "@/context/TeamsContext";
import { TeamFile } from "@/type/team";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FileTable = {
	id: string;
	name: string;
	email: string;
	url: string;
	createdAt: string;
};
const CellAction = ({ row } : any) => {
  const file : TeamFile = row.original
  console.log(file)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions </DropdownMenuLabel>
       
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={file.file_url} target="_blank">
          Open
          </Link>
          </DropdownMenuItem>
        <DropdownMenuItem>Download</DropdownMenuItem>
        <DropdownMenuItem onClick={()=> {
          useFileStore.getState().deleteFile(file.file_id)
        }}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<TeamFile>[] = [

  {
		accessorKey: "file_name",
		header: `File Name`,
	},
	{
		accessorKey: "username",
		header: "Modified By",
	},
	{
		accessorKey: "created_at",
		header: "Modified",
	},
//   {
//     id: "actions",
//     cell : CellAction
// //     cell: ({ row }) => {
// //       const file = row.original
// //       return (
// //         <DropdownMenu>
// //         <DropdownMenuTrigger asChild>
// //           <Button variant="ghost" className="h-8 w-8 p-0">
// //             <span className="sr-only">Open menu</span>
// //             <MoreHorizontal className="h-4 w-4" />
// //           </Button>
// //         </DropdownMenuTrigger>
// //         <DropdownMenuContent align="end">
// //           <DropdownMenuLabel>Actions </DropdownMenuLabel>
         
// //           <DropdownMenuSeparator />
// //             <Link href={file.file_url} className="hover:text-red-800" rel="noopener noreferrer" target="_blank">
// //           <DropdownMenuItem>
// //             Open
// //             </DropdownMenuItem>
// //             </Link>
// //           <DropdownMenuItem>Download</DropdownMenuItem>
// //           <DropdownMenuItem onClick={()=> {
// //               console.log('delete file here')
// // }}>Delete</DropdownMenuItem>
// //         </DropdownMenuContent>
// //       </DropdownMenu>
// //       )
// //     }
//   },
];

