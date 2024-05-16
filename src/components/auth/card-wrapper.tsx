"use client";

import { BackButton } from "@/src/components/auth/back-button";
import { Header } from "@/src/components/auth/header";
import { Social } from "@/src/components/auth/social";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";

interface CardWrapperProps {
	children: React.ReactNode;
	headerTitle: string;
	headerDescription: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
	className?: string;
	decoration?: JSX.Element;
}

export const CardWrapper = ({
	children,
	headerTitle,
	headerDescription,
	backButtonLabel,
	backButtonHref,
	showSocial,
	className,
	decoration,
}: CardWrapperProps) => {
	return (
		<Card className={cn(className, "w-[400px] max-w-[90vw] bg-stone-900/90")}>
			{decoration}
			<CardHeader>
				<Header description={headerDescription} title={headerTitle} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter className="flex flex-col items-center justify-center">
				<BackButton href={backButtonHref} label={backButtonLabel} />
			</CardFooter>
		</Card>
	);
};
