"use client";

import { LoginForm } from "@/src/components/auth/login-form";

const LoginPage = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="grid h-full w-full items-center justify-center lg:grid-cols-1">
				<div className="flex h-full w-full items-center justify-center">
					<LoginForm />
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
