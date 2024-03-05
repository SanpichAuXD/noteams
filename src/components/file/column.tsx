"use client";

import { ColumnDef} from "@tanstack/react-table";
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
];

