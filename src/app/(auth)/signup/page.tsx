import React from "react";
import Image from "next/image";
import RegVector from "/public/regis-vector.png";
import SignUp from "@/components/auth/SignUp";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
type Props = {};

const Register = (props: Props) => {
	if(cookies().get("accessToken")){
		redirect('/teams')
	}
	return (
		<div className="flex justify-center items-center h-screen   ">
			<div className="flex bg-slate-100 justify-center items-center w-4/5 h-full ">
				<Image
					src={RegVector}
					alt="reg-vector"
					width={500}
					height={500}
				/>
			</div>
			<SignUp />
		</div>
	);
};

export default Register;
