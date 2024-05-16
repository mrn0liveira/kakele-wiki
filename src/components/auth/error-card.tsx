import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { CardWrapper } from "@/src/components/auth/card-wrapper";

export const ErrorCard = () => {
	return (
		<CardWrapper
			backButtonHref="/login"
			backButtonLabel="Back to login"
			headerDescription="Oops! Something went wrong!"
			headerTitle="Error"
		>
			<div className="flex w-full justify-center">
				<ExclamationTriangleIcon className="text-destructive" />
			</div>
		</CardWrapper>
	);
};
