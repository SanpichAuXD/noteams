"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { toast, useToast } from "@/components/ui/use-toast";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Task } from "./TaskCard";
import { Textarea } from "../ui/textarea";
import { TaskSchema } from "@/validator/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IFormattedErrorResponse } from "@/type/type";
import { ColumnId } from "./KanbanBoard";
import { createTask } from "@/api-caller/task";
import { MemberUser } from "@/type/user";
import { getmemberByTeamId } from "@/api-caller/team";
import { GetTeamType } from "@/type/team";

const status = [
	{ label: "Todo", value: "TODO" },
	{ label: "In Progress", value: "DOING" },
	{ label: "Done", value: "DONE" },
] as const;
// label email or username and value is id
const member = [
	{ label: "xdding@gmail.com", value: "U000012" },
	{ label: "test@gmail.com", value: "U000185" },
	{ label: "test2@gmail.com", value: "U000125" },
	{ label: "test@3gmail.com", value: "U000124" },
	{ label: "test@g4mail.com", value: "U000122" },
	{ label: "test@gm5ail.com", value: "U000135" },
	{ label: "test@gma6il.com", value: "U000145" },
] as const;

const FormSchema = z.object({
	status: z
		.string({
			required_error: "Please select a status.",
		})
		.min(1, "Please select a status."),
	title: z
		.string({
			required_error: "Please enter a title.",
		})
		.min(4, "Title should be atleast 3 characters long"),
	description: z.string({
		required_error: "Please enter a description.",
	}),
	assignee: z.string({
		required_error: "Please enter a assignee.",
	}),
	dueDate: z.date({
		required_error: "Please enter a due date.",
	}),
});
type KanbanformProps = {
	column: string;
	token: string;
	team_id: string;
};
export function Kanbanform({ column, token, team_id }: KanbanformProps) {
	const { data: members } = useQuery<MemberUser[]>({
		queryKey: [`member-${team_id}`],
		queryFn: async () => {
			return await getmemberByTeamId({ token, team_id });
		},
	});
	const { toast } = useToast();
	const form = useForm<z.infer<typeof TaskSchema>>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			status: column,
			title: "",
			description: "",
			assignee: "",
			dueDate: undefined,
		},
	});
	const queryClient = useQueryClient();
	const mutation = useMutation<any, IFormattedErrorResponse, FormData>({
		mutationFn: async (formData) => {
			const { data } = await createTask({ token, team_id, formData });
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [`task-${team_id}`] });
		},
		onError: (error) => {
			toast({ title: error.message });
		},
	});
	function onSubmit(data: z.infer<typeof TaskSchema>) {
		const date = data?.dueDate
			?.toLocaleDateString("en-US", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			})
			.split("/");
		const formData = new FormData();
		formData.append("task_name", data.title);
		formData.append("task_desc", data.description || "");
		formData.append("task_status", data.status);
		formData.append("user_id", data.assignee || "");
		formData.append(
			"task_deadline",
			data.dueDate != undefined && date
				? `${date[2]}-${date[0]}-${date[1]}`
				: ""
		);
		console.log(formData);
		mutation.mutate(formData);
		//   const task : Task  = {
		//     task_id: `task-${Math.random()}`,
		//     task_name: data.title,
		//     task_desc: data.description,
		//     task_status: data.status as 'TODO' | 'DOING' | 'DONE',
		//     user_id: data.assignee != undefined ? data.assignee : "",
		//     task_deadline: data.dueDate != undefined ? data.dueDate.toDateString() : "",
		//   }
		//  addTask(task)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 p-5"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="input"
									placeholder="Enter title"
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
						<FormItem className="flex flex-col">
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									className="input"
									placeholder="Enter title"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Status</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"w-[200px] justify-between",
												!field.value &&
													"text-muted-foreground"
											)}
										>
											{field.value
												? status.find(
														(language) =>
															language.value ===
															field.value
												  )?.label
												: "Select status..."}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command>
										<CommandInput placeholder="Search language..." />
										<CommandEmpty>
											No status found.
										</CommandEmpty>
										<CommandGroup>
											{status.map((state) => (
												<CommandItem
													value={state.label}
													key={state.value}
													onSelect={() => {
														form.setValue(
															"status",
															state.value
														);
													}}
												>
													<Check
														className={cn(
															"mr-2 h-4 w-4",
															state.value ===
																field.value
																? "opacity-100"
																: "opacity-0"
														)}
													/>
													{state.label}
												</CommandItem>
											))}
										</CommandGroup>
									</Command>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dueDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Due Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value &&
													"text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto p-0"
									align="start"
								>
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date <= new Date() ||
											date < new Date("1900-01-01")
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="assignee"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Assignee</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"w-[250px] justify-between",
												!field.value &&
													"text-muted-foreground"
											)}
										>
											{field.value
												? members!.find(
														(member) =>
															member.user_id ===
															field.value
												  )?.username
												: "Select members..."}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[250px] p-0">
									<Command>
										<CommandInput placeholder="Search assignee" />
										<CommandEmpty>
											No status found.
										</CommandEmpty>
										<CommandGroup>
											{members!.map((state) => (
												<CommandItem
													value={state.user_id}
													key={state.member_id}
													onSelect={() => {
														form.setValue(
															"assignee",
															state.user_id
														);
													}}
												>
													<Check
														className={cn(
															"mr-2 h-4 w-4",
															state.user_id ===
																field.value
																? "opacity-100"
																: "opacity-0"
														)}
													/>
													{state.username}
												</CommandItem>
											))}
										</CommandGroup>
									</Command>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit </Button>
			</form>
		</Form>
	);
}
