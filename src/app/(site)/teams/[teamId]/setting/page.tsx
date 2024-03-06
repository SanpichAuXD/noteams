import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import UploadButton from "@/components/file/UploadButton";
import { Button } from "@/components/ui/button";
import SettingForm from "@/components/setting/SettingForm";
import { Checkbox } from "@/components/ui/checkbox";
import SettingImage from "@/components/setting/SettingImage";
import { useTeamContext } from "@/context/TeamsContext";
import { Edit } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cookies } from "next/headers";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getTeamSetting } from "@/api-caller/team";
import Settings from "@/components/setting/Settings";
import SettingPermission from "@/components/setting/SettingPermission";
import { CodeInputForm } from "@/components/setting/EditCode";
import WithAuth from "@/components/ui/WithAuth";
type Props = {};

const SettingPage = async({ params }: { params: { teamId: string } }) => {
	const token = cookies().get("accessToken")?.value!;
	const data = await getTeamSetting(token, params.teamId);
	
	return (
		<div className="w-[90%] p-20">
			<p className="text-2xl font-bold">Setting Page</p>
			<Accordion type="multiple" defaultValue={["item-1"]}>
				<AccordionItem value="item-1">
					<AccordionTrigger>Team Detail</AccordionTrigger>
					<AccordionContent>
						<Settings token={token} team_id={params.teamId} team={data} />
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-2">
					<AccordionTrigger>Member Permission</AccordionTrigger>
					<AccordionContent className="px-[10%] space-y-6 pt-5">
						<SettingPermission 
						allow={
							{
								allow_file : data.allow_file, 
								allow_invite : data.allow_invite, 
								allow_task : data.allow_task}
							}
						token={token}
						team_id={params.teamId}
							/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Code Team</AccordionTrigger>
					<AccordionContent className="px-[10%] flex items-center gap-4">
						<p className="text-lg">Code Team : {data.team_code}</p>
						<Dialog>
							<DialogTrigger asChild>
									<Edit size={25} className="cursor-pointer" />
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogTitle>Edit Code Team</DialogTitle>
								<CodeInputForm code={data.team_code} token={token} team_id={params.teamId} />
							</DialogContent>
						</Dialog>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default WithAuth(SettingPage);
