"use client"
import React from 'react'
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
import { isResponseError } from '@/lib/utils';
type Props = {}

const SignUp = (props: Props) => {
	const { toast } = useToast()
    const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			cfpassword: "",
		},
	});
	async function onSubmit(values: z.infer<typeof registerSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		const formData : TypedFormData<SignupRequest> = getTypedFormData<SignupRequest>();
		formData.append("username", values.username);
		formData.append("email", values.email);
		formData.append("password", values.password);
		const response = await signUp(formData);
		if(isResponseError(response)){
			const { message, status, statusText } = response;
			toast({
				title: "Error Occured!",
				description: message,
				variant: "destructive"
			})
		}
		else {
			toast({
				title: "Success!",
				description: "You have successfully signed up!",
				variant: "success"
			})	
		}
		
	}
  return (
    <div className="flex flex-col h-full justify-center px-5  gap-4 w-1/2 ">
				<p className="text-2xl font-bold text-center">Signup</p>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-3 px-[15%]"
					>
						{/* <div className="flex justify-between gap-4"> */}
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
						{/* </div> */}
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
						<Button
							type="submit"
							className="w-full"
							
						>
							Signup
						</Button>
						<p className="text-center ">
							Already Have Account ?{" "}
							<Link href={"/signin"} className="font-bold">
								{" "}
								Login
							</Link>
						</p>
					</form>
				</Form>
			</div>
  )
}

export default SignUp