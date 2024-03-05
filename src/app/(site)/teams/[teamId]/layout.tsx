import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SearchUserInput } from "@/components/teams/SearchUserInput";
import TeamsProvider from "@/context/TeamsContext";
import TeamNav from "@/components/teams/TeamNav";
import { cookies } from "next/headers";

type Props = {};

const TeamsLayout = ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { teamId: string };
}) => {
	const cookie = cookies().get("accessToken")?.value!;
	return (
		<div className="flex flex-col  ">
			<TeamNav team_id={params.teamId} token={cookie} />
			<div className="grow">
				{/* <TeamsProvider> */}
				{children}
				{/* </TeamsProvider> */}
			</div>
		</div>
	);
};

export default TeamsLayout;
