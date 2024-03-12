"use client";
import React from "react";
import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import Link from "next/link";
import { SearchUserInput } from "./SearchUserInput";
import { useTeam } from "@/store/TeamState";
import { useQueryClient } from "@tanstack/react-query";
import { GetTeamType } from "@/type/team";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
type Props = {
	team_id: string;
	token: string;
};

const TeamNav = ({ team_id, token }: Props) => {
	const client = useQueryClient();
	const pathname = usePathname().split('/')[3]
	const { data } = useTeam(token, team_id);
	const team = client.getQueryData<GetTeamType>([`team-${team_id}`]);
	const isAllow = team?.allow_task || team?.user_role === "OWNER";
	client.invalidateQueries({ queryKey: [`team-${team_id}`] });
	const searching = async (value: string) => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/users/find?username=&email=${value}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return await res.json();
		} catch (error) {
			console.error("Error fetching user data:", error);
			throw error;
		}
	};
	return (
		<div>
			<div className="flex justify-between items-center px-6">
				<div className="flex flex-row items-center p-3">
					<Image
						src={data?.team_poster || "/reg-vector.svg"}
						alt="reg-vector"
						width={0}
						height={0}
						sizes="100vw"
						className="w-[70px] h-[15%] p-2"
					/>
					<p className="text-xl font-bold">{data?.team_name}</p>
				</div>
				<Dialog>
					{isAllow && (
						<DialogTrigger className="bg-black text-white px-5 py-2 text-lg rounded font-semibold">
							Invite
						</DialogTrigger>
					)}
					<DialogContent className="w-[40%] max-w-[40%]">
						<DialogHeader>
							<DialogTitle className="pb-5">
								Invite people in your team
							</DialogTitle>
							<SearchUserInput
								token={token}
								searchfn={searching}
								team_id={team_id}
							/>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
			<nav className="px-5 p-2 bg-opacity-55">
				<ul className="flex justify-start items-center">
					<Link
						href={`/teams/${team_id}/file`}
						className={cn("teams-nav-link",
						pathname === "file" && "font-bold"
						)}
					>
						File
					</Link>
					<Link
						href={`/teams/${team_id}/kanban`}
						className={cn("teams-nav-link",
						pathname === "kanban" && "font-bold"
						)}
					>
						Board
					</Link>
					{team?.user_role === "OWNER" && (
						<Link
							href={`/teams/${team_id}/setting`}
							className={cn("teams-nav-link",
							pathname === "setting" && "font-bold"
							)}
						>
							Setting
						</Link>
					)}
					<Link
						href={`/teams/${team_id}/`}
						className={cn("teams-nav-link",
						pathname === "" && "font-bold"
						)}
					>
						About
					</Link>
					<Link
						href={`/teams/${team_id}/member`}
						className={cn("teams-nav-link",
						pathname === "member" && "font-bold"
						)}
					>
						Member
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default TeamNav;
