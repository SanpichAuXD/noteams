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

type Props = {};

const TeamsLayout = ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { teamId: string };
}) => {
	return (
		<div className="flex flex-col  ">
			<div className="flex justify-between items-center px-6 h-[7%]">
				<div className="flex flex-row items-center p-3  h-[5%]">
					<Image
						src={"https://placehold.co/600x500/png"}
						alt="reg-vector"
						width={0}
						height={0}
						sizes="100vw"
						className="w-[15%] h-[15%] p-2"
					/>
					<p>Team Name {params.teamId}</p>
				</div>
				<Dialog>
					<DialogTrigger className="bg-black text-white px-5 py-2 text-lg rounded font-semibold">Invite</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className="pb-5">Invite people in your team</DialogTitle>
							<SearchUserInput />
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
			<nav className="px-5 p-2  bg-opacity-55">
				<ul className="flex justify-start items-center">
					<Link
						href={`/teams/${params.teamId}/file`}
						className="teams-nav-link"
					>
						File
					</Link>
					<Link href={`/teams/${params.teamId}/kanban`} className="teams-nav-link">
						Board
					</Link>
					<Link href={`/teams/${params.teamId}/setting`} className="teams-nav-link">
						Setting
					</Link>
					<Link href={`/teams/${params.teamId}/`} className="teams-nav-link">
						About
					</Link>
					<Link href="member" className="teams-nav-link">
						Member
					</Link>
				</ul>
			</nav>
			<div className="grow">
				<TeamsProvider>
				{children}
				</TeamsProvider>
				</div>
		</div>
	);
};

export default TeamsLayout;
