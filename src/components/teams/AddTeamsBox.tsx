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
import { teamsSchema } from "@/validator/teams";
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

type Props = {};

const AddTeamsBox = (props: Props) => {
	const [formStep, setFormStep] = React.useState<number>(0);
	// 1. Define your form.
	const form = useForm<z.infer<typeof teamsSchema>>({
		resolver: zodResolver(teamsSchema),
		defaultValues: {
			name: "",
			description: "",
			allow: "Privacy",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof teamsSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
		<div className="bg-white  shadow-xl rounded  h-[200px] flex flex-col justify-center items-center p-5">
			<Dialog>
				<DialogTrigger>
					<Plus size={40} />
				</DialogTrigger>

				<DialogContent>
					{/* <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"> */}
					{formStep === 0 ? (
						<section className="p-3">
							<DialogHeader>
								<DialogTitle>Create a Team</DialogTitle>
								<DialogDescription>
									Bring Everyone together and Get to work!
								</DialogDescription>
							</DialogHeader>
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
										name="allow"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Team Name{" "}
													{form.getValues("allow")}
												</FormLabel>
												<FormControl>
													<Select
														onValueChange={
															field.onChange
														}
														defaultValue={"Privacy"}
													>
														<SelectTrigger>
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="Privacy">
																Privacy - Only
																Team owners can
																add members
															</SelectItem>
															<SelectItem value="Public">
																Public - Anyone
																in organization
																can join
															</SelectItem>
														</SelectContent>
													</Select>
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
											type="button"
											onClick={() => {
												setFormStep(formStep + 1);
											}}
										>
											Submit
										</Button>
									</div>
								</form>
							</Form>
						</section>
					) : (
						<div>
							<div className="flex items-center justify-center  h-[200px]">
								<Loader2 size={40} className="animate-spin" />
							</div>
						</div>
					)}
				</DialogContent>
				{/* </div> */}
			</Dialog>
		</div>
	);
};

export default AddTeamsBox;
