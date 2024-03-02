"use client";
import React from "react";
import { redirect, useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validator/auth";
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
import { signIn } from "@/api-caller/user";
import { TypedFormData, getTypedFormData } from "@/lib/CustomFormData";
import { SignInRequest, SignInResponse, Token } from "@/type/user";
import { useToast } from "../ui/use-toast";
import { isResponseError } from "@/lib/utils";
type SignInProps = {
	setCookie: (data: SignInResponse) => Promise<void>;
}
const SignIn = ({setCookie} : SignInProps) => {
	const { toast } = useToast()
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const router = useRouter();
	async function onSubmit(values: z.infer<typeof loginSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		const formData: TypedFormData<SignInRequest> =
			getTypedFormData<SignInRequest>();
		formData.append("email", values.email);
		formData.append("password", values.password);
		const response = await signIn(formData);
		console.log(response,'response', isResponseError(response));
		// const res = await fetch('api/signin',{
		// 	method: 'POST',
		// 	body: JSON.stringify(values)
		
		// })
		// const resJson = await res.json();
		// console.log(resJson);
		if(!isResponseError(response)){
			toast({
				title: "Success!",
				description: "You have successfully signed in!",
				variant: "success"
			})
			setCookie(response);
			console.log("sign in successfull!");
			router.push("/teams");
		}
		else {
			const { message} = response;
			toast({
				title: "Error Occured!",
				description: message,
				variant: "destructive"
			})
		}
	}
	return (
		<div className="flex flex-col h-full justify-center px-5  gap-4 w-1/2 ">
			<p className="text-2xl font-bold text-center">Login</p>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-5 px-[15%]"
				>
					{/* <div className="flex justify-between gap-4"> */}

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
					<Button type="submit" className="w-full">
						Login
					</Button>
					
					<p className="text-center ">
						Don{"'t"} Have Account ?{" "}
						<Link href={"/signup"} className="font-bold">
							{" "}
							Sign up
						</Link>
					</p>
				</form>
			</Form>
			
		</div>
	);
};

export default SignIn;
