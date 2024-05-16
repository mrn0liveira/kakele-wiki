"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { disableNavWithFooter } from "@/src/lib/constants";

export default function CoinshubAd({ text }: { text: string }) {
	const path = usePathname();

	const isDashboardPath =
		path.startsWith("/dashboard") || disableNavWithFooter.includes(path);

	if (isDashboardPath) return null;

	return (
		<Link
			className="bg-orange-800/80 md:h-6 w-full z-[10] bg-stripe-gradient items-center justify-center flex rounded-xl"
			href="https://coinshub.com.br/affiliate/biridim/"
		>
			<span className="text-xs md:text-md p-1">
				<span className="text-orange-300 font-black">CoinsHub</span>{" "}
				<span className="font-sans text-orange-400">{text}</span>
			</span>
		</Link>
	);
}
