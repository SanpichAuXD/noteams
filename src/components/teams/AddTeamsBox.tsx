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

type Props = {};

const AddTeamsBox = (props: Props) => {
	const [formStep, setFormStep] = React.useState<number>(0);
	// 1. Define your form.
	const form = useForm<z.infer<typeof teamsSchema>>({
		resolver: zodResolver(teamsSchema),
		defaultValues: {
			name: "",
			description: "",
			code : ""
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof teamsSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
			<Dialog>
				<DialogTrigger className="bg-white  shadow-xl rounded  h-[200px] flex flex-col justify-center items-center p-5">
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
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-4 p-5"
								>
									<FormField
										control={form.control}
										name="name"
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
										name="description"
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
										name="code"
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
											<Button type="button">
												Cancle
											</Button>
										</DialogClose>
										<Button
											type="submit"
											onClick={() => {
												setFormStep(formStep + 1);
											}}
										>
											Submit
										</Button>
									</div>
								</form>
							</Form>
					) : (
						<div className="w-full p-5 space-y-5">
							{/* <div className="flex items-center justify-center  h-[200px]">
								<Loader2 size={40} className="animate-spin" />
							</div> */}

							<SearchUserInput />
							<div className="text-end">

							<DialogClose >

							<Button >Skip</Button>
							</DialogClose>
							</div>
						</div>
					)}
											</section>

				</DialogContent>
				{/* </div> */}
			</Dialog>
	);
};

export default AddTeamsBox;
