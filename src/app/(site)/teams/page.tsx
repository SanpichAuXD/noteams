import { getTeams } from "@/api-caller/team";
import { GetProfile } from "@/api-caller/user";
import AddTeamsBox from "@/components/teams/AddTeamsBox";
import { JoinForm } from "@/components/teams/JoinForm";
import RenderTeamBox from "@/components/teams/RenderTeamBox";
import TeamsBox from "@/components/teams/TeamsBox";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTeam } from "@/store/TeamState";
import { SignupRequest, SignupResponse, Token, User } from "@/type/user";
import { HydrationBoundary, QueryClient, dehydrate, useQueryClient } from "@tanstack/react-query";
import destr from "destr";
import { Copy, Plus } from "lucide-react";
import { cookies } from "next/headers";
import React, { use } from "react";

const Teams = async() => {
	const cookie = cookies().get("accessToken")?.value!;
	
	const queryClient  = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["hydrate-team"],
		queryFn: async()=> getTeams(cookie),
	  });
	
	
	return (
		<div className="py-10 px-5 flex flex-col container  min-h-screen ">
			<header className="flex justify-between mb-6">
				<p className="text-4xl font-bold">Your Teams</p>
				<Dialog>
					<DialogTrigger className="text-xl rounded bg-black text-white p-3">
						Join Team
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Join a Team Code</DialogTitle>
							<DialogDescription>Got a Code to join a team ? Enter it below.</DialogDescription>
						</DialogHeader>
						<div className="flex items-center space-x-2">
							<JoinForm token={cookie}/>
						</div>
					</DialogContent>
				</Dialog>
			</header>
			<section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5   gap-8 ">
				<AddTeamsBox token={cookie}/>
				<HydrationBoundary state={dehydrate(queryClient)}>

				<RenderTeamBox token={cookies().get("accessToken")?.value!}/>
				</HydrationBoundary>
			</section>
		</div>
	);
};
export default Teams;
