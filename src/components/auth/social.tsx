"use client";

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { PiDiscordLogo } from "react-icons/pi";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");

	const onClick = (provider: "google" | "discord") => {
		signIn(provider, {
			callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		});
	};

	return (
		<>
			<div className="flex w-full items-center justify-center gap-x-2">
				<Button
					className="w-auto border-b-large border-stone-800 bg-stone-700 hover:border-zinc-700 hover:bg-zinc-600"
					onClick={() => {
						onClick("google");
					}}
					size="sm"
				>
					<FcGoogle className="h-5 w-5" />
					Enter with Google
				</Button>
			</div>
			{/* <div className="flex w-full items-center justify-center gap-x-2">
				<Button
					size="sm"
					className="w-auto border-b-large border-stone-800 bg-stone-700 hover:border-zinc-700 hover:bg-zinc-600"
					onClick={() => {
						onClick("discord");
					}}
				>
					<PiDiscordLogo className="h-5 w-5" />
					Enter with Discord
				</Button>
			</div> */}
		</>
	);
};
