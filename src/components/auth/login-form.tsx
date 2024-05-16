"use client";

import "@/src/styles/Card-Shine.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { Button } from "@nextui-org/react";
import Link from "next/link";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { LoginSchema } from "@/src/schemas";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { FormError } from "@/src/components/form-error";
import { login } from "@/src/actions/login";
import { cn } from "@/src/lib/utils";

import { FormSuccess } from "../form-success";

export const LoginForm = () => {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const [isPending, startTransition] = useTransition();

	const searchParams = useSearchParams();

	const callbackUrl = searchParams.get("callbackUrl");

	const urlError = () => {
		const errorMessage = searchParams.get("error");

		if (errorMessage === "OAuthAccountNotLinked") {
			return "Email already in use with different provider!";
		}

		if (errorMessage === "MissingCSRF") {
			return "Invalid CSRF token";
		}

		return "";
	};

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			login(values, callbackUrl)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					}

					if (data?.success) {
						form.reset();
						setSuccess(data.success);
					}

					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => setError("Something went wrong!"));
		});
	};

	return (
		<CardWrapper
			backButtonHref="/register"
			backButtonLabel="Don't have an account?"
			headerDescription="Welcome Back"
			headerTitle="Login"
			showSocial
		>
			<Form {...form}>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="space-y-4">
						{showTwoFactor && (
							<FormField
								control={form.control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Two Factor Code</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder="123456"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{!showTwoFactor && (
							<>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={isPending}
													placeholder="ghorannon123@gmail.com"
													type="email"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }: any) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={isPending}
													placeholder="******"
													type="password"
												/>
											</FormControl>
											<Button
												className="px-2 font-normal"
												size="sm"
												variant="light"
											>
												<Link href="/reset">Forgot password?</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</div>
					<FormError message={error || urlError()} />
					<FormSuccess message={success} />
					<Button
						className={cn(
							isPending
								? "border-gray-800 bg-gray-700 hover:border-zinc-700 hover:bg-zinc-600"
								: "border-green-800 bg-green-700 hover:border-emerald-700 hover:bg-emerald-600",
							"card-shine-effect w-full border-b-large ",
						)}
						disabled={isPending}
						type="submit"
					>
						{showTwoFactor ? "Confirm" : isPending ? "Loading" : "Login"}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
