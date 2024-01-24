"use client";
import React from "react";
import RegVector from "/public/regis-vector.png";
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
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Router } from "next/router";
type Props = {};
import { useRouter } from 'next/navigation'
import { PasswordInput } from "@/components/ui/password-input";
 
export default function Login(props: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	function onSubmit(values: z.infer<typeof loginSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
    router.push('/teams')
	}
	return (
		<div className="flex h-screen">
			<div className="flex bg-slate-100 justify-center items-center w-1/2 h-full ">
				<Image
					src={RegVector}
					alt="reg-vector"
					width={500}
					height={500}
				/>
			</div>
			<div className="flex flex-col h-full justify-center px-5  gap-4 w-1/2 ">
				<p className="text-2xl font-bold text-center">Login</p>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-5"
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
							<Link href={"/register"} className="font-bold">
								{" "}
								Register
							</Link>
						</p>
					</form>
				</Form>
			</div>
		</div>
	);
}
