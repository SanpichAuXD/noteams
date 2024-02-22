import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const TeamsLayout = ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { teamId: string };
}) => {
	return (
		<div className="flex flex-col  bg-green-700 ">
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
				<Button>Invite</Button>
			</div>
			<nav className="px-5 p-2 bg-blue-200 bg-opacity-55">
				<ul className="flex justify-start items-center">
					<Link href={`file`} className="teams-nav-link">File</Link>
					<Link href="kanban" className="teams-nav-link">Board</Link>
					<Link href="#" className="teams-nav-link">Setting</Link>
					<Link href="#" className="teams-nav-link">About</Link>
					<Link href="#" className="teams-nav-link">Member</Link>
				</ul>
			</nav>
			<div className="grow">{children}</div>
		</div>
	);
};

export default TeamsLayout;
