import { ErrorCard } from "@/src/components/auth/error-card";

const AuthErrorPage = ({ error }: { error: string }) => {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			{error}
			<ErrorCard />
		</div>
	);
};

export default AuthErrorPage;
