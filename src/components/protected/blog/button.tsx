"use client";

import { Button } from "@nextui-org/react";

export const GenericButton = ({
	children,
	className,
	onClick,
	variant,
}: {
	children?: React.ReactNode;
	className?: string;
	onClick?: () => void;
	variant?:
		| "solid"
		| "bordered"
		| "light"
		| "flat"
		| "faded"
		| "shadow"
		| "ghost";
}) => {
	return (
		<Button className={className} onClick={onClick} variant={variant}>
			{children}
		</Button>
	);
};
