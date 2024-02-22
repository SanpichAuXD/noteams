"use client"

import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FileTable = {
  id: string
  name : string  
  email: string
  url : string
  createdAt : string
}

export const columns: ColumnDef<FileTable>[] = [
    {
        accessorKey: "name",
        header: "File name"
    },
    {
        accessorKey: "email",
        header: "Modified By"
    },
    {
        accessorKey: "createdAt",
        header: "Modified"
    },
    

    
]
 