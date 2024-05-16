"use client";

import { CirclePlus, Home, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TbChevronLeft } from "react-icons/tb";
import type { MapPoint } from "@prisma/client";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/src/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RoleGate } from "../auth/role-gate";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import AdminMenu from "./admin-menu";

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

export const Sidebar = ({
	cities,
	onClick,
	mapCoordinates,
}: {
	cities: MapPoint[];
	onClick: (coordinates: [number, number]) => void;
	mapCoordinates: [string, string];
}) => {
	const [isCollapsed, setIsCollapsed] = useState(true);

	const isDesktop = useMediaQuery("(min-width: 768px)");

	return (
		<aside
			className={[
				"max-h-[95vh] lg:px-4 px-2 py-6 transition-all duration-300",
				isCollapsed ? "w-fit lg:w-[66px]" : "w-fit lg:w-[240px]",
			].join(" ")}
		>
			<div className="flex h-full w-fit max-w-[90vw] flex-row justify-between lg:w-auto lg:flex-col lg:pr-0">
				<div className="flex flex-row gap-1 lg:gap-2 lg:flex-col">
					<Link href={"/"}>
						<SidebarItem
							className="relative h-8 rounded-md border-[2px] bg-orange-950 border-orange-700/50 px-2 py-0 opacity-70"
							isCollapsed={isCollapsed}
							leftSlot={<Home size={16} />}
						>
							<span className="text-sm font-black">Home</span>
						</SidebarItem>
					</Link>
					<div className="relative py-4">
						<hr className="border-zinc-500" />
						<button
							className={[
								"absolute -right-4 top-2 hidden size-5 translate-x-[27px] items-center justify-center rounded-full bg-neutral-900 text-sm text-white lg:flex",
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
					<div className="flex flex-row gap-2 lg:flex-col">
						<RoleGate allowedRole="ADMIN">
							<AdminMenu
								mapCoordinates={mapCoordinates}
								trigger={
									<SidebarItem
										className="relative h-8 rounded-md border-[2px] border-green-500 px-2 py-0 opacity-70"
										isCollapsed={isCollapsed}
										leftSlot={<CirclePlus color="#c7ffb8" size={16} />}
									>
										Add
									</SidebarItem>
								}
							/>
						</RoleGate>
						{cities.length > 0 && (
							<Dialog>
								<DialogTrigger>
									<SidebarItem
										className="relative h-8 rounded-md border-[1px] border-white/20 px-2 py-0 opacity-70"
										isCollapsed={isCollapsed}
										leftSlot={<MapPin size={16} />}
									>
										Cities
									</SidebarItem>
								</DialogTrigger>
								<DialogContent
									className={cn(
										"absolute z-[999] flex w-auto justify-start flex-col gap-1 py-2 px-8",
									)}
								>
									<span>Cities</span>
									<span className="mb-4 text-xs">Move to a city</span>
									{cities.map((city) => (
										<div
											className="cursor-pointer rounded-md bg-zinc-900 px-4 py-2 text-sm hover:bg-zinc-800"
											key={city.name}
											onClick={() => {
												//@ts-ignore
												onClick([city.latitude, city.longitude]);
											}}
											onKeyDown={() => {
												//@ts-ignore
												onClick([city.latitude, city.longitude]);
											}}
										>
											{city.name}
										</div>
									))}
								</DialogContent>
							</Dialog>
						)}
					</div>
				</div>
			</div>
		</aside>
	);
};
