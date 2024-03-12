"use client";

import {
	ColumnDef,
	SortingState,
	ColumnFiltersState,
	getFilteredRowModel,
	getSortedRowModel,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import React from "react";
import { Button } from "../ui/button";
import { MoreHorizontal, Upload } from "lucide-react";
import FileUploadButton from "./UploadButton";
import UploadButton from "./UploadButton";
import { columns } from "./../../app/(site)/teams/[teamId]/member/column";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetTeamType, TeamFile } from "@/type/team";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IFormattedErrorResponse } from "@/type/type";
import { deleteFile } from "@/api-caller/file";
import { useToast } from "../ui/use-toast";
import Link from "next/link"
interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	token: string;
	team_id: string;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	token,
	team_id,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const client = useQueryClient();
	const {toast} = useToast();
	const team = client.getQueryData<GetTeamType>([`team-${team_id}`]);
	const isAllow = team?.user_role === "OWNER" || team?.allow_file
	// console.log(tea)
	const mutation = useMutation<string,IFormattedErrorResponse, string>({
		mutationFn: async (id) => {
			const formData = new FormData();
			formData.append("file_id", id);
			return await deleteFile({token,team_id,formData});
		},
		onSuccess: () => {
			client.invalidateQueries({ queryKey: [`hydrate-file-${team_id}`] });
		},
		onError: (error) => {
			toast({title : error.message})
		},
	});
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	const search = table.getColumn("file_name") ? "file_name" : "username";
	const isOwner = team?.user_role === "OWNER";
	useEffect(() => {
		table.getAllColumns().map((column) => {
			if (column.id === "actions") {
				column.toggleVisibility(isOwner);
			}
		});
	}, [isOwner, table]);
	return (
		<div className="w-[100%] ">
			<div className="flex items-center py-4 gap-4 ">
				<Input
					placeholder="Filter emails..."
					value={
						(table.getColumn(search)?.getFilterValue() as string) ??
						""
					}
					onChange={(event) =>
						table
							.getColumn(search)
							?.setFilterValue(event.target.value)
					}
					className="w-[30%]"
				/>
				{isAllow && <UploadButton token={token} team_id={team_id} />}
			</div>
			<div className="rounded-md ">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className="text-center"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="text-center"
									data-state={
										row.getIsSelected() && "selected"
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													className="h-8 w-8 p-0"
												>
													<span className="sr-only">
														Open menu
													</span>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>
													Actions{" "}
												</DropdownMenuLabel>

												<DropdownMenuSeparator />
													<Link
														href={(row.original as TeamFile).file_url}
														target="_blank"
													>
												<DropdownMenuItem>
														Download
												</DropdownMenuItem>
													</Link>
												<DropdownMenuItem
													onClick={() => {
														mutation.mutate((row.original as TeamFile).file_id);
													}}
												>
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
