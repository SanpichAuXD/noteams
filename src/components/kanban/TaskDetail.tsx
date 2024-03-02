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
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { useTaskStore } from "@/store/TaskStore";
import { Task } from "./TaskCard";
import { Textarea } from "../ui/textarea";
import { TaskSchema } from "@/validator/task"
import { useMutation , useQueryClient} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IFormattedErrorResponse } from "@/type/type";
import { updateTask } from "@/api-caller/task"
import { TeamRequest } from "@/type/team";
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


type KanbanformProps = {
	task: Task;
	
};
export function TaskDetail({task,team_id, token}: KanbanformProps & TeamRequest) {
	const form = useForm<z.infer<typeof TaskSchema>>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			status: task.task_status,
			title: task.task_name,
			description: task.task_desc || "",
			assignee: task.user_id || "",
			dueDate: task.task_deadline ? new Date(task.task_deadline) : undefined,
		},
	});
	const queryClient = useQueryClient()
	const mutation = useMutation<any,AxiosError<IFormattedErrorResponse>,FormData>({
		mutationFn : async (formData) => {
		  const {data} = await updateTask({token,team_id,task_id : task.task_id as string,formData});
		  return data;
	  },
	  onSuccess : () => {
		console.log('success')
		queryClient.invalidateQueries({queryKey : ['tasks']})
	},
	onError : (error) => {
	console.log(error.response?.data.message)
	}
	  })

	const {  deleteTask } = useTaskStore();
	function onSubmit(data: z.infer<typeof TaskSchema>) {
		console.log(data);
		const formData = new FormData();
		console.log(form.getFieldState("status").isDirty)
		const date = data?.dueDate?.toLocaleDateString('en-US', { year: "numeric", month: "2-digit", day: "2-digit" }).split('/')
		// if (form.getFieldState("title").isDirty || form.getFieldState("status").isDirty || form.getFieldState("description").isDirty || form.getFieldState("assignee").isDirty || form.getFieldState("dueDate").isDirty ){
			const task_id = task.task_id;
			const taskdata: Task = {
				task_id: task_id,
				task_name: data.title,
				task_desc: data.description,
				task_status: data.status as "TODO" | "DOING" | "DONE",
				user_id: data.assignee || "",
				task_deadline: data.dueDate !== undefined && date ?  `${date[2]}-${date[0]}-${date[1]}` : "",
			};
			formData.append("task_id", task_id as string);
			formData.append("task_name", data.title);
			formData.append("task_desc", data.description || "");
			formData.append("task_status", data.status);
			formData.append("user_id", data.assignee || "");
			formData.append("task_deadline", data.dueDate?.toDateString() || "");
			mutation.mutate(formData)
			// updateTask(taskdata);
			toast({
				title: "You submitted the following values:",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">
							{JSON.stringify(data, null, 2)}
						</code>
					</pre>
				),
			});
		// }
    // else if(!form.formState.isDirty){
    //   toast({
    //     title: "No changes made",
    //     description: "Please make some changes to update the task",
    //   });
    // }
  }
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 p-5"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Title{task.user_id}</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="border-0 hover:bg-slate-200 ring-0 focus:ring-1 focus:ring-red-900 focus:bg-white"
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
									className="border-0 hover:bg-slate-200 ring-0 focus:ring-1 focus:ring-red-900 focus:bg-white"
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
											{field.value != undefined ? (
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
												? member.find(
														(member) =>
															member.value ===
															field.value
												  )?.label
												: "Select status..."}
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
											{member.map((state) => (
												<CommandItem
													value={state.label}
													key={state.value}
													onSelect={() => {
														form.setValue(
															"assignee",
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
				<Button type="submit" className="me-4">
					Edit
				</Button>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant={"destructive"}>Delete</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<p>Are you sure you want to delete task {task.task_name}</p>
						<DialogFooter>
							<Button
								variant="destructive"
								onClick={() => deleteTask(task.task_id as string)}
							>
								Delete
							</Button>
							<DialogClose asChild>
								<Button type="button" variant="secondary">
									Close
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</form>
		</Form>
	);
}
