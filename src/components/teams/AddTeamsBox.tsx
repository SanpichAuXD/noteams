"use client";
import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchUserInput } from "./SearchUserInput";
import { teamsSchema } from "@/validator/teams";
import { TypedFormData, getTypedFormData } from "@/lib/CustomFormData";
import { CreateTeamRequest, CreateTeamResponse, GetTeamsType } from "@/type/team";
import { useCreateTeam } from "@/store/TeamState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeam } from "@/api-caller/team";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";
import { IFormattedErrorResponse } from "@/type/type";

type Props = {
	token : string;
};

const AddTeamsBox = ({token}: Props) => {
	const {toast} = useToast();
	const queryClient = useQueryClient()
	const [team_id, setTeamId] = React.useState<string>('');
	const mutation = useMutation<CreateTeamResponse,AxiosError<IFormattedErrorResponse>,TypedFormData<CreateTeamRequest>>({
        mutationFn : async (formData) => {
            const data = await createTeam({ token, formData });
			setTeamId(data.team_id);
            return data;
        },
        onSuccess : () => {
            console.log('success')
            queryClient.invalidateQueries({queryKey : ['hydrate-team']})
			setFormStep(1);
        },
		onError : (error) => {
			console.log(error.message)
			toast({title : error.message})
		}
        
    });
	const [formStep, setFormStep] = React.useState<number>(0);
	// 1. Define your form.
	const form = useForm<z.infer<typeof teamsSchema>>({
		resolver: zodResolver(teamsSchema),
		defaultValues: {
			team_name: "",
			team_desc: "",
			team_code : ""
		},
	});

	const searching = async (value: string) => {
		
		  try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/find?username=&email=${value}`, {
			headers: {
			  "Authorization": `Bearer ${token}`
			}
			});
			return await res.json();
		  } catch (error) {
			console.error("Error fetching user data:", error);
			throw error;
		  }
		  
	  }

	// 2. Define a submit handler.
	function OnSubmit(values: z.infer<typeof teamsSchema>) {
		const {team_code,team_name,team_desc} = values
		const formData : TypedFormData<CreateTeamRequest>= getTypedFormData<CreateTeamRequest>();
		formData.append("team_name", team_name);
		formData.append("team_desc", team_desc || '');
		formData.append("team_code", team_code);
		const data = mutation.mutate(formData);
		console.log(data)
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
			<Dialog >
				<DialogTrigger className="bg-white  shadow-xl rounded  h-[220px] flex flex-col justify-center items-center p-5">
					<Plus size={40} />
				</DialogTrigger>

				<DialogContent>
					{/* <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"> */}
						<section className="p-3">
							<DialogHeader>
								<DialogTitle>Create a Team</DialogTitle>
								<DialogDescription>
									Bring Everyone together and Get to work!
								</DialogDescription>
							</DialogHeader>
					{formStep === 0 ? (
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(OnSubmit)}
									className="space-y-4 p-5"
								>
									<FormField
										control={form.control}
										name="team_name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Team Name</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter your team name"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="team_desc"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Description
												</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter description"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="team_code"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Team Code
												</FormLabel>
												<FormControl>
													<Input placeholder="Enter your code team" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="space-x-4 text-end">
										<DialogClose asChild>
											<Button type="button" onClick={()=> {setFormStep(0)}}>
												Cancle
											</Button>
										</DialogClose>
										<Button
											type="submit"
											disabled={form.formState.isSubmitting}
										>
											Submit
										</Button>
									</div>
								</form>
							</Form>
					) : (
						<div className="w-full p-5 space-y-5">
							{mutation.isPending ? (<div className="flex items-center justify-center  h-[200px]">
								<Loader2 size={40} className="animate-spin" />
							</div>) :
							(
								<>
								<SearchUserInput token={token} searchfn={searching} team_id={team_id}/>
								<div className="text-end">

							<DialogClose asChild>

							<Button onClick={()=> {setFormStep(0)}}>Skip</Button>
							</DialogClose>
							</div>
								</>)}
								
						</div>
					)}
											</section>

				</DialogContent>
				{/* </div> */}
			</Dialog>
	);
};

export default AddTeamsBox;
