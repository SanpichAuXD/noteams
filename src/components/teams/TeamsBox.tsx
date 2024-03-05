"use client"
import { cookies } from "next/headers";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IFormattedErrorResponse } from "@/type/type";
import { LeaveTeam, deleteTeam } from "@/api-caller/team";
import { useToast } from "../ui/use-toast";
import { GetTeamsType } from "@/type/team";

type TeamsBoxProps = {
	id: string;
	image: string;
	title: string;
};

const TeamsBox = ({ id, image, title,token }: TeamsBoxProps & {token:string}) => {
	const queryClient = useQueryClient();
	const teams = queryClient.getQueryData<GetTeamsType[]>(['hydrate-team']);	
	const {toast} = useToast();
	const delTeammutation = useMutation<string,IFormattedErrorResponse>({
		mutationFn : async () => {
			const {data} = await deleteTeam( token, id );
            return data;
        },
        onSuccess : () => {
            console.log('success')
            queryClient.invalidateQueries({queryKey : ['hydrate-team']})
        },
		onError : (error) => {
			toast({title : error.message})
		}
    });
	
	const leaveTeammutation = useMutation<string,IFormattedErrorResponse>({
		mutationFn : async () => {
			const {data} = await LeaveTeam( token, id );
            return data;
        },
        onSuccess : (data) => {
			console.log('success',data)
            queryClient.invalidateQueries({queryKey : ['hydrate-team']})
        },
		onError : (error) => {
			toast({title : error.message})
		}
    });
	if (!teams) return null;
	const team = teams[teams.findIndex((team) => team.team_id === id)];
	return (
		<div className="bg-white shadow-xl  rounded  h-[200px]  flex flex-col justify-center items-center p-5">
			<Link
			href={`teams/${id}`}
			>
			<Image
				src={image}
				alt="reg-vector"
				width={0}
				height={0}
				sizes="100vw"
				className="w-[70%] max-h-[130px] h-[100%] p-4 rounded-lg"
				/>
						</Link>
					
			<div className="flex items-center justify-between  font-bold w-full">
				<p className="text-center text-lg self-center">{title}</p>
				<DropdownMenu>
					<DropdownMenuTrigger className="focus:outline-none">
						<MoreVertical />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{team.role === "OWNER" && <DropdownMenuItem onClick={()=>{
							delTeammutation.mutate()
						}}>Delete Teams</DropdownMenuItem>}
						{team.role==="MEMBER" && <DropdownMenuItem 
						onClick={()=>{
							leaveTeammutation.mutate()
						}}
						>Leave Team</DropdownMenuItem>}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
					</div>)
}

export default TeamsBox;