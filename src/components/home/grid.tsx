import { cn } from "@/src/lib/utils";

import "@/src/styles/Card-Shine.css";

export const BentoGrid = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"mx-auto grid max-w-7xl grid-cols-1ag gap-4 md:auto-rows-[18rem] md:grid-cols-3 ",
				className,
			)}
		>
			{children}
		</div>
	);
};

export const BentoGridItem = ({
	children,
	className,
	title,
	description,
	header,
	icon,
}: {
	children?: React.ReactNode;
	className?: string;
	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	header?: React.ReactNode;
	icon?: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"group/bento relative row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent",
				className,
			)}
		>
			{header}
			<div className="transition duration-200 group-hover/bento:translate-x-2">
				{children ? (
					<>{children}</>
				) : (
					<>
						{icon}
						<div className="mb-2 mt-2 line-clamp-1 font-sans font-bold text-neutral-600 dark:text-neutral-200">
							{title}
						</div>
						<div className="line-clamp-3 font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
							{description}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export const BlogPostSkeleton = ({
	className,
	icon,
}: {
	className?: string;
	icon?: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				className,
				"group/bento card-shine-effect-2 row-span-1 flex h-[8rem] w-full flex-col justify-between space-y-4 rounded-xl border border-transparent",
			)}
		>
			<div className="transition duration-200 group-hover/bento:translate-x-2 flex flex-row items-center">
				<div className="bg-black/20 w-[14rem] h-[6rem] rounded-md" />
				<div className="flex flex-col w-full ml-12">
					<div className="mb-2 mt-2 line-clamp-1 h-4 w-full rounded-md bg-black/20 font-sans font-bold text-neutral-600 dark:text-neutral-200" />
					<div className="line-clamp-3 h-12 rounded-md bg-black/30 font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300" />
				</div>
			</div>
		</div>
	);
};
