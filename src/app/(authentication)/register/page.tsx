"use client";

import { RegisterForm } from "@/src/components/auth/register-form";

const RegisterPage = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="grid h-full w-full items-center justify-center lg:grid-cols-1">
				<div className="flex h-full w-full items-center justify-center">
					<RegisterForm />
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
