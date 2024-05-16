"use client";

import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/src/hooks/use-current-user";

export default function DashboardPage() {
	const user = useCurrentUser();
	const router = useRouter();

	if (!user) {
		router.push("/login");
	}

	return (
		<main className="md:max-h-auto flex min-h-full min-w-full flex-col items-center justify-center text-center">
			<h1 className="text-3xl">Welcome back {user?.name}.</h1>
		</main>
	);
}
