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
import { toast, useToast } from "@/components/ui/use-toast";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Task } from "./TaskCard";
import { Textarea } from "../ui/textarea";
import { TaskSchema } from "@/validator/task"
import { useMutation , useQuery, useQueryClient} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IFormattedErrorResponse } from "@/type/type";
import { deleteTask, updateTask } from "@/api-caller/task"
import { GetTeamType, TeamRequest } from "@/type/team";
import { getmemberByTeamId } from "@/api-caller/team";
import { MemberUser } from "@/type/user";
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
	const { data: members } = useQuery<MemberUser[]>({
		queryKey: [`member-${team_id}`],
		queryFn: async () => {
			return await getmemberByTeamId({token, team_id});
		},
	});
	const {toast} = useToast()
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
	const team = queryClient.getQueryData<GetTeamType>([`team-${team_id}`]);
	const isAllow = team?.allow_task || team?.user_role === "OWNER";
	const mutation = useMutation<any,IFormattedErrorResponse,FormData>({
		mutationFn : async (formData) => {
		  const {data} = await updateTask({token,team_id,task_id : task.task_id as string,formData});
		  return data;
	  },
	  onSuccess : () => {
		console.log('success')
		queryClient.invalidateQueries({queryKey : [`task-${team_id}`]})
	},
	onError : (error) => {
		toast({title : error.message})
	}
	  })

	function onSubmit(data: z.infer<typeof TaskSchema>) {
		const formData = new FormData();
		const date = data?.dueDate?.toLocaleDateString('en-US', { year: "numeric", month: "2-digit", day: "2-digit" }).split('/')
		// if (form.getFieldState("title").isDirty || form.getFieldState("status").isDirty || form.getFieldState("description").isDirty || form.getFieldState("assignee").isDirty || form.getFieldState("dueDate").isDirty ){
			const task_id = task.task_id;
			formData.append("task_id", task_id as string);
			formData.append("task_name", data.title);
			formData.append("task_desc", data.description || "");
			formData.append("task_status", data.status);
			formData.append("user_id", data.assignee || "");
			formData.append("task_deadline", data.dueDate !== undefined && date ?  `${date[2]}-${date[0]}-${date[1]}` : "");
			mutation.mutate(formData)
			
		// }
    // else if(!form.formState.isDirty){
    //   toast({
    //     title: "No changes made",
    //     description: "Please make some changes to update the task",
    //   });
    // }
  }
  console.log(isAllow)
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 p-5"
			>
				{!isAllow && <p>FFF</p>}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="border-0 hover:bg-slate-200 ring-0 focus:ring-1 focus:ring-red-900 focus:bg-white disabled:text-black disabled:opacity-100"
									placeholder="Enter title"
									disabled={!isAllow}
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
									className="border-0 hover:bg-slate-200 ring-0 focus:ring-1 focus:ring-red-900 focus:bg-white  disabled:opacity-100"
									placeholder="Enter Description for task"
									disabled={!isAllow}
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
								<PopoverTrigger disabled={!isAllow} asChild>
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
								<PopoverTrigger disabled={!isAllow} asChild>
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
								<PopoverTrigger disabled={!isAllow	} asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"w-[250px] justify-between",
												!field.value &&
													"text-muted-foreground"
											)}
											disabled={!isAllow}
										>
											{field.value
												? members!.find(
														(member) =>
															member.user_id ===
															field.value
												  )?.username
												: "Select member..."}
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
				{isAllow  && <Button type="submit" className="me-4">
					Edit
				</Button>}
				{isAllow  &&<Dialog>
					<DialogTrigger asChild>
						<Button variant={"destructive"}>Delete</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<p>Are you sure you want to delete task {task.task_name}</p>
						<DialogFooter>
							<Button
								variant="destructive"
								onClick={()=>{
									deleteTask({token,team_id,task_id : task.task_id as string})
									queryClient.invalidateQueries({queryKey : [`task-${team_id}`]})
								
								}}
								// onClick={() => deleteTask(task.task_id as string)}
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
				</Dialog>}
			</form>
		</Form>
	);
}
