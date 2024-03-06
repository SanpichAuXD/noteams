import {z} from "zod"

export const TaskSchema = z.object({
	status: z
		.string({
			required_error: "Please select a language.",
		})
		.min(1),
	title: z
		.string({
			required_error: "Please enter a title.",
		})
		.min(3),
	description: z
		.string({
			required_error: "Please enter a description.",
		})
		.optional(),
	assignee: z.string({
		required_error: "Please enter a assignee.",
	}).optional(),
	dueDate: z.date({
		required_error: "Please enter a valid due date.",
	}).optional(),
});