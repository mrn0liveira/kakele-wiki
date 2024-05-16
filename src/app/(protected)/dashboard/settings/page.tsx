"use client";

import { useRouter } from "next/navigation";

import SettingsContainer from "@/src/components/protected/settings/card";
import { useCurrentUser } from "@/src/hooks/use-current-user";

export default function DashboardPage() {
	const user = useCurrentUser();
	const router = useRouter();

	if (!user) {
		router.push("/login");
	}

	return (
		<main className="md:max-h-auto flex h-full w-full flex-col">
			<div className="my-8 ml-8">
				<h1 className="text-start text-2xl font-semibold">⚙️ Settings</h1>
				<p>Change your profile settings</p>
			</div>
			<SettingsContainer />
		</main>
	);
}
