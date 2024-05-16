"use client";

import { CircleUser, Home, LogOut, NotebookText, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { TbChevronLeft } from "react-icons/tb";

import { cn } from "@/src/lib/utils";

import { RoleGate } from "../auth/role-gate";

interface SidebarItemProps {
	children: React.ReactNode;
	isCollapsed: boolean;
	leftSlot?: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

export const SidebarItem = ({
	children,
	leftSlot,
	isCollapsed,
	className = "",
	onClick,
}: SidebarItemProps) => {
	return (
		<div
			className={cn("flex items-center justify-center", className)}
			onClick={onClick}
			onKeyDown={onClick}
		>
			<div className="size-[16px] shrink-0">{leftSlot}</div>
			<div
				className={[
					"flex flex-1 items-center justify-between gap-2 overflow-hidden",
					isCollapsed ? "w-0" : "w-auto",
				].join(" ")}
			>
				<div className="ml-2">{children}</div>
			</div>
		</div>
	);
};

export const Sidebar = () => {
	const [isCollapsed, setIsCollapsed] = useState(true);

	return (
		<aside
			className={[
				"max-h-[95vh] px-4 py-6 transition-all duration-300",
				isCollapsed ? "w-[66px]" : "w-[240px]",
			].join(" ")}
		>
			<div className="flex h-full flex-row lg:flex-col justify-between w-screen lg:w-auto pr-8 lg:pr-0">
				<div className="flex flex-row lg:flex-col gap-2">
					<Link href={"/"}>
						<SidebarItem
							className="max-h-[95vh] rounded-md border border-zinc-500 bg-zinc-800 px-2 py-1 text-xs"
							isCollapsed={isCollapsed}
							leftSlot={<Home size={16} />}
						>
							<span className="text-sm font-black">Home</span>
						</SidebarItem>
					</Link>
					{/* <SidebarItem
						isCollapsed={isCollapsed}
						className="max-h-[95vh] rounded-md border border-zinc-500 bg-zinc-800 px-2 py-1 text-xs"
						leftSlot={<Settings size={16} />}
					>
						<span className="text-sm font-black">Dashboard</span>
					</SidebarItem> */}
					<div className="flex justify-end">
						<button
							className={[
								"hidden lg:flex size-5 translate-x-[27px] items-center justify-center rounded-full bg-neutral-900 text-sm text-white",
								"transition-all delay-200 duration-300",
								"shadow-[0px_0px_12px_rgba(72,66,66,1)]",
								isCollapsed ? "rotate-180" : "",
							].join(" ")}
							onClick={() => setIsCollapsed((s) => !s)}
							type="button"
						>
							<TbChevronLeft />
						</button>
					</div>
					<div className="py-4">
						<hr className="border-zinc-500" />
					</div>
					<div className="flex flex-col gap-2">
						<RoleGate allowedRole="ADMIN">
							<Link href={"/dashboard/blog"}>
								<SidebarItem
									className="px-2 py-1 opacity-70"
									isCollapsed={isCollapsed}
									leftSlot={<NotebookText size={16} />}
								>
									<span className="text-sm font-medium">Blog</span>
								</SidebarItem>
							</Link>
						</RoleGate>
					</div>
				</div>

				<div className="flex flex-row lg:flex-col">
					<Link href={"/dashboard/settings"}>
						<SidebarItem
							className="px-2 py-1 opacity-70"
							isCollapsed={isCollapsed}
							leftSlot={<CircleUser size={16} />}
						>
							<span className="text-sm font-medium">Settings</span>
						</SidebarItem>
					</Link>
					<SidebarItem
						className="cursor-pointer px-2 py-1 opacity-70"
						isCollapsed={isCollapsed}
						leftSlot={<LogOut size={16} />}
						onClick={() => signOut({ callbackUrl: "/login" })}
					>
						<div className="text-sm font-medium text-red-400">Logout</div>
					</SidebarItem>
				</div>
			</div>
		</aside>
	);
};
