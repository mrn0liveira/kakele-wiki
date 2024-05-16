"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { disableNavWithFooter } from "@/src/lib/constants";

import { MobileLanguageToggle } from "./language-toggle";

export default function Footer() {
	const path = usePathname();

	const isDashboardPath =
		path.startsWith("/dashboard") || disableNavWithFooter.includes(path);

	return (
		<>
			{isDashboardPath ? (
				<></>
			) : (
				<footer className="relative gap-2 flex flex-col w-full max-w-[100rem] rounded-md items-center justify-center bg-transparent p-4">
					<MobileLanguageToggle />
					<p className="justify-center whitespace-pre-line text-center text-xs">
						© {new Date().getFullYear()}{" "}
						<span className="font-bold text-orange-500">Kakele Wiki</span> All
						rights reserved.
					</p>
				</footer>
			)}
		</>
	);
}
