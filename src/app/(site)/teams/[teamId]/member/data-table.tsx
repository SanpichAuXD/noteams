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
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetTeamType } from "@/type/team";
import { deleteMember, getmemberByTeamId } from "@/api-caller/team";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { IFormattedErrorResponse } from "@/type/type";
import { MemberUser } from "@/type/user";
interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	token: string;
	team_id: string;
}

export function MemberTable<TData, TValue>({
	columns,
	data,
	token,
	team_id,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	// const [internalData, setInternalData] = React.useState<TData[]>(data);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const client = useQueryClient();
	const team = client.getQueryData<GetTeamType>([`team-${team_id}`]);

	const { data: member } = useQuery({
		queryKey: [`member-${team_id}`],
		queryFn: async () => {
			return await getmemberByTeamId({token, team_id});
		},
		initialData: data,
	});
	const {toast} = useToast();
	const queryClient = useQueryClient()
	const mutation = useMutation<string,AxiosError<IFormattedErrorResponse>,  string>({
        mutationFn : async (user_id) => {
            const {data} = await deleteMember({token, team_id,user_id});
            return data;
        },
        onSuccess : () => {
            console.log('success')
            queryClient.invalidateQueries({queryKey : [`member-${team_id}`]})
        },
		onError : (error) => {
			console.log(error)
			toast({title : error.message})
		}
        
    });
	const table = useReactTable({
		data: member,
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
	const search = table.getColumn("name") ? "name" : "username";
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
										<Button onClick={()=>{
											console.log((row.original as MemberUser).member_id)
											mutation.mutate((row.original as MemberUser).member_id)
										}}>
											<X />
											<p>Remove</p>
										</Button>
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
