"use client";
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
type Props = {};

const SettingPage = (props: Props) => {
	const { name, description, image } = useTeamContext();
	return (
		<div className="w-[90%] p-20">
			<p className="text-2xl font-bold">Setting Page</p>
			<Accordion type="multiple" defaultValue={["item-1"]}>
				<AccordionItem value="item-1">
					<AccordionTrigger>Team Detail</AccordionTrigger>
					<AccordionContent>
						<div className="flex flex-row justify-center py-5">
							<SettingImage image={image} />
							<div className="flex w-1/2">
								<SettingForm />
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-2">
					<AccordionTrigger>Member Permission</AccordionTrigger>
					<AccordionContent className="px-[10%] space-y-6 pt-5">
						<div className="flex items-center justify-between space-x-2">
							<label
								htmlFor="terms"
								className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Allow Member to manage Task
							</label>
							<Checkbox id="terms" />
						</div>
						<div className="flex items-center justify-between space-x-2">
							<label
								htmlFor="terms"
								className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Allow member to manage file
							</label>
							<Checkbox id="terms" />
						</div>
						<div className="flex items-center justify-between space-x-2">
							<label
								htmlFor="terms"
								className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Allow member to invite
							</label>
							<Checkbox id="terms" />
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Code Team</AccordionTrigger>
					<AccordionContent className="px-[10%] flex items-center gap-4">
						<p className="text-lg">Code Team : XDXDXDXD</p>
						<Dialog>
							<DialogTrigger asChild>
									<Edit size={25} className="cursor-pointer" />
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogTitle>Edit Code Team</DialogTitle>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-4 items-center gap-4">
										<Label
											htmlFor="name"
											className="text-right"
										>
											Code Team
										</Label>
										<Input
											id="name"
											defaultValue="Pedro Duarte"
											className="col-span-3"
										/>
									</div>
								</div>
								<DialogFooter>
									<Button type="submit">Save changes</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default SettingPage;
