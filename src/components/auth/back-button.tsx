"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

interface BackButtonProps {
	href: string;
	label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
	return (
		<Button className="w-auto font-normal" size="sm" variant="light">
			<Link href={href}>{label}</Link>
		</Button>
	);
};
