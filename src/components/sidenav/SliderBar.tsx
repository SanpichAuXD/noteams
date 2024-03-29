"use client";

// Import necessary libraries and components
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Users, KanbanSquare,LogOut} from "lucide-react";
import { cn, formatCookie } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { error } from "console";
import destr from "destr";
import { SignupRequest } from "@/type/user";
import { useToast } from "../ui/use-toast";

// Define the Sidenav component
type SidenavProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};
export default function Sidenav({ sidebarOpen, setSidebarOpen }: SidenavProps) {
	// Define state for sidebar expansion
	const [sidebarExpanded, setSidebarExpanded] = useState(false);
	// const [cookie, setCookie] = useState('')
	const router = useRouter();
	const {toast} = useToast();
	
	// const cookie = formatCookie(document.cookie)
    // const {username} = destr<SignupRequest>(cookie) ? destr<SignupRequest>(cookie) : {username : ''};
	// Create a reference to the sidebar element
	const sidebar = useRef(null);
	// Effect to add or remove a class to the body element based on sidebar expansion
	useEffect(() => {
		// setCookie(formatCookie(document.cookie))
		if (sidebarExpanded) {
			document.querySelector("body")?.classList.add("sidebar-expanded");
		} else {
			document
				.querySelector("body")
				?.classList.remove("sidebar-expanded");
		}
	}, [sidebarExpanded]);

	return (
		<>
			{/* Sidebar backdrop (visible on mobile only) */}
			<div
				onClick={() => setSidebarOpen(!sidebarOpen)}
				className={`fixed inset-0 border-r  xs:translate-x-0    bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
					sidebarOpen ? "opacity-100" : " pointer-events-none"
				}`}
				aria-hidden="true"
			></div>

			{/* Sidebar */}
			<div
				id="sidebar"
				ref={sidebar}
				className={`fixed flex flex-col md:none  z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0   h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar lg:w-64  w-72 bg-white lg:sidebar-expanded:w-20 shrink-0 border-r border-gray-200  p-4 transition-all duration-200 ${
					sidebarOpen ? "translate-x-0" : "-translate-x-72"
				}`}
			>
				{/* Sidebar header */}
				<div className="flex justify-between pr-3 sm:px-2">
					{/* Sidebar Logo */}
					<Link href="/">
						<span
							className={`${
								sidebarExpanded ? "lg:hidden" : "block"
							}  welcome-step text-2xl font-medium tracking-tighter text-black focus:outline-none focus:ring whitespace-nowrap cursor-pointer`}
						>
							<Image
								className="mt-2 mb-8 h-12 w-44"
								src="/Noteams.png"
								height={0}
								width={0}
								sizes={"100vw"}
								alt="logoa"
							/>
						</span>
					</Link>

					{/* Sidebar Icon (Collapsed) */}
					<Link href="/">
						<Image
							className={`${
								!sidebarExpanded ? "lg:hidden" : "block"
							} mt-1 mb-8 h-7 w-14`}
							src="/Noteams-tiny.png"
							height={100}
							width={100}
							sizes={"100vw"}
							alt="logo"
						/>
					</Link>
				</div>

				{/* Links */}
				<div className="space-y-4">
          <p
            className={`${
              sidebarExpanded ? "lg:hidden" : "block"
            } px-2 text-xs font-base text-gray-400 uppercase`}
          >
            Actions
          </p>
          <ul className="text-center space-y-2">           
            <NavItem
              href="/teams"
              icon={<Users size={40} />}
              label="Teams"
            //   setSidebarOpen={setSidebarOpen}
              sidebarExpanded={sidebarExpanded}
            />
            <NavItem
              href="/calendar"
              icon={<Calendar size={40} />}
              label="Calendar"
            // //   setSidebarOpen={setSidebarOpen}
              sidebarExpanded={sidebarExpanded}
            />
            <NavItem
              href="/profile"
              icon={<User size={40} />}
              label="Profile"
            // //   setSidebarOpen={setSidebarOpen}
              sidebarExpanded={sidebarExpanded}
            />
			<NavItem
              href="/signin"
              icon={<LogOut size={40} />}
              label="Signout"
            // //   setSidebarOpen={setSidebarOpen}
              sidebarExpanded={sidebarExpanded}
			  callApi={async()=> {
					const response = await fetch('/api/signout',{
						method : 'POST',
										
					})
					try{
						const data = await response.json();
						console.log(data, 'data')
						console.log("signout successfull!");
						router.refresh();
					}
					catch(error){
					toast({title: "Failed to signout", description: "Please Refresh the page and try again", variant : "destructive"})					
					
			  }
			}}
            />
          </ul>
        </div>


        {/* Links */}
        

				{/* Expand / collapse button */}
				<div className="pt-3 lg:inline-flex mt-auto ">
					<div className="flex-1" />
					<div className="px-3 py-2 w-full text-center  space-y-5">
						<div className={`flex ${sidebarExpanded ? "flex-col items-center space-y-4" : "flex-row justify-between"}`}>
							<div className="inline-block ">

							
							<p className="text-sm"><User className="inline-block" size={40} /> 
							{/* {!sidebarExpanded && `${username} `} */}
							</p>
							</div>
						<button
							onClick={() => setSidebarExpanded(!sidebarExpanded)}
							>
							<span className="sr-only">
								Expand / collapse sidebar
							</span>
							<svg
								className={`w-6 h-6 hidden lg:block fill-current ${
									!sidebarExpanded ? "rotate-0" : "rotate-180"
								}`}
								viewBox="0 0 24 24"
								>
								<path
									d="M10.5 19.5L3 12M3 12L10.5 4.5M3 12H21"
									stroke="#0F172A"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
									/>
							</svg>
						</button>
									</div>
					</div>
				</div>
			</div>
		</>
	);
}

type NavItemProps = {
	href: string;
	icon: React.ReactNode;
	label: string;
	sidebarExpanded: boolean;
  	callApi? : any;
};

const NavItem = ({
	href,
	icon,
	label,
	sidebarExpanded,
	callApi
}: NavItemProps) => {
	const pathname = usePathname().split('/')[1];
	return (
		<li>
			<Link
        onClick={()=> callApi ? callApi() : null}
				href={href}
				className={cn(
					"flex items-center text-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100  font-light hover:font-semibold",
					sidebarExpanded ? "justify-center" : "lg:block"
				)}
			>
				<span className="flex items-center text-center  text-base text-gray-900 rounded-lg hover:bg-gray-100  hover:font-semibold">
					{icon}

					<span
						// className={`${
						// 	sidebarExpanded
						// 		? "lg:hidden opacity-0 ml-0"
						// 		: "opacity-100 ml-3 block"
						// }ml-3 whitespace-nowrap `}
						className={cn("ml-3 whitespace-nowrap",
						sidebarExpanded ? "lg:hidden opacity-0" : "opacity-100 ml-3 block",
						pathname === (label as string).toLowerCase() ? "font-bold" : "font-normal")}
					>
						{label}
					</span>
				</span>
			</Link>
		</li>
	);
};
