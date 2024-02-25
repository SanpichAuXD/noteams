"use client"
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
type Props = {};

const SettingPage = (props: Props) => {
	const {name,description,image} = useTeamContext();
	return (
		<div className="w-[90%] p-20">
			<p className="text-2xl font-bold">
				Setting Page
				</p>
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
						<div className="flex items-center space-x-2">
							<Checkbox id="terms" />
							<label
								htmlFor="terms"
								className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Accept terms and conditions
							</label>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox id="terms" />
							<label
								htmlFor="terms"
								className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Accept terms and conditions
							</label>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox id="terms" />
							<label
								htmlFor="terms"
								className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Accept terms and conditions
							</label>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Code Team</AccordionTrigger>
					<AccordionContent className="px-[10%]"></AccordionContent>
					</AccordionItem>
			</Accordion>
		</div>
	);
};

export default SettingPage;
