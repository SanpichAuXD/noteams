import Sidenav from "@/components/sidenav/SliderBar";
// Import global styles
import "../globals.css";
import { destr, safeDestr } from "destr";
// Import necessary components and hooks
import MobileHeader from "@/components/sidenav/MobileHeader";
import Header from "@/components/sidenav/Header";
import { cookies } from "next/headers";
import { User } from "@/type/user";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { FoldVertical, Menu } from "lucide-react";

// Define the RootLayout component
export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = cookies().get("user")?.value;

	return (
		<div className="flex h-screen ">
			<div>
				<Header user={destr<User>(user)} />
			</div>

			<div className="relative flex flex-col flex-1 lg:overflow-y-auto lg:overflow-x-hidden">
				{/* Render the main content */}
				<main>
					{/* if i have time but no for sure */}
					{/* <Sheet>
						<SheetTrigger className="lg:hidden bg-red-900">
							Open
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>
									Are you absolutely sure?
								</SheetTitle>
								<SheetDescription>
									This action cannot be undone. This will
									permanently delete your account and remove
									your data from our servers.
								</SheetDescription>
							</SheetHeader>
						</SheetContent>
					</Sheet> */}

					{children}
				</main>
			</div>
		</div>
	);
}
