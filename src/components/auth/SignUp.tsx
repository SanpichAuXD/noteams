"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/validator/auth";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import signUp from "@/api-caller/user";
import { SignupRequest } from "@/type/user";
import { TypedFormData, getTypedFormData } from "@/lib/CustomFormData";
import { useToast } from "@/components/ui/use-toast";
import { cn, isResponseError } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
type Props = {};

const SignUp = (props: Props) => {
	const { toast } = useToast();
	const [formStep, setFormStep] = useState(0);
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			cfpassword: "",
			phone: "",
			dob: new Date(),
		},
	});

	const ValidateBeforeNext = async () => {
		// Trigger validation for the relevant fields
		console.log(formStep, "formStep");
		if (formStep == 0) {
			await form.trigger(["username", "email"]);
			const usernameState = form.getFieldState("username");
			const emailState = form.getFieldState("email");
			if (
				usernameState.invalid ||
				emailState.invalid ||
				!usernameState.isDirty ||
				!emailState.isDirty
			) {
				return;
			}
			setFormStep(formStep + 1);
		} else if (formStep == 1) {
			await form.trigger(["dob", "phone"]);
			const dobState = form.getFieldState("dob");
			const phoneState = form.getFieldState("phone");
			if (
				dobState.invalid ||
				phoneState.invalid ||
				!dobState.isDirty ||
				!phoneState.isDirty
			) {
				return;
			}
			setFormStep(formStep + 1);
		}
	};
	async function onSubmit(values: z.infer<typeof registerSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		const formData: TypedFormData<SignupRequest> =
			getTypedFormData<SignupRequest>();
		const date = values.dob.toLocaleDateString('en-US', { year: "numeric", month: "2-digit", day: "2-digit" }).split('/')
		formData.append("username", values.username);
		formData.append("email", values.email);
		formData.append("password", values.password);
		formData.append("dob", `${date[2]}-${date[0]}-${date[1]}`);
		formData.append("phone", values.phone);
		const response = await signUp(formData);
		if (!isResponseError(response)) {
			toast({
				title: "Success!",
				description: "You have successfully signed up!",
				variant: "success",
			});
		} else {
			const { message, status, statusText } = response;
			toast({
				title: "Error Occured!",
				description: message,
				variant: "destructive",
			});
		}
	}
	return (
		<div className="flex flex-col h-full justify-center px-5  gap-4 w-1/2 ">
			<p className="text-xl font-bold text-center">Signup</p>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-2 px-[15%] relative space-x-8
						overflow-x-hidden
						"
				>
					<div
						className={cn(
							"space-y-3 transition-transform transform translate-x-0 ease-in-out duration-300 ",
							{
								"transform -translate-x-[140%]": formStep !== 0,
							}
						)}
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your username"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your email"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div
						className={cn(
							"space-y-3 mb-5 px-[15%] absolute  top-0 left-0 right-0 transition-transform transform translate-x-0 ease-in-out duration-300 w-auto",
							{
								"transform translate-x-full ": formStep !== 1,
							},
							{
								"transform -translate-x-[140%]": formStep >= 2,
							}
						)}
					>
						{/* birthday */}
						<FormField
							control={form.control}
							name="dob"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Year</FormLabel>
									<div className="flex  items-center gap-8">
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
															format(
																field.value,
																"PPP"
															)
														) : (
															<span>
																Pick a date
															</span>
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
														date > new Date() ||
														date <
															new Date(
																"1900-01-01"
															)
													}
													captionLayout="dropdown-buttons"
													fromYear={1950}
													toYear={2025}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* </div> */}
						{/* birthday */}
						{/* phone */}
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your phone number"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div
						className={cn(
							"space-y-3 mb-5 px-[15%] absolute  top-0 left-0 right-0 transition-transform transform translate-x-0 ease-in-out duration-300 w-auto",
							{
								"transform translate-x-full ": formStep !== 2,
							},
							{
								"transform -translate-x-full": formStep >= 3,
							}
						)}
					>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<PasswordInput
											placeholder="Enter your password"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="cfpassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<PasswordInput
											placeholder="Enter your password"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div
						className={cn("flex justify-between relative pt-14 ", {
							"justify-end": formStep == 0,
						})}
					>
						{/* flex gap-2 relative pt-28 */}
						<Button
							type="button"
							variant={"ghost"}
							onClick={() => {
								setFormStep(formStep - 1);
							}}
							className={cn({
								hidden: formStep == 0,
							})}
						>
							Go Back
						</Button>
						<Button
							type="submit"
							className={cn({
								hidden: formStep !== 2,
							})}
						>
							Register
						</Button>

						<Button
							type="button"
							variant={"outline"}
							className={cn("text-end", {
								hidden: formStep == 2,
							})}
							onClick={() => ValidateBeforeNext()}
						>
							Next
							<ArrowRight className="ml-2 w-4 h-4" />
						</Button>
					</div>
					<p className="text-center pt-5">
						Already Have Account ?{" "}
						<Link href={"/signin"} className="font-bold">
							{" "}
							Login
						</Link>
					</p>
				</form>
			</Form>
		</div>
	);
};

export default SignUp;
