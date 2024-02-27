import React from "react";
import RegVector from "/public/regis-vector.png";
import Image from "next/image";
type Props = {};
import SignIn from "@/components/auth/SignIn";
import { cookies } from "next/headers";
import { SignInResponse } from "@/type/user";

export default function Login(props: Props) {
	async function setCookie(data: SignInResponse) {
		"use server";
		cookies().set({
			name: "accessToken",
			value: data.token.access_token,
			// keep the cookie for a days
			maxAge: 60 * 60 * 24,
			// cookie will be accessible by client's JavaScript
			httpOnly: true,
			// cookie will be sent only over HTTPS
			secure: true,
		});
		cookies().set({
			name: "refreshToken",
			value: data.token.refresh_token,
			// keep the cookie for a week
			maxAge: 60 * 60 * 24 * 7,
			// cookie will be accessible by client's JavaScript
			httpOnly: true,
			// cookie will be sent only over HTTPS
			secure: true,
		});
		// to convert this string shit
		// JSON.parse(decodeURI('cookies').replaceAll("%3A",":").replaceAll("%2C", ","))
		cookies().set({
			name: "user",
			value: JSON.stringify(data.user),
			// keep the cookie for a week
			maxAge: 60 * 60 * 24 * 1,
		});
		cookies().set({
			name: "tokenId",
			value: JSON.stringify(data.token.oauth_id),
			// keep the cookie for a week
			maxAge: 60 * 60 * 24 * 1,
		})
		
	}
	return (
		<div className="flex h-screen">
			<div className="flex  bg-slate-100 justify-center items-center w-4/5 h-full ">
				<Image
					src={RegVector}
					alt="reg-vector"
					width={500}
					height={500}
				/>
			</div>
			<SignIn setCookie={setCookie} />
		</div>
	);
}
