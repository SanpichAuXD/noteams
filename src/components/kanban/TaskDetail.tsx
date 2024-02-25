"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
  } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Input } from "../ui/input"
import { Calendar } from "../ui/calendar"
import { useTaskStore } from "@/store/TaskStore"
import { Task } from "./TaskCard"
import {Textarea} from "../ui/textarea"
const status = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
 
] as const
// label email or username and value is id
const member = [
  { label: "xdding@gmail.com", value: "U000012" },
  {label : "test@gmail.com", value : "U000185"},
  {label : "test2@gmail.com", value : "U000125"},
  {label : "test@3gmail.com", value : "U000124"},
  {label : "test@g4mail.com", value : "U000122"},
  {label : "test@gm5ail.com", value : "U000135"},
  {label : "test@gma6il.com", value : "U000145"},
] as const

const FormSchema = z.object({
  status: z.string({
    required_error: "Please select a language.",
  }).min(1),
  title : z.string({
    required_error: "Please enter a title.",
  }).min(3),
  description : z.string({
    required_error: "Please enter a description.",
  }).min(3),
  assignee : z.string({
    required_error: "Please enter a assignee.",
  }),
  dueDate : z.date({
    required_error: "Please enter a due date.",
  }),
})
type KanbanformProps = {
  task: Task;
}
export function TaskDetail(task : Task) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: task.columnId,
      title: task.title,
      description: task.description,
      assignee: task.assignee,
      dueDate: new Date(task.duedate),
    },
  })
  const {updateTask,deleteTask } = useTaskStore()
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
	const task_id = task.id
    const taskdata : Task  = {
      id: task_id,
      title: data.title,
      description: data.description,
      columnId: data.status as 'todo' | 'in-progress' | 'done',
      assignee: data.assignee,
      duedate: data.dueDate.toDateString(),
    }
   updateTask(taskdata)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-5">
        <FormField 
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Title{task.assignee}</FormLabel>
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
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? status.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select status..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No status found.</CommandEmpty>
                    <CommandGroup>
                      {status.map((state) => (
                        <CommandItem
                          value={state.label}
                          key={state.value}
                          onSelect={() => {
                            form.setValue("status", state.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              state.value === field.value
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
                        !field.value && "text-muted-foreground"
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
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date <= new Date() || date < new Date("1900-01-01")
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
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? member.find(
                            (member) => member.value === field.value
                          )?.label
                        : "Select status..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                  <Command>
                    <CommandInput placeholder="Search assignee" />
                    <CommandEmpty>No status found.</CommandEmpty>
                    <CommandGroup>
                      {member.map((state) => (
                        <CommandItem
                          value={state.label}
                          key={state.value}
                          onSelect={() => {
                            form.setValue("assignee", state.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              state.value === field.value
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
        <Button type="submit" className="me-4">Edit</Button>
		<Dialog>
      <DialogTrigger asChild>
		<Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <p>Are you sure you want to delete task {task.title}</p>
        <DialogFooter>
          <Button  variant="destructive" onClick={() => deleteTask(task.id as string)}>
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
  )
}
