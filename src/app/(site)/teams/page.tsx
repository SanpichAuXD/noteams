import { GetProfile, GetTeam } from "@/api-caller/user";
import AddTeamsBox from "@/components/teams/AddTeamsBox";
import { JoinForm } from "@/components/teams/JoinForm";
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
import { SignupRequest, Token, User } from "@/type/user";
import destr from "destr";
import { Copy, Plus } from "lucide-react";
import { cookies } from "next/headers";
import React from "react";

interface Teams {
	token: string;
}

const Teams = async() => {
	const cookie = cookies().get("accessToken")?.value!;
	const users = cookies().get("user")?.value!;
	const {user_id} = destr<SignupRequest>(users);
	// const queryClient  = new QueryClient();
	// await queryClient.prefetchQuery({
	// 	queryKey: ["hydrate-team"],
	// 	queryFn: async()=> getTeams(cookie),
	//   });a 
	
	const userxd = await GetProfile(cookie, user_id);
	console.log(userxd)
	const teamxd = await GetTeam(cookie, user_id);
	console.log("Team",teamxd)
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
							<JoinForm />
						</div>
					</DialogContent>
				</Dialog>
			</header>
			<section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5   gap-8 ">
			<AddTeamsBox token={cookie}/>
				{/* {mockData.map((team)=>{
					return <TeamsBox key={team.id} id={team.id} image={team.image} title={team.title} />
				})} */}
			</section>
		</div>
	);
};
export default Teams;
